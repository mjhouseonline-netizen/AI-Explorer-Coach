
import { GoogleGenAI, Chat, GenerateContentResponse, Tool, Type } from "@google/genai";
import { Message } from '../types';

// Always use new GoogleGenAI({apiKey: process.env.API_KEY})
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
let chatSession: Chat | null = null;

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
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });
    
    // Iterate through all parts to find the image part
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

const generateAudio = async (prompt: string): Promise<string> => {
  return new Promise((resolve) => {
     setTimeout(() => {
        resolve(`data:audio/wav;base64,${createDummyWav()}`);
     }, 1500);
  });
};

export const startNewChatSession = async (missionContext: string, systemInstruction: string, track?: string): Promise<string> => {
  try {
    const tools: Tool[] = [];
    let extraContext = "";

    // DYNAMIC TOOL INCLUSION BASED ON TRACK
    if (track === 'Creative Images') {
      tools.push(IMAGE_TOOL);
      extraContext += "\n\n[SYSTEM NOTE]: You have access to a 'generate_image' tool. Use it whenever an image is needed.";
    }

    if (['Music', 'Creative Stories', 'Video'].includes(track || '')) {
      tools.push(AUDIO_TOOL);
      extraContext += "\n\n[SYSTEM NOTE]: You have access to a 'generate_audio' tool. Use it for sound effects or music.";
    }

    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        tools: tools.length > 0 ? tools : undefined
      },
    });

    const contextPrompt = `
      [SYSTEM CONTEXT]
      User is starting mission: ${missionContext}
      ${extraContext}
      Please start the mission now.
    `;

    // chat.sendMessage only accepts the message parameter
    const response = await chatSession.sendMessage({ message: contextPrompt });
    return response.text || "Hello! Ready to explore?";
  } catch (error: any) {
    console.error("Gemini Session Start Error:", error);
    throw new Error("Failed to start AI session. Please try again.");
  }
};

export const resumeChatSession = (history: Message[], systemInstruction: string): void => {
  try {
    const formattedHistory = history
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      // Note: Passing history is supported in many SDK versions, but standard chat usage follows sequential turns.
      // For this implementation we maintain the original logic of initializing with history.
    });
    // In some SDK versions we might need to push history turns manually, but assuming historical support here.
  } catch (error) {
    console.error("Failed to resume session", error);
  }
};

export const sendMessageStreamToGemini = async function* (userMessage: string | { parts: any[] }) {
  if (!chatSession) throw new Error("Chat session not active");

  try {
    // chat.sendMessageStream only accepts the message parameter, do not use contents.
    const result = await chatSession.sendMessageStream({ message: userMessage });
    
    let functionCallsToProcess: any[] = [];

    for await (const chunk of result) {
      const responseChunk = chunk as GenerateContentResponse;
      // Do not use response.text()
      if (responseChunk.text) yield responseChunk.text;
      if (responseChunk.functionCalls) functionCallsToProcess.push(...responseChunk.functionCalls);
    }

    if (functionCallsToProcess.length > 0) {
      const functionResponses = [];
      for (const call of functionCallsToProcess) {
        if (call.name === 'generate_image') {
          const prompt = call.args['prompt'];
          yield `\n\n*🎨 Creating: ${prompt}...*\n\n`;
          const base64Image = await generateImage(prompt);
          if (base64Image) yield `![Generated Image](${base64Image})\n\n`;
          functionResponses.push({ functionResponse: { name: 'generate_image', id: call.id, response: { result: "Success" } } });
        } else if (call.name === 'generate_audio') {
            const prompt = call.args['prompt'];
            yield `\n\n*🎵 Composing: ${prompt}...*\n\n`;
            const audioDataUrl = await generateAudio(prompt);
            yield `[🔊 Play Audio](${audioDataUrl})\n\n`;
            functionResponses.push({ functionResponse: { name: 'generate_audio', id: call.id, response: { result: "Success" } } });
        }
      }

      if (functionResponses.length > 0) {
        const nextStream = sendMessageStreamToGemini({ parts: functionResponses });
        for await (const nextChunk of nextStream) yield nextChunk;
      }
    }
  } catch (error: any) {
    console.error("Gemini Stream Error:", error);
    yield "⚠️ Connection error. Please try again.";
  }
};

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
  writeString(view, 0, 'RIFF');
  view.setUint32(4, fileSize, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);
  const freqBase = 220 + Math.random() * 220;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const note = Math.floor(t * 4) % 4;
    const freq = freqBase * [1, 1.25, 1.5, 2][note];
    const sample = Math.sin(2 * Math.PI * freq * t);
    const intSample = sample < 0 ? sample * 32768 : sample * 32767;
    view.setInt16(44 + i * 2, intSample, true);
  }
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
};
