
import { GoogleGenAI, Chat, GenerateContentResponse, Tool, Type } from "@google/genai";
import { Message } from '../types';

let aiInstance: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGemini = (apiKey: string) => {
  aiInstance = new GoogleGenAI({ apiKey });
};

// Define the image generation tool
const IMAGE_TOOL: Tool = {
  functionDeclarations: [{
    name: 'generate_image',
    description: 'Generates an image based on a detailed prompt. Use this when the user asks for an image, describes a scene they want to see, or during the DO phase of a Creative Images mission.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        prompt: { 
          type: Type.STRING, 
          description: 'A detailed, descriptive prompt for the image generation model (e.g. "A futuristic city with neon lights, cyberpunk style").' 
        }
      },
      required: ['prompt']
    }
  }]
};

// Define the audio generation tool
const AUDIO_TOOL: Tool = {
  functionDeclarations: [{
    name: 'generate_audio',
    description: 'Generates a short music clip or sound effect based on a text description. Use this when the user asks for music, a melody, or a sound effect.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        prompt: {
          type: Type.STRING,
          description: 'A detailed description of the sound or music to generate (e.g. "A cheerful 8-bit melody", "scary footsteps").'
        }
      },
      required: ['prompt']
    }
  }]
};

const generateImage = async (prompt: string): Promise<string | null> => {
  if (!aiInstance) throw new Error("AI not initialized");
  try {
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });
    
    // Iterate through parts to find the image
    if (response.candidates && response.candidates[0].content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
           return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};

// Mock Audio Generation (Client-side synthesis for demo purposes)
const generateAudio = async (prompt: string): Promise<string> => {
  // In a real app, this would call a model like MusicLM or similar. 
  // Here we synthesize a simple WAV file on the client to demonstrate the capability.
  return new Promise((resolve) => {
     // Delay slightly to simulate processing
     setTimeout(() => {
        resolve(`data:audio/wav;base64,${createDummyWav()}`);
     }, 1500);
  });
};

export const startNewChatSession = async (missionContext: string, systemInstruction: string, track?: string): Promise<string> => {
  if (!aiInstance) throw new Error("AI Client not initialized. Please provide an API Key.");

  try {
    const tools: Tool[] = [];
    let extraContext = "";

    // Enable Image Generation for Creative Images track
    if (track === 'Creative Images') {
      tools.push(IMAGE_TOOL);
      extraContext += "\n\n[SYSTEM NOTE]: You have access to a 'generate_image' tool. If the user asks for an image or the activity involves creating one, please use this tool to generate it for them.";
    }

    // Enable Audio Generation for Music, Creative Stories, and Video tracks
    if (track === 'Music' || track === 'Creative Stories' || track === 'Video') {
      tools.push(AUDIO_TOOL);
      extraContext += "\n\n[SYSTEM NOTE]: You have access to a 'generate_audio' tool. If the user asks for music, a melody, or sound effects, please use this tool to generate it.";
    }

    chatSession = aiInstance.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        tools: tools.length > 0 ? tools : undefined
      },
    });

    // Send the initial context to the AI so it knows what mission to run
    const contextPrompt = `
      [SYSTEM CONTEXT - HIDDEN FROM USER]
      User has selected the following mission:
      ${missionContext}
      ${extraContext}
      
      Please start the mission now with the first step (Warm-up or Context).
      Greet the user by the mission title and begin.
    `;

    const response = await chatSession.sendMessage({ message: contextPrompt });
    return response.text || "Hello! I'm ready to start. What mission should we do?";
  } catch (error: any) {
    console.error("Gemini Session Start Error:", error);
    if (error.message?.includes('403') || error.message?.includes('API key')) {
      throw new Error("Invalid or expired API Key. Please check your credentials.");
    } else if (error.message?.includes('fetch')) {
      throw new Error("Network connection failed. Please check your internet.");
    }
    throw new Error("Failed to start the AI session. Please try again.");
  }
};

export const resumeChatSession = (history: Message[], systemInstruction: string): void => {
  if (!aiInstance) throw new Error("AI Client not initialized");

  try {
    // Filter out system messages and map to SDK format
    // Note: This simple resume might lose tool context if the session had complex tool history.
    // Ideally, we'd reconstruct tools based on the mission track, but for now we resume simply.
    const formattedHistory = history
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    // Re-create the chat session
    chatSession = aiInstance.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: formattedHistory
    });
  } catch (error) {
    console.error("Failed to resume session", error);
  }
};

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  if (!chatSession) throw new Error("Chat session not active");

  try {
    const response = await chatSession.sendMessage({ message: userMessage });
    return response.text || "I'm having trouble thinking right now. Can you try again?";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "⚠️ Connection error. I couldn't send that message. Please check your internet and try again.";
  }
};

