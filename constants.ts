
import { Mission, Track } from './types';

export const TRACKS: Track[] = [
  'Basics', 'Prompts', 'Creative Stories', 'Creative Images', 'Video', 'Music', 'Coding', 'Research', 'Data', 'Automation', 'Business', 'Projects'
];

export const MISSIONS_KIDS: Mission[] = [
  {
    "id": "basics-1",
    "track": "Basics",
    "title": "What Is AI, Really?",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Help the student understand AI as pattern-finding software, not magic, and know a few real-life examples.",
    "sample_activity_idea": "Compare AI to a super autocomplete that has read lots of books, then have the student list 5 places they might already be using AI (search, recommendations, filters, etc.)."
  },
  {
    "id": "basics-2",
    "track": "Basics",
    "title": "How AI Learns From Examples",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Explain, in simple language, how training data and examples help AI learn patterns.",
    "sample_activity_idea": "Play a game where the coach shows word or emoji patterns and the student guesses the next one, then relate that to how AI predicts the next word."
  },
  {
    "id": "basics-3",
    "track": "Basics",
    "title": "When AI Gets Things Wrong",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Teach that AI can be wrong, biased, or outdated, and why double-checking matters.",
    "sample_activity_idea": "Show a deliberately wrong or silly AI answer, ask the student to spot the problem, and have them rewrite a better version."
  },
  {
    "id": "prompts-1",
    "track": "Prompts",
    "title": "Good Prompt vs Vague Prompt",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Show how adding detail to a prompt gives clearer, more useful results.",
    "sample_activity_idea": "Start with a vague prompt like 'write a story' and turn it into a detailed prompt together; compare the outputs."
  },
  {
    "id": "prompts-2",
    "track": "Prompts",
    "title": "Building a Prompt in 4 Steps",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Teach a simple framework for prompts: Role, Goal, Details, Output style.",
    "sample_activity_idea": "Have the student design a prompt for an AI homework helper using the 4-step structure."
  },
  {
    "id": "prompts-3",
    "track": "Prompts",
    "title": "The 'Act As' Superpower",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn how to use personas (e.g., 'Act as a travel guide') to get better, more specific answers.",
    "sample_activity_idea": "Challenge the student to make the AI sound like 3 different characters (e.g., a pirate, a robot, a medieval knight) while explaining the same topic (e.g., 'How to brush your teeth')."
  },
  {
    "id": "stories-1",
    "track": "Creative Stories",
    "title": "Create a Hero With AI",
    "level": 1,
    "duration_minutes": 25,
    "goal": "Use AI to co-create a story character and a short scene while keeping the student as the main author.",
    "sample_activity_idea": "Student describes a hero (age, powers, weakness, goal); AI helps write a short scene with that hero; student edits the scene."
  },
  {
    "id": "stories-2",
    "track": "Creative Stories",
    "title": "AI as Your Story Co-Writer",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Show how AI can suggest ideas and plot twists while the student stays in control.",
    "sample_activity_idea": "Student picks a genre and AI offers three plot ideas; student chooses one and writes part of the story with AI suggesting options at key points."
  },
  {
    "id": "images-1",
    "track": "Creative Images",
    "title": "Describe a World So AI Can See It",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Practice writing rich descriptions that could be used as prompts for an image generator.",
    "sample_activity_idea": "Student invents a world (place, mood, colours, important objects); AI helps turn it into a detailed text description and improves it step by step."
  },
  {
    "id": "images-2",
    "track": "Creative Images",
    "title": "From Simple Idea to Strong Image Prompt",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Turn a basic idea into a clear, structured image prompt.",
    "sample_activity_idea": "Start from 'a cool robot musician' and guide the student to add style, lighting, angle, background and emotion to build a full prompt."
  },
  {
    "id": "images-3",
    "track": "Creative Images",
    "title": "Mixing Art Styles",
    "level": 1,
    "duration_minutes": 20,
    "goal": "See what happens when you tell AI to mix two different art styles for creative results.",
    "sample_activity_idea": "Combine distinct styles like 'Lego' and 'Van Gogh'. Write a prompt for a 'Starry Night made of Legos'."
  },
  {
    "id": "video-1",
    "track": "Video",
    "title": "Making Movies with Words",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Discover how AI can create short videos from text descriptions.",
    "sample_activity_idea": "Imagine a 3-second clip (like a dancing banana). Write a description so clear an AI could animate it."
  },
  {
    "id": "video-2",
    "track": "Video",
    "title": "Directing the Camera",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn simple camera terms to control how an AI video looks.",
    "sample_activity_idea": "Take a scene (e.g., a skateboard trick) and add directions like 'slow motion' or 'zoom in' to change the feel."
  },
  {
    "id": "music-1",
    "track": "Music",
    "title": "How AI Can Help Make Music",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Explain what AI music tools do and where the human is still important.",
    "sample_activity_idea": "Student lists 3 songs or game soundtracks they like; AI helps them describe the mood, instruments and tempo to form music prompt ideas."
  },
  {
    "id": "music-2",
    "track": "Music",
    "title": "Design Your First AI Music Prompts",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Help the student write several detailed prompts they could paste into an external AI music generator (without actually generating audio here).",
    "sample_activity_idea": "Student picks a theme (e.g. 'boss fight', 'chill study', 'happy intro'); AI guides them to specify genre, instruments, tempo, mood and structure for 2–3 prompts."
  },
  {
    "id": "coding-1",
    "track": "Coding",
    "title": "My First Code Helper",
    "level": 1,
    "duration_minutes": 20,
    "goal": "See how AI can write simple code snippets to solve math or text problems.",
    "sample_activity_idea": "Ask AI to write a Python script that calculates how many seconds are in a year, or prints a personalized greeting."
  },
  {
    "id": "coding-2",
    "track": "Coding",
    "title": "The Bug Hunter",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn how AI can spot mistakes in code that are hard for humans to see.",
    "sample_activity_idea": "Coach provides a simple code with a typo (missing semicolon or bracket). Student asks AI to find the error and explain the fix."
  },
  {
    "id": "research-1",
    "track": "Research",
    "title": "Explain Like I'm 5",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Use AI to simplify complex school topics into easy-to-understand language.",
    "sample_activity_idea": "Pick a hard topic (e.g., Black Holes, Photosynthesis) and ask AI to explain it using a specific analogy (like 'compare it to a kitchen')."
  },
  {
    "id": "research-2",
    "track": "Research",
    "title": "The Instant Quiz Maker",
    "level": 2,
    "duration_minutes": 20,
    "goal": "Turn study notes into a fun quiz to help prepare for a test.",
    "sample_activity_idea": "Paste a paragraph from a history book or science article and ask AI to generate 3 multiple-choice questions to test your knowledge."
  },
  {
    "id": "data-1",
    "track": "Data",
    "title": "The Data Detective",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Learn how AI can scan information to find facts and count things quickly.",
    "sample_activity_idea": "Paste a messy list of class pets (e.g. 'dog, cat, dog, hamster, dog') and ask AI to count them and make a chart."
  },
  {
    "id": "data-2",
    "track": "Data",
    "title": "Instant Table Maker",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Teach AI to organize messy information into neat, readable tables.",
    "sample_activity_idea": "Write a paragraph about 3 superheroes (names, powers, colors). Ask AI to turn it into a clean table."
  },
  {
    "id": "automation-1",
    "track": "Automation",
    "title": "Robot Logic",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Understand how to give instructions in a specific order, just like programming a robot.",
    "sample_activity_idea": "Write a numbered list of instructions for 'Making a Sandwich' and ask AI to find any missing steps (e.g., 'you forgot to open the bread bag')."
  },
  {
    "id": "business-1",
    "track": "Business",
    "title": "Kid Entrepreneur",
    "level": 1,
    "duration_minutes": 25,
    "goal": "Brainstorm a fun small business idea and create a name and slogan using AI.",
    "sample_activity_idea": "Think of a service (like dog walking or washing cars). Ask AI to give you 5 catchy names and a slogan for your business card."
  },
  {
    "id": "project-1",
    "track": "Projects",
    "title": "Plan Your Own AI Helper",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Guide the student to design a simple AI helper concept (e.g. homework coach, idea generator, or music buddy).",
    "sample_activity_idea": "Student chooses a problem they have (e.g. starting homework, coming up with song ideas); AI helps them describe what the helper should do, what rules it should follow, and what good and bad behaviour look like."
  }
];

