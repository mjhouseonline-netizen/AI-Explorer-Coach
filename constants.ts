
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
    "id": "stories-3",
    "track": "Creative Stories",
    "title": "The Infinite Genre Mashup",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Explore creativity by combining two unrelated genres into a single coherent scene.",
    "sample_activity_idea": "Mix 'Western' with 'Cyberpunk' or 'Medieval' with 'Space Opera'. Have AI help weave the disparate elements together."
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
    "id": "video-3",
    "track": "Video",
    "title": "Storyboard Master",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Learn how to describe a sequence of events for a multi-shot story.",
    "sample_activity_idea": "Describe three connected shots: a wide establishing shot, a medium character shot, and a close-up reaction shot."
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
    "goal": "Help the student write several detailed prompts they could paste into an external AI music generator.",
    "sample_activity_idea": "Student picks a theme (e.g. 'boss fight', 'chill study', 'happy intro'); AI guides them to specify genre, instruments, tempo, mood and structure."
  },
  {
    "id": "music-3",
    "track": "Music",
    "title": "Sound Effect Sorcerer",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Understand how to describe non-musical sounds for games or movies.",
    "sample_activity_idea": "Describe a 'magic portal opening' or a 'giant robot footstep' using textures, materials, and emotions."
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
    "sample_activity_idea": "Coach provides a simple code with a typo. Student asks AI to find the error and explain the fix."
  },
  {
    "id": "coding-3",
    "track": "Coding",
    "title": "Turtle Art AI",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Use code to draw shapes and patterns on the screen.",
    "sample_activity_idea": "Have AI generate Python Turtle code to draw a colorful snowflake or a spiral of squares."
  },
  {
    "id": "research-1",
    "track": "Research",
    "title": "Explain Like I'm 5",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Use AI to simplify complex school topics into easy-to-understand language.",
    "sample_activity_idea": "Pick a hard topic (e.g., Black Holes) and ask AI to explain it using a specific analogy (like 'compare it to a kitchen')."
  },
  {
    "id": "research-2",
    "track": "Research",
    "title": "The Instant Quiz Maker",
    "level": 2,
    "duration_minutes": 20,
    "goal": "Turn study notes into a fun quiz to help prepare for a test.",
    "sample_activity_idea": "Paste a paragraph and ask AI to generate 3 multiple-choice questions to test your knowledge."
  },
  {
    "id": "research-3",
    "track": "Research",
    "title": "The Fact Check Challenge",
    "level": 2,
    "duration_minutes": 20,
    "goal": "Learn how to spot 'hallucinations' and use AI to verify facts.",
    "sample_activity_idea": "AI gives 3 statements about history (one is wrong). Student uses AI to help figure out which one is the fake."
  },
  {
    "id": "data-1",
    "track": "Data",
    "title": "The Data Detective",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Learn how AI can scan information to find facts and count things quickly.",
    "sample_activity_idea": "Paste a messy list of class pets and ask AI to count them and make a chart."
  },
  {
    "id": "data-2",
    "track": "Data",
    "title": "Instant Table Maker",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Teach AI to organize messy information into neat, readable tables.",
    "sample_activity_idea": "Write a paragraph about 3 superheroes. Ask AI to turn it into a clean table."
  },
  {
    "id": "data-3",
    "track": "Data",
    "title": "Emoji Data Science",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Visualize trends using only emojis to make data fun and visual.",
    "sample_activity_idea": "Translate a week's worth of weather data into emoji strings and explain the patterns found."
  },
  {
    "id": "automation-1",
    "track": "Automation",
    "title": "Robot Logic",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Understand how to give instructions in a specific order, just like programming a robot.",
    "sample_activity_idea": "Write instructions for 'Making a Sandwich' and ask AI to find any missing steps."
  },
  {
    "id": "automation-2",
    "track": "Automation",
    "title": "The Morning Routine Machine",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Design a series of IF/THEN rules to optimize a daily routine.",
    "sample_activity_idea": "Create rules like 'If it is raining, THEN remind me to grab my umbrella' to build an automated morning plan."
  },
  {
    "id": "automation-3",
    "track": "Automation",
    "title": "Smart Assistant Designer",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Plan how a smart speaker should react to different voice commands.",
    "sample_activity_idea": "Design a 'Home Library Assistant' that knows where every book is and can recommend new ones based on mood."
  },
  {
    "id": "business-1",
    "track": "Business",
    "title": "Kid Entrepreneur",
    "level": 1,
    "duration_minutes": 25,
    "goal": "Brainstorm a fun small business idea and create a name and slogan using AI.",
    "sample_activity_idea": "Think of a service like dog walking. Ask AI to give you 5 catchy names and a slogan."
  },
  {
    "id": "business-2",
    "track": "Business",
    "title": "Logo Concept Lab",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Learn how to describe visual branding elements for a new business.",
    "sample_activity_idea": "Pick a business and decide on its colors, fonts, and core symbols. Ask AI to describe the perfect logo."
  },
  {
    "id": "business-3",
    "track": "Business",
    "title": "The Perfect Pitch",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn how to explain your business idea clearly to convince others to help you.",
    "sample_activity_idea": "Write a 30-second 'elevator pitch' for your business with AI helping to make it sound exciting and professional."
  },
  {
    "id": "project-1",
    "track": "Projects",
    "title": "Plan Your Own AI Helper",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Guide the student to design a simple AI helper concept.",
    "sample_activity_idea": "Student chooses a problem (e.g. starting homework); AI helps them describe what the helper should do."
  },
  {
    "id": "project-2",
    "track": "Projects",
    "title": "AI for Planet Earth",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Imagine an AI project that helps protect nature or animals.",
    "sample_activity_idea": "Design a 'Forest Guardian AI' that listens for chainsaws and alerts park rangers, or a 'Trash Sorter Bot'."
  },
  {
    "id": "project-3",
    "track": "Projects",
    "title": "The Ultimate Hobby Helper",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Plan an AI that makes your favorite hobby (gaming, sports, art) even better.",
    "sample_activity_idea": "Design a 'Drawing Coach AI' that gives you 5-minute sketching challenges every day."
  }
];