export const sendMessageStreamToGemini = async function* (userMessage: string | { parts: any[] }) {
  if (!chatSession) throw new Error("Chat session not active");

  try {
    // Determine if we are sending text or a tool response
    let result;
    if (typeof userMessage === 'string') {
        result = await chatSession.sendMessageStream({ message: userMessage });
    } else {
        result = await chatSession.sendMessageStream(userMessage);
    }
    
    let functionCallsToProcess: any[] = [];

    for await (const chunk of result) {
      const responseChunk = chunk as GenerateContentResponse;
      
      if (responseChunk.text) {
        yield responseChunk.text;
      }

      // Check for function calls
      if (responseChunk.functionCalls && responseChunk.functionCalls.length > 0) {
        functionCallsToProcess.push(...responseChunk.functionCalls);
      }
    }

    // Process any function calls detected
    if (functionCallsToProcess.length > 0) {
      const functionResponses = [];
      
      for (const call of functionCallsToProcess) {
        if (call.name === 'generate_image') {
          const prompt = call.args['prompt'];
          yield `\n\n*🎨 Painting: ${prompt}...*\n\n`;
          
          let toolResult = { result: "Image generated successfully." };
          try {
            const base64Image = await generateImage(prompt);
            if (base64Image) {
              yield `![Generated Image](${base64Image})\n\n`;
            } else {
              yield `*(Image generation returned no data)*\n\n`;
              toolResult = { result: "Image generation failed: No data returned." };
            }
          } catch (e: any) {
            yield `*(Image generation failed: ${e.message})*\n\n`;
            toolResult = { result: `Image generation failed: ${e.message}` };
          }

          functionResponses.push({
            functionResponse: {
              name: 'generate_image',
              id: call.id,
              response: toolResult
            }
          });
        }
        else if (call.name === 'generate_audio') {
            const prompt = call.args['prompt'];
            yield `\n\n*🎵 Composing: ${prompt}...*\n\n`;
            
            try {
                const audioDataUrl = await generateAudio(prompt);
                yield `[🔊 Play Generated Audio](${audioDataUrl})\n\n`;
                functionResponses.push({
                    functionResponse: {
                        name: 'generate_audio',
                        id: call.id,
                        response: { result: "Audio generated successfully." }
                    }
                });
            } catch (e: any) {
                yield `*(Audio generation failed: ${e.message})*\n\n`;
                functionResponses.push({
                    functionResponse: {
                        name: 'generate_audio',
                        id: call.id,
                        response: { result: `Audio generation failed: ${e.message}` }
                    }
                });
            }
        }
      }

      // Send the tool outputs back to the model and stream its follow-up response
      if (functionResponses.length > 0) {
        // Recursively stream the model's response to the tool outputs
        const nextStream = sendMessageStreamToGemini({ parts: functionResponses });
        for await (const nextChunk of nextStream) {
          yield nextChunk;
        }
      }
    }

  } catch (error: any) {
    console.error("Gemini Stream Error:", error);
    if (error.message?.includes('403') || error.message?.includes('API key')) {
        yield "🚫 **Access Denied**: It looks like your API Key is invalid or expired. Please return to the dashboard and update your key.";
    } else {
        yield "⚠️ **Connection Error**: I lost connection to the brain. Please check your internet connection and try asking again.";
    }
  }
};

// --- WAV Generator Helpers ---
const createDummyWav = (durationSeconds = 2): string => {
  const sampleRate = 44100;
  const numChannels = 1;
  const bitsPerSample = 16;
  const numSamples = sampleRate * durationSeconds;
  const blockAlign = numChannels * bitsPerSample / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const fileSize = 36 + dataSize;

  const buffer = new ArrayBuffer(fileSize + 8);
  const view = new DataView(buffer);

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // file length
  view.setUint32(4, fileSize, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // format chunk identifier
  writeString(view, 12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (1 is PCM)
  view.setUint16(20, 1, true);
  // mono (1 channel)
  view.setUint16(22, numChannels, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate
  view.setUint32(28, byteRate, true);
  // block align
  view.setUint16(32, blockAlign, true);
  // bits per sample
  view.setUint16(34, bitsPerSample, true);
  // data chunk identifier
  writeString(view, 36, 'data');
  // data chunk length
  view.setUint32(40, dataSize, true);

  // Generate some simple synth data (arpeggio)
  const freqBase = 220 + Math.random() * 220;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Switch frequency every 0.25 seconds
    const note = Math.floor(t * 4) % 4;
    const freq = freqBase * [1, 1.25, 1.5, 2][note]; // Major chord
    const sample = Math.sin(2 * Math.PI * freq * t);
    // Scale to 16-bit integer
    const intSample = sample < 0 ? sample * 32768 : sample * 32767;
    view.setInt16(44 + i * 2, intSample, true);
  }

  // Convert to base64
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};