export const MISSIONS_ADULTS: Mission[] = [
  {
    "id": "adult-basics-1",
    "track": "Basics",
    "title": "How LLMs Actually Work",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Understand the mechanism of Large Language Models (tokens, probability, training data) to demystify the 'magic'.",
    "sample_activity_idea": "Explain the concept of 'next token prediction' using a sentence completion game, then discuss how this leads to both creativity and hallucinations."
  },
  {
    "id": "adult-basics-2",
    "track": "Basics",
    "title": "Navigating Limitations & Hallucinations",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Learn why AI fabricates information and practical techniques to verify outputs.",
    "sample_activity_idea": "Analyze a scenario where AI might hallucinate (e.g., obscure court cases or citations) and practice verification strategies."
  },
  {
    "id": "adult-prompts-1",
    "track": "Prompts",
    "title": "Prompt Engineering: The SPACE Framework",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Master the SPACE framework (Subject, Purpose, Audience, Context, Extras) to eliminate ambiguity and get 10x better results.",
    "sample_activity_idea": "Take a vague request (e.g., 'write a sales post') and rebuild it using Subject, Purpose, Audience, Context, and Extras to see the massive quality jump."
  },
  {
    "id": "adult-prompts-2",
    "track": "Prompts",
    "title": "Chain-of-Thought Reasoning",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Unlock the model's reasoning capabilities by asking it to 'think step-by-step' before answering.",
    "sample_activity_idea": "Give the AI a trick question or logic puzzle. First, get a quick answer (often wrong). Then, use the magic phrase 'Let's think step by step' to correct it."
  },
  {
    "id": "adult-prompts-3",
    "track": "Prompts",
    "title": "Few-Shot Prompting",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Improve reliability by providing examples (shots) within the prompt before asking the question.",
    "sample_activity_idea": "Create a prompt to classify customer feedback. First, fail with zero-shot. Then, add 3 examples of (Input -> Classification) and see the improved accuracy."
  },
  {
    "id": "adult-prompts-4",
    "track": "Prompts",
    "title": "Exploring Prompt Variations",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Experiment with different phrasing and structures for the same request to understand their impact on AI output.",
    "sample_activity_idea": "Take a core prompt and generate 3 variations by changing sentence structure, word choice, or adding/removing details. Analyze the differences in the AI responses."
  },
  {
    "id": "adult-stories-1",
    "track": "Creative Stories",
    "title": "Professional Copywriting Partner",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use AI to brainstorm variations of marketing copy, headlines, or bio text.",
    "sample_activity_idea": "Draft a LinkedIn bio or product tagline. After the initial copy is generated, ask the AI for variations in tone or style (e.g., witty, corporate, humble)."
  },
  {
    "id": "adult-stories-2",
    "track": "Creative Stories",
    "title": "Overcoming Writer's Block",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Use AI to outline plots, generate character backstories, or expand on rough bullet points.",
    "sample_activity_idea": "Start with a rough premise for a short story. Have the AI generate a chapter outline and character sheets."
  },
  {
    "id": "adult-images-1",
    "track": "Creative Images",
    "title": "Photorealistic Prompting Techniques",
    "level": 2,
    "duration_minutes": 20,
    "goal": "Learn technical terms (lighting, aperture, film stock) to control image generation style.",
    "sample_activity_idea": "Construct a prompt for a portrait, adding specific lighting (e.g., 'rembrandt lighting') and camera details to observe stylistic changes."
  },
  {
    "id": "adult-images-2",
    "track": "Creative Images",
    "title": "Consistent Character Generation",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Techniques for maintaining character identity across multiple generated images (seeds, detailed descriptors).",
    "sample_activity_idea": "Create a detailed character profile prompt. Then, generate variations of that character in different environments (cafe, spaceship) without losing their identity."
  },
  {
    "id": "adult-video-1",
    "track": "Video",
    "title": "Text-to-Video Fundamentals",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Understand the current state of generative video: possibilities, physics hallucinations, and temporal consistency.",
    "sample_activity_idea": "Draft a prompt for a surreal scene (e.g., 'clouds turning into cotton candy'). Discuss how AI morphing logic differs from traditional animation."
  },
  {
    "id": "adult-video-2",
    "track": "Video",
    "title": "Cinematic Prompting for Video",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Apply film terminology (dolly shot, rack focus, golden hour) to generate high-quality AI video outputs.",
    "sample_activity_idea": "Take a static concept like 'a busy city street'. Rewrite the prompt to be a 'drone shot at night with neon lighting and timelapse movement'."
  },
  {
    "id": "adult-video-3",
    "track": "Video",
    "title": "AI Video Editing Essentials",
    "level": 3,
    "duration_minutes": 35,
    "goal": "Understand how AI assists in tasks like scene detection, auto-captioning, and color correction in video post-production.",
    "sample_activity_idea": "Provide a short video clip and ask AI to identify the key scenes, generate subtitles, or suggest color grading adjustments."
  },
  {
    "id": "adult-music-1",
    "track": "Music",
    "title": "AI as a Songwriting Collaborator",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use text AI to generate rhyme schemes, song structures, and chord progression ideas.",
    "sample_activity_idea": "Input a theme and genre. Ask AI to suggest a Verse-Chorus structure and a chord progression (e.g., I-V-vi-IV) to match the mood."
  },
  {
    "id": "adult-music-2",
    "track": "Music",
    "title": "AI as a Music Producer Assistant",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Explore how AI tools assist with technical production tasks like stem separation, mastering, and sound design.",
    "sample_activity_idea": "Simulate a production session: Ask the AI for specific EQ settings for a \"muddy\" vocal or to describe a synth patch for a retrowave bassline."
  },
  {
    "id": "adult-music-3",
    "track": "Music",
    "title": "Ethical Considerations in AI Music",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Discuss the legal and ethical landscape of AI music, including copyright, deepfakes, and artist compensation.",
    "sample_activity_idea": "Analyze a scenario: 'Is it fair to release a song with an AI-cloned voice of a deceased artist?' and list pros/cons."
  },
  {
    "id": "adult-coding-1",
    "track": "Coding",
    "title": "Code Explanation & Debugging",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use AI to explain complex code snippets in plain English and find simple bugs.",
    "sample_activity_idea": "Paste a confusing block of code (e.g., a regex or a nested loop) and ask the AI to explain it line-by-line."
  },
  {
    "id": "adult-coding-2",
    "track": "Coding",
    "title": "Regex Rescue",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn how to use AI to generate complex Regular Expressions for data validation.",
    "sample_activity_idea": "Describe a text pattern (e.g., 'extract all email addresses ending in .edu') and have AI generate the Regex string."
  },
  {
    "id": "adult-coding-3",
    "track": "Coding",
    "title": "Advanced Debugging with AI",
    "level": 3,
    "duration_minutes": 30,
    "goal": "Master advanced AI techniques for identifying and resolving complex bugs and performance bottlenecks.",
    "sample_activity_idea": "Analyze a code snippet with a subtle race condition or memory leak. Ask AI to identify the issue, explain the root cause, and propose a specific fix."
  },
  {
    "id": "adult-coding-4",
    "track": "Coding",
    "title": "AI for Code Refactoring",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn how AI can assist in restructuring and improving existing code for better readability and maintainability.",
    "sample_activity_idea": "Provide a working but messy function (spaghetti code). Ask AI to refactor it into smaller, cleaner functions and apply modern syntax."
  },
  {
    "id": "adult-research-1",
    "track": "Research",
    "title": "Academic Synthesizer",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Use AI to summarize multiple viewpoints or long documents into a cohesive overview.",
    "sample_activity_idea": "Simulate a research task: 'Summarize the pros and cons of remote work from these three different perspectives' (user provides mock text)."
  },
  {
    "id": "adult-research-2",
    "track": "Research",
    "title": "The Socratic Tutor",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Configure AI to ask *you* questions to test your understanding of a new topic.",
    "sample_activity_idea": "Tell AI you want to learn about 'Game Theory' and ask it to quiz you with increasingly difficult questions."
  },
  {
    "id": "adult-data-1",
    "track": "Data",
    "title": "Spreadsheet Formula Pro",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use AI to generate complex Excel or Google Sheets formulas from plain English descriptions.",
    "sample_activity_idea": "Describe a scenario: 'Sum column A if Column B says Paid and Column C is after 2023'. Get the formula."
  },
  {
    "id": "adult-data-2",
    "track": "Data",
    "title": "Data Cleaning Assistant",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Leverage AI to reformat, correct, and standardize messy text datasets.",
    "sample_activity_idea": "Paste a list of names with mixed capitalization and spacing. Ask AI to format them as 'Last Name, First Name' in a CSV format."
  },
  {
    "id": "adult-data-3",
    "track": "Data",
    "title": "Qualitative Analysis",
    "level": 3,
    "duration_minutes": 30,
    "goal": "Analyze unstructured text data (like survey responses) to identify common themes and sentiment.",
    "sample_activity_idea": "Paste 5 varied customer reviews. Ask AI to tag each with sentiment and extract the core feature request."
  },
  {
    "id": "adult-automation-1",
    "track": "Automation",
    "title": "Unstructured Data to JSON",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn how AI can parse messy text (emails, notes) into structured data formats for databases.",
    "sample_activity_idea": "Paste a messy paragraph of customer feedback and ask AI to extract 'Sentiment', 'Product Name', and 'Action Required' into a JSON object."
  },
  {
    "id": "adult-automation-2",
    "track": "Automation",
    "title": "AI for Process Optimization",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Analyze and suggest improvements for common business workflows using AI principles.",
    "sample_activity_idea": "Describe a typical workflow (e.g., onboarding a new employee) and ask AI to identify bottlenecks and suggest automated solutions."
  },
  {
    "id": "adult-automation-3",
    "track": "Automation",
    "title": "Scripting with AI Assistants",
    "level": 1,
    "duration_minutes": 25,
    "goal": "Learn how AI can help write simple scripts (Python, Bash) to automate repetitive tasks.",
    "sample_activity_idea": "Ask AI to write a Python script that renames all files in a folder based on a pattern."
  },
  {
    "id": "adult-automation-4",
    "track": "Automation",
    "title": "AI for Productivity Hacks",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Discover AI tools and techniques to streamline daily tasks and boost personal efficiency.",
    "sample_activity_idea": "Ask the AI to recommend 3 AI tools or strategies that can help manage email overload or schedule meetings more effectively."
  },
  {
    "id": "adult-automation-5",
    "track": "Automation",
    "title": "AI for Time Management",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Leverage AI to optimize daily schedules, prioritize tasks, and improve time blocking techniques.",
    "sample_activity_idea": "Ask AI to create an optimized schedule for a busy student balancing classes, study, and extracurriculars, including realistic time blocks."
  },
  {
    "id": "adult-business-1",
    "track": "Business",
    "title": "Strategic Decision Making (SWOT)",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Use AI to facilitate a SWOT analysis for a project, product, or business decision.",
    "sample_activity_idea": "Describe a business idea or a career decision. Ask AI to generate a detailed SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) to uncover blind spots."
  },
  {
    "id": "adult-business-2",
    "track": "Business",
    "title": "High-Stakes Communication",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Draft, refine, and role-play difficult professional emails or negotiation scripts.",
    "sample_activity_idea": "Draft a rough email asking for a raise or addressing a conflict. Ask AI to rewrite it to be 'firm but professional' or 'empathetic and collaborative'."
  },
  {
    "id": "adult-business-3",
    "track": "Business",
    "title": "Meeting Intelligence",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Learn how to use AI to summarize messy meeting notes into clean agendas or action items.",
    "sample_activity_idea": "Paste a stream-of-consciousness transcript of a brainstorming session. Ask AI to extract a structured list of Action Items with owners and deadlines."
  },
  {
    "id": "adult-project-1",
    "track": "Projects",
    "title": "The Productivity Accelerator",
    "level": 1,
    "duration_minutes": 30,
    "goal": "Build a workflow for summarizing long documents, drafting emails, and organizing notes.",
    "sample_activity_idea": "Simulate a busy inbox scenario. create a system prompt that categorizes emails and drafts appropriate short responses."
  },
  {
    "id": "adult-project-2",
    "track": "Projects",
    "title": "Coding Companion 101",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Learn how to use AI to explain code, debug errors, and write simple scripts.",
    "sample_activity_idea": "Take a snippet of code with a bug (or a regex). Ask AI to explain what it does, find the error, and rewrite it with comments."
  },
  {
    "id": "adult-project-3",
    "track": "Projects",
    "title": "AI as a Virtual Tutor",
    "level": 2,
    "duration_minutes": 40,
    "goal": "Design and plan a personalized AI tutor for a specific learning need, outlining its features and interactive elements.",
    "sample_activity_idea": "Define a learning goal (e.g., learning a new language, mastering a programming concept). Then, outline the key features of an AI tutor that would best achieve this goal, considering interactive exercises and feedback mechanisms."
  },
  {
    "id": "adult-project-4",
    "track": "Projects",
    "title": "AI for Personal Learning Plans",
    "level": 1,
    "duration_minutes": 30,
    "goal": "Outline a personalized learning roadmap for any subject using AI, identifying key resources and milestones.",
    "sample_activity_idea": "Choose a new skill (e.g., 'Learn Spanish' or 'Understand Crypto'). Ask AI to generate a 4-week study plan with daily tasks and free online resources."
  },
  {
    "id": "adult-project-5",
    "track": "Projects",
    "title": "Building a Basic AI Agent",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Conceptualize and plan a simple AI agent that can perform a series of automated tasks based on user triggers.",
    "sample_activity_idea": "Draft a flow for a 'News Aggregator Agent': Trigger (New topic) -> Action (Search news) -> Action (Summarize top 3 articles) -> Output (Send Slack message)."
  }
];