export const MISSIONS_ADULTS: Mission[] = [
  {
    "id": "adult-basics-1",
    "track": "Basics",
    "title": "How LLMs Actually Work",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Understand the mechanism of Large Language Models (tokens, probability) to demystify the 'magic'.",
    "sample_activity_idea": "Explain 'next token prediction' using a sentence completion game."
  },
  {
    "id": "adult-basics-2",
    "track": "Basics",
    "title": "Navigating Limitations & Hallucinations",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Learn why AI fabricates information and practical techniques to verify outputs.",
    "sample_activity_idea": "Analyze a scenario where AI might hallucinate and practice verification strategies."
  },
  {
    "id": "adult-basics-3",
    "track": "Basics",
    "title": "The Ethics of AI & Bias",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Examine how training data can inherit human biases and the importance of critical evaluation.",
    "sample_activity_idea": "Discuss real-world examples of algorithmic bias and how users can spot and report them."
  },
  {
    "id": "adult-prompts-1",
    "track": "Prompts",
    "title": "Prompt Engineering: The SPACE Framework",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Master the SPACE framework (Subject, Purpose, Audience, Context, Extras) to eliminate ambiguity in business communication and content creation.",
    "sample_activity_idea": "Transform a weak prompt like 'write a product description' into a detailed one using SPACE for a new eco-friendly water bottle aimed at hikers, including technical specs and a persuasive tone."
  },
  {
    "id": "adult-prompts-2",
    "track": "Prompts",
    "title": "Chain-of-Thought Reasoning",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Unlock the AI's advanced logic for debugging, strategic planning, or complex math by leveraging Chain-of-Thought prompting techniques like 'think step-by-step'.",
    "sample_activity_idea": "Solve a multi-stage business logic puzzle or a complex project planning task by forcing the model to show its step-by-step reasoning before providing the final answer."
  },
  {
    "id": "adult-prompts-3",
    "track": "Prompts",
    "title": "Few-Shot Prompting",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Improve reliability and output consistency by providing high-quality examples (shots) within your prompt for specific tasks like data extraction or tone matching.",
    "sample_activity_idea": "Create a feedback classifier prompt by providing 3 specific examples of user reviews and how they should be categorized into 'Positive', 'Neutral', or 'Negative'."
  },
  {
    "id": "adult-prompts-4",
    "track": "Prompts",
    "title": "Exploring Prompt Variations",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Understand how subtle phrasing changes can impact AI performance and creativity by testing and comparing multiple prompt versions.",
    "sample_activity_idea": "Take a core request and generate 3 variations—one direct, one role-based, and one constraint-heavy—to see which produces the most useful business result."
  },
  {
    "id": "adult-stories-1",
    "track": "Creative Stories",
    "title": "Professional Copywriting Partner",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use AI to brainstorm variations of marketing copy or headlines.",
    "sample_activity_idea": "Draft a LinkedIn bio and ask AI for variations in tone (witty, corporate, humble)."
  },
  {
    "id": "adult-stories-2",
    "track": "Creative Stories",
    "title": "Overcoming Writer's Block",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Use AI to outline plots or generate character backstories.",
    "sample_activity_idea": "Start with a rough premise and have AI generate a chapter outline and character sheets."
  },
  {
    "id": "adult-stories-3",
    "track": "Creative Stories",
    "title": "Narrative Tone & Voice Matching",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn how to prompt AI to mimic a specific existing brand voice or writing style.",
    "sample_activity_idea": "Provide a sample paragraph and ask AI to analyze its style, then write a new announcement in that same voice."
  },
  {
    "id": "adult-images-1",
    "track": "Creative Images",
    "title": "Photorealistic Prompting Techniques",
    "level": 2,
    "duration_minutes": 20,
    "goal": "Learn technical terms (lighting, aperture, film stock) to control style.",
    "sample_activity_idea": "Construct a prompt for a portrait adding 'Rembrandt lighting' and camera details."
  },
  {
    "id": "adult-images-2",
    "track": "Creative Images",
    "title": "Consistent Character Generation",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Techniques for maintaining identity across multiple images.",
    "sample_activity_idea": "Create a character profile and generate that character in different environments."
  },
  {
    "id": "adult-images-3",
    "track": "Creative Images",
    "title": "Architectural & Interior Design AI",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Use specific terminology to describe spaces, materials, and structural layouts.",
    "sample_activity_idea": "Prompt for a 'Mid-century modern living room with floor-to-ceiling glass and oak accents' and iterate on the lighting."
  },
  {
    "id": "adult-video-1",
    "track": "Video",
    "title": "Text-to-Video Fundamentals",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Understand generative video: possibilities and physics hallucinations.",
    "sample_activity_idea": "Draft a prompt for a surreal scene and discuss how AI morphing logic differs from animation."
  },
  {
    "id": "adult-video-2",
    "track": "Video",
    "title": "Cinematic Prompting for Video",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Apply film terminology to generate high-quality outputs.",
    "sample_activity_idea": "Rewrite a prompt to be a 'drone shot at night with neon lighting and timelapse movement'."
  },
  {
    "id": "adult-video-3",
    "track": "Video",
    "title": "AI Video Editing Essentials",
    "level": 3,
    "duration_minutes": 35,
    "goal": "Understand how AI assists in tasks like scene detection and auto-captioning.",
    "sample_activity_idea": "Analyze a short clip and ask AI to identify scenes or generate subtitles."
  },
  {
    "id": "adult-music-1",
    "track": "Music",
    "title": "AI as a Songwriting Collaborator",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use AI to generate rhyme schemes and chord progression ideas.",
    "sample_activity_idea": "Ask AI to suggest a Verse-Chorus structure and a chord progression for a specified mood."
  },
  {
    "id": "adult-music-2",
    "track": "Music",
    "title": "AI as a Music Producer Assistant",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Explore technical tasks like sound design and mastering suggestions.",
    "sample_activity_idea": "Ask AI for EQ settings for a 'muddy' vocal or a synth patch description."
  },
  {
    "id": "adult-music-3",
    "track": "Music",
    "title": "Ethical Considerations in AI Music",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Discuss legal landscapes including copyright and deepfakes.",
    "sample_activity_idea": "Analyze a deepfake scenario and list the pros and cons for the music industry."
  },
  {
    "id": "adult-coding-1",
    "track": "Coding",
    "title": "Code Explanation & Debugging",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use AI to explain complex code snippets in plain English.",
    "sample_activity_idea": "Paste a confusing block of code and ask AI to explain it line-by-line."
  },
  {
    "id": "adult-coding-2",
    "track": "Coding",
    "title": "Regex Rescue",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Generate complex Regular Expressions for data validation.",
    "sample_activity_idea": "Describe a text pattern and have AI generate the Regex string."
  },
  {
    "id": "adult-coding-3",
    "track": "Coding",
    "title": "Advanced Debugging with AI",
    "level": 3,
    "duration_minutes": 30,
    "goal": "Master techniques for identifying complex bugs and bottlenecks.",
    "sample_activity_idea": "Analyze a snippet with a subtle race condition and ask AI for the fix."
  },
  {
    "id": "adult-coding-4",
    "track": "Coding",
    "title": "AI for Code Refactoring",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Restructure existing code for better maintainability.",
    "sample_activity_idea": "Refactor a messy function into smaller, cleaner sub-functions."
  },
  {
    "id": "adult-research-1",
    "track": "Research",
    "title": "Academic Synthesizer",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Summarize multiple viewpoints or long documents efficiently.",
    "sample_activity_idea": "Summarize the pros and cons of remote work from three different perspectives."
  },
  {
    "id": "adult-research-2",
    "track": "Research",
    "title": "The Socratic Tutor",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Configure AI to quiz you to test your understanding.",
    "sample_activity_idea": "Ask AI to quiz you with increasingly difficult questions about Game Theory."
  },
  {
    "id": "adult-research-3",
    "track": "Research",
    "title": "Synthesizing Conflicting Data",
    "level": 3,
    "duration_minutes": 35,
    "goal": "Learn how to manage and reconcile contradictory information from multiple sources.",
    "sample_activity_idea": "Provide two articles with opposite conclusions on a topic and ask AI to map out the common ground and key points of divergence."
  },
  {
    "id": "adult-data-1",
    "track": "Data",
    "title": "Spreadsheet Formula Pro",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Generate complex Excel formulas from plain English.",
    "sample_activity_idea": "Describe a conditional sum scenario and get the exact formula needed."
  },
  {
    "id": "adult-data-2",
    "track": "Data",
    "title": "Data Cleaning Assistant",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Leverage AI to reformat and standardize messy datasets.",
    "sample_activity_idea": "Paste a messy list of names and ask AI to format them as 'Last Name, First Name' for CSV."
  },
  {
    "id": "adult-data-3",
    "track": "Data",
    "title": "Qualitative Analysis",
    "level": 3,
    "duration_minutes": 30,
    "goal": "Analyze unstructured text data to identify themes.",
    "sample_activity_idea": "Paste 5 varied reviews and ask AI to tag sentiment and extract core requests."
  },
  {
    "id": "adult-automation-1",
    "track": "Automation",
    "title": "Unstructured Data to JSON",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Parse messy text into structured formats for databases.",
    "sample_activity_idea": "Paste feedback and ask AI to extract 'Sentiment' and 'Action Required' into JSON."
  },
  {
    "id": "adult-automation-2",
    "track": "Automation",
    "title": "AI for Process Optimization",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Suggest improvements for business workflows.",
    "sample_activity_idea": "Describe a hiring workflow and ask AI to identify bottlenecks."
  },
  {
    "id": "adult-automation-3",
    "track": "Automation",
    "title": "Scripting with AI Assistants",
    "level": 1,
    "duration_minutes": 25,
    "goal": "Write simple scripts to automate repetitive tasks.",
    "sample_activity_idea": "Ask AI to write a Python script that renames files based on a pattern."
  },
  {
    "id": "adult-automation-4",
    "track": "Automation",
    "title": "AI for Productivity Hacks",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Discover tools to boost personal efficiency.",
    "sample_activity_idea": "Ask AI to recommend 3 strategies to manage email overload."
  },
  {
    "id": "adult-automation-5",
    "track": "Automation",
    "title": "AI for Time Management",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Leverage AI to optimize schedules and task prioritization.",
    "sample_activity_idea": "Ask AI to create an optimized schedule for a busy student with milestones."
  },
  {
    "id": "adult-business-1",
    "track": "Business",
    "title": "Strategic Decision Making (SWOT)",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Use AI to facilitate a SWOT analysis for a project.",
    "sample_activity_idea": "Draft a SWOT analysis for a new AI-driven marketing campaign. Have AI identify internal strengths in content automation, external threats like algorithm changes, and specific sales opportunities in untapped demographics."
  },
  {
    "id": "adult-business-2",
    "track": "Business",
    "title": "High-Stakes Communication",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Draft and role-play difficult professional emails.",
    "sample_activity_idea": "Draft a series of customer service responses handling complex shipping delays, or practice a sales 'rebuttal' prompt to handle common price objections in a high-stakes B2B software pitch."
  },
  {
    "id": "adult-business-3",
    "track": "Business",
    "title": "Meeting Intelligence",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Summarize messy notes into clean action items.",
    "sample_activity_idea": "Input a transcript from a sales discovery call. Ask AI to categorize points into 'Customer Pain Points' (Service), 'Budget Signals' (Sales), and 'Marketing Feedback', then generate a clear follow-up action plan."
  },
  {
    "id": "adult-project-1",
    "track": "Projects",
    "title": "The Productivity Accelerator",
    "level": 1,
    "duration_minutes": 30,
    "goal": "Build a workflow for summarizing and drafting.",
    "sample_activity_idea": "Create a system prompt that categorizes emails and drafts responses."
  },
  {
    "id": "adult-project-2",
    "track": "Projects",
    "title": "Coding Companion 101",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Learn how to use AI to explain and debug code.",
    "sample_activity_idea": "Explain a code snippet, find the error, and rewrite it with comments."
  },
  {
    "id": "adult-project-3",
    "track": "Projects",
    "title": "AI as a Virtual Tutor",
    "level": 2,
    "duration_minutes": 40,
    "goal": "Design a personalized AI tutor for a specific learning need.",
    "sample_activity_idea": "Outline features for an AI tutor that teaches a new language."
  },
  {
    "id": "adult-project-4",
    "track": "Projects",
    "title": "AI for Personal Learning Plans",
    "level": 1,
    "duration_minutes": 30,
    "goal": "Outline a personalized learning roadmap.",
    "sample_activity_idea": "Generate a 4-week study plan for 'Understand Crypto' with daily tasks."
  },
  {
    "id": "adult-project-5",
    "track": "Projects",
    "title": "Building a Basic AI Agent",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Conceptualize an AI agent that performs automated tasks.",
    "sample_activity_idea": "Draft a flow for a 'News Aggregator Agent' with search and summary actions."
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