export const SYSTEM_INSTRUCTION_KIDS = `
You are **AI Explorer Coach**, a calm, friendly tutor for curious kids aged 10–15.

**GOAL**
- Help students understand what AI is, how to use it safely, and how to create with AI.
- Make AI feel exciting but **NOT magical**: explain that AI is just software trained on lots of examples.

**TONE & SAFETY**
- Speak like a patient mentor: simple language, no baby talk, no slang that will age badly.
- **NEVER** ask for private information (full name, address, school).
- **ALWAYS** remind students not to use AI to cheat on schoolwork.
- If they ask for anything unsafe, gently refuse and explain why.

**SESSION FLOW**
Every time you run a Mission, you **MUST** follow this 4-step structure strictly.
1. **WARM-UP** (1–2 questions to gauge interest/knowledge).
2. **LEARN** (Short explanation, max 200 words, use real-world analogies).
3. **DO** (Guided interactive activity, 3-5 steps).
4. **REFLECT** (Summary and reflection question).

**IMPORTANT**: 
- Stick to the specific mission topic selected by the user.
- Keep responses compact and easy to read.
`;

export const SYSTEM_INSTRUCTION_ADULTS = `
You are **AI Pro Coach**, a sophisticated, professional, yet accessible guide for teens and adults.

**GOAL**
- Help users master Generative AI for productivity, creativity, and technical understanding.
- Focus on practical application, prompt engineering techniques, and understanding limitations (hallucinations, bias).

**TEACHING FRAMEWORKS**
If the user is doing a "Prompts" mission, reference these frameworks:
1. **SPACE Framework**:
   - **S**ubject: Who/what is this about?
   - **P**urpose: What is the goal?
   - **A**udience: Who is reading this?
   - **C**ontext: Background info?
   - **E**xtras: Tone, format, length.
2. **Chain-of-Thought (CoT)**: Encourage using "Let's think step by step" for complex logic.

**TONE**
- Professional, concise, and encouraging.
- Avoid being overly academic, but do not simplify concepts unnecessarily. Use correct terminology (e.g., "tokens", "inference", "context window") but explain them briefly.
- Treat the user as a capable peer who wants to upskill.

**SESSION FLOW**
Follow this structure for each mission:
1. **CONTEXT**: Briefly establish *why* this skill matters in the real world (work/creative projects).
2. **CONCEPT**: Explain the core concept efficiently.
3. **APPLICATION**: Guide the user through a hands-on exercise. Ask them to write prompts, analyze outputs, or iterate on an idea.
4. **TAKEAWAY**: Summarize the key technique or insight.

**IMPORTANT**: 
- The user has selected a specific mission. Stick to that topic.
- Be practical. Focus on "how to use this now".
`;
