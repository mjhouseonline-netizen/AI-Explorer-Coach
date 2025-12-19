
import { Mission, Track } from './types';

export const TRACKS: Track[] = [
  'Basics', 'Prompts', 'Creative Stories', 'Creative Images', 'Video', 'Music', 'Coding', 'Research', 'Data', 'Automation', 'Business', 'Projects'
];

export const SAFETY_TIPS_KIDS = [
  "🔒 **Keep it Private**: Never tell an AI your real name, address, or where you go to school.",
  "🤖 **AI isn't Human**: AI doesn't have feelings or a brain like you. It's just a very smart pattern-finder.",
  "🕵️ **Fact Check**: AI can sometimes 'hallucinate' (make things up). Always double-check important facts!",
  "🎨 **Be Kind**: Use AI to create and help, never to make fun of others or be mean.",
  "📚 **School First**: AI is a great tutor, but using it to do your homework without learning is 'cheating yourself'."
];

export const SAFETY_TIPS_ADULTS = [
  "⚖️ **Check for Bias**: AI can inherit prejudices from its training data. Always review outputs for fairness.",
  "🔍 **Verify Sources**: Large Language Models are not search engines; they predict text. Always verify critical data.",
  "📂 **Data Privacy**: Avoid uploading sensitive corporate data or PII (Personally Identifiable Information) to public AI models.",
  "📝 **IP Awareness**: Be aware of copyright and intellectual property when using AI-generated content for commercial use.",
  "🧠 **Human-in-the-loop**: AI is a co-pilot, not an autopilot. Critical decisions should always be made by a human."
];

export const MISSIONS_KIDS: Mission[] = [
  // BASICS
  {
    "id": "basics-1",
    "track": "Basics",
    "title": "What Is AI, Really?",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Understand AI as pattern-finding software, not magic.",
    "sample_activity_idea": "Compare AI to a super autocomplete."
  },
  {
    "id": "basics-2",
    "track": "Basics",
    "title": "AI's Secret Ingredients",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Understand the role of algorithms and data.",
    "sample_activity_idea": "Build a 'paper algorithm' for sorting candy."
  },
  {
    "id": "basics-3",
    "track": "Basics",
    "title": "AI Training Secrets",
    "level": 2,
    "duration_minutes": 25,
    "goal": "How examples (data) change how an AI behaves.",
    "sample_activity_idea": "Imagine teaching an AI to recognize a 'Glub-Wub' alien using different pictures."
  },
  {
    "id": "basics-4",
    "track": "Basics",
    "title": "The Turing Test Challenge",
    "level": 3,
    "duration_minutes": 30,
    "goal": "Understand the history of AI testing and identifying human vs AI outputs.",
    "sample_activity_idea": "Analyze snippets to guess: Human or AI?"
  },

  // PROMPTS
  {
    "id": "prompts-1",
    "track": "Prompts",
    "title": "The Magic of Details",
    "level": 1,
    "duration_minutes": 20,
    "goal": "See how adding detail improves results.",
    "sample_activity_idea": "Turn 'draw a cat' into a masterpiece prompt."
  },
  {
    "id": "prompts-2",
    "track": "Prompts",
    "title": "Roleplay Power",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use 'Act as' to change AI persona.",
    "sample_activity_idea": "Ask a pirate to explain gravity."
  },
  {
    "id": "prompts-3",
    "track": "Prompts",
    "title": "Building a Prompt Framework",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn the 4-step framework: Role, Goal, Detail, Output.",
    "sample_activity_idea": "Design a study buddy prompt."
  },
  {
    "id": "prompts-4",
    "track": "Prompts",
    "title": "Constraint Commander",
    "level": 3,
    "duration_minutes": 30,
    "goal": "Master negative prompts and strict output formats.",
    "sample_activity_idea": "Write a story without using the letter 'e'."
  },

  // STORIES
  {
    "id": "stories-1",
    "track": "Creative Stories",
    "title": "Character Creator",
    "level": 1,
    "duration_minutes": 25,
    "goal": "Create a unique hero with AI.",
    "sample_activity_idea": "Brainstorm hero powers and weaknesses."
  },
  {
    "id": "stories-2",
    "track": "Creative Stories",
    "title": "The Plot Twist Machine",
    "level": 1,
    "duration_minutes": 25,
    "goal": "Generate exciting story hooks.",
    "sample_activity_idea": "Ask AI for 3 'What if?' scenarios."
  },
  {
    "id": "stories-3",
    "track": "Creative Stories",
    "title": "Genre Mashup Challenge",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Mix two genres (e.g. Space + Western).",
    "sample_activity_idea": "Write a scene for a Cowboy Astronaut."
  },
  {
    "id": "stories-4",
    "track": "Creative Stories",
    "title": "Interactive Story Engine",
    "level": 3,
    "duration_minutes": 40,
    "goal": "Build a choice-based RPG world.",
    "sample_activity_idea": "Create a 'Choose your own adventure' script."
  },

  // IMAGES
  {
    "id": "images-1",
    "track": "Creative Images",
    "title": "Visual Vocabulary",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Learn terms like 'vibrant', 'cinematic', and 'aerial'.",
    "sample_activity_idea": "Describe a dream forest using 5 key visual terms."
  },
  {
    "id": "images-2",
    "track": "Creative Images",
    "title": "Art History Explorer",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Mix modern ideas with old art styles.",
    "sample_activity_idea": "A iPhone in the style of cave paintings."
  },
  {
    "id": "images-3",
    "track": "Creative Images",
    "title": "The Lighting Lab",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Understand how lighting changes the mood.",
    "sample_activity_idea": "Contrast 'golden hour' vs 'neon noir'."
  },
  {
    "id": "images-4",
    "track": "Creative Images",
    "title": "Hyper-Real Architect",
    "level": 3,
    "duration_minutes": 35,
    "goal": "Master complex, multi-layered visual prompts.",
    "sample_activity_idea": "Design a 4K photorealistic treehouse city."
  },

  // VIDEO
  {
    "id": "video-1",
    "track": "Video",
    "title": "Motion Prompts",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Describe movement for AI animation.",
    "sample_activity_idea": "Prompts for 'slow motion' vs 'warp speed'."
  },
  {
    "id": "video-2",
    "track": "Video",
    "title": "Scene Director",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Learn camera angles (Wide, Close-up).",
    "sample_activity_idea": "Plan a close-up of a robot's eye."
  },
  {
    "id": "video-3",
    "track": "Video",
    "title": "Storyboard Master",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Describe a sequence of 3 connected scenes.",
    "sample_activity_idea": "The sequence of a spaceship taking off."
  },
  {
    "id": "video-4",
    "track": "Video",
    "title": "Cinematic Storyteller",
    "level": 3,
    "duration_minutes": 40,
    "goal": "Master high-level directing terms.",
    "sample_activity_idea": "Create a trailer script for an epic AI movie."
  },

  // MUSIC
  {
    "id": "music-1",
    "track": "Music",
    "title": "Mood & Tempo",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Connect feelings to musical terms (BPM, Minor/Major).",
    "sample_activity_idea": "Describe a 'spooky but happy' beat."
  },
  {
    "id": "music-2",
    "track": "Music",
    "title": "Instrumental Mix",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Combine different instruments into a prompt.",
    "sample_activity_idea": "Mix 'Ukulele' with 'Electronic Bass'."
  },
  {
    "id": "music-3",
    "track": "Music",
    "title": "Genre Fusion",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Blend unrelated music styles.",
    "sample_activity_idea": "Create 'Classical Dubstep'."
  },
  {
    "id": "music-4",
    "track": "Music",
    "title": "The AI Composer",
    "level": 3,
    "duration_minutes": 40,
    "goal": "Structure a full song (Intro, Verse, Chorus).",
    "sample_activity_idea": "Write a layout for an 8-bit game theme."
  },

  // CODING
  {
    "id": "coding-1",
    "track": "Coding",
    "title": "Logic Puzzles",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Think like a programmer (If/Then).",
    "sample_activity_idea": "Create code logic for a door that opens."
  },
  {
    "id": "coding-2",
    "track": "Coding",
    "title": "The Code Translator",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Translate plain English to simple Python.",
    "sample_activity_idea": "Make the AI say 'Hello' in 5 languages."
  },
  {
    "id": "coding-3",
    "track": "Coding",
    "title": "Bug Hunter",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Spot and fix mistakes with AI help.",
    "sample_activity_idea": "Find the error in a broken loop."
  },
  {
    "id": "coding-4",
    "track": "Coding",
    "title": "Game Engine Builder",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Plan the structure of a mini-game.",
    "sample_activity_idea": "Design the systems for a Space Invaders clone."
  },

  // RESEARCH
  {
    "id": "research-1",
    "track": "Research",
    "title": "Simplification Pro",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Explain hard things simply.",
    "sample_activity_idea": "Explain 'Quantum Physics' using Legos."
  },
  {
    "id": "research-2",
    "track": "Research",
    "title": "Fact-Check Detective",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Identify AI hallucinations.",
    "sample_activity_idea": "Spot 3 lies in a story about George Washington."
  },
  {
    "id": "research-3",
    "track": "Research",
    "title": "Sourcing Specialist",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Learn how to ask AI for evidence and links.",
    "sample_activity_idea": "Find 3 real facts about Mars."
  },
  {
    "id": "research-4",
    "track": "Research",
    "title": "Advanced Summarizer",
    "level": 3,
    "duration_minutes": 35,
    "goal": "Condense 10 pages into 3 bullet points.",
    "sample_activity_idea": "Summarize a long Wikipedia article on AI."
  },

  // DATA
  {
    "id": "data-1",
    "track": "Data",
    "title": "Sorting Wizard",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Organize messy lists.",
    "sample_activity_idea": "Sort 50 random toys into 3 categories."
  },
  {
    "id": "data-2",
    "track": "Data",
    "title": "Pattern Seeker",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Find trends in small sets of data.",
    "sample_activity_idea": "Find the most popular pizza topping in class."
  },
  {
    "id": "data-3",
    "track": "Data",
    "title": "Visual Data",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Turn numbers into emoji charts.",
    "sample_activity_idea": "Chart your mood over a week with emojis."
  },
  {
    "id": "data-4",
    "track": "Data",
    "title": "The Data Scientist",
    "level": 3,
    "duration_minutes": 40,
    "goal": "Make predictions based on historical data.",
    "sample_activity_idea": "Predict next week's weather using patterns."
  },

  // AUTOMATION
  {
    "id": "automation-1",
    "track": "Automation",
    "title": "Step-by-Step Robotics",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Write perfect instructions.",
    "sample_activity_idea": "The 'How to Tie Shoes' challenge."
  },
  {
    "id": "automation-2",
    "track": "Automation",
    "title": "Smart Home Planner",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Identify repeatable daily tasks.",
    "sample_activity_idea": "Automate your morning routine."
  },
  {
    "id": "automation-3",
    "track": "Automation",
    "title": "Trigger & Action",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Understand 'When X happens, do Y'.",
    "sample_activity_idea": "If it rains, THEN text Mom to pick me up."
  },
  {
    "id": "automation-4",
    "track": "Automation",
    "title": "Workflow Architect",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Connect 5 different steps into one system.",
    "sample_activity_idea": "An automated system for homework tracking."
  },

  // BUSINESS
  {
    "id": "business-1",
    "track": "Business",
    "title": "The Lemonade Stand 2.0",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Basic business naming and brainstorming.",
    "sample_activity_idea": "Name your new pet-sitting business."
  },
  {
    "id": "business-2",
    "track": "Business",
    "title": "Catchy Slogans",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Writing short, punchy marketing text.",
    "sample_activity_idea": "Write 5 slogans for a cool hat shop."
  },
  {
    "id": "business-3",
    "track": "Business",
    "title": "Product Designer",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Describe features for a new invention.",
    "sample_activity_idea": "The self-cleaning backpack design."
  },
  {
    "id": "business-4",
    "track": "Business",
    "title": "CEO Pitch Master",
    "level": 3,
    "duration_minutes": 40,
    "goal": "Prepare a full professional pitch.",
    "sample_activity_idea": "Pitch a 'Garbage-to-Energy' startup."
  },

  // PROJECTS
  {
    "id": "project-1",
    "track": "Projects",
    "title": "Hobby Helper",
    "level": 1,
    "duration_minutes": 30,
    "goal": "Use AI to improve a real-life hobby.",
    "sample_activity_idea": "Design a 5-day Minecraft build challenge."
  },
  {
    "id": "project-2",
    "track": "Projects",
    "title": "Community Hero",
    "level": 1,
    "duration_minutes": 30,
    "goal": "Plan a project that helps neighbors.",
    "sample_activity_idea": "An AI system to help people find lost pets."
  },
  {
    "id": "project-3",
    "track": "Projects",
    "title": "Plan Your Helper",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Detailed project planning with milestones.",
    "sample_activity_idea": "The 'Finish Homework Early' project plan."
  },
  {
    "id": "project-4",
    "track": "Projects",
    "title": "Global Solution Lab",
    "level": 3,
    "duration_minutes": 50,
    "goal": "Design a complex AI solution for a world problem.",
    "sample_activity_idea": "A fleet of ocean-cleaning AI drones."
  }
];

export const MISSIONS_ADULTS: Mission[] = [
  // BASICS
  {
    "id": "adult-basics-1",
    "track": "Basics",
    "title": "How LLMs Actually Work",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Understand tokens, probability, and prediction.",
    "sample_activity_idea": "The next-token prediction game."
  },
  {
    "id": "adult-basics-2",
    "track": "Basics",
    "title": "The Hallucination Map",
    "level": 1,
    "duration_minutes": 15,
    "goal": "Learn why AI fabricates and how to spot it.",
    "sample_activity_idea": "Analyze 3 AI failures and why they happened."
  },
  {
    "id": "adult-basics-3",
    "track": "Basics",
    "title": "The Architecture of Transformers",
    "level": 2,
    "duration_minutes": 25,
    "goal": "Understand the 'Attention' mechanism.",
    "sample_activity_idea": "Explain attention using a party analogy."
  },
  {
    "id": "adult-basics-4",
    "track": "Basics",
    "title": "Global AI Safety Governance",
    "level": 3,
    "duration_minutes": 35,
    "goal": "Analyze AGI risks and regulatory approaches.",
    "sample_activity_idea": "Compare EU vs USA AI regulations."
  },

  // PROMPTS
  {
    "id": "adult-prompts-1",
    "track": "Prompts",
    "title": "The SPACE Framework",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Master Subject, Purpose, Audience, Context, Extras.",
    "sample_activity_idea": "Turn a 3-word prompt into a 300-word one."
  },
  {
    "id": "adult-prompts-2",
    "track": "Prompts",
    "title": "Few-Shot Prompting",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Improve consistency with examples.",
    "sample_activity_idea": "Train an AI on your specific writing style."
  },
  {
    "id": "adult-prompts-3",
    "track": "Prompts",
    "title": "Chain-of-Thought (CoT)",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Unlock advanced logic for complex problems.",
    "sample_activity_idea": "Solve a multi-step business logic puzzle."
  },
  {
    "id": "adult-prompts-4",
    "track": "Prompts",
    "title": "Meta-Prompting",
    "level": 3,
    "duration_minutes": 40,
    "goal": "Ask AI to critique and improve its own prompt.",
    "sample_activity_idea": "Iteratively build a 'perfect' legal prompt."
  },

  // STORIES
  {
    "id": "adult-stories-1",
    "track": "Creative Stories",
    "title": "Copywriting Partner",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Brainstorm marketing headlines.",
    "sample_activity_idea": "Write 10 variations of a product landing page."
  },
  {
    "id": "adult-stories-2",
    "track": "Creative Stories",
    "title": "Tone & Voice Analysis",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Mimic specific brand voices.",
    "sample_activity_idea": "Write a funny email in a serious legal tone."
  },
  {
    "id": "adult-stories-3",
    "track": "Creative Stories",
    "title": "Narrative Outlining",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Structure a complex multi-chapter story.",
    "sample_activity_idea": "Plot a sci-fi trilogy using AI logic."
  },
  {
    "id": "adult-stories-4",
    "track": "Creative Stories",
    "title": "World-Building Manual",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Create a 50-page deep-lore guide.",
    "sample_activity_idea": "Design the economy and culture of a city."
  },

  // IMAGES
  {
    "id": "adult-images-1",
    "track": "Creative Images",
    "title": "Visual Directing 101",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Basic composition and color prompts.",
    "sample_activity_idea": "Prompt for a 'minimalist office' look."
  },
  {
    "id": "adult-images-2",
    "track": "Creative Images",
    "title": "Style Reference Mapping",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Cite specific artists and time periods.",
    "sample_activity_idea": "Cyberpunk in the style of Rembrandt."
  },
  {
    "id": "adult-images-3",
    "track": "Creative Images",
    "title": "Technical Camera Specs",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Master focal length, aperture, and lighting.",
    "sample_activity_idea": "Prompt for a 35mm film street photo."
  },
  {
    "id": "adult-images-4",
    "track": "Creative Images",
    "title": "Identity Persistence",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Maintain character consistency across images.",
    "sample_activity_idea": "Generate the same person in 5 locations."
  },

  // VIDEO
  {
    "id": "adult-video-1",
    "track": "Video",
    "title": "Gen-Video Capabilities",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Understand what AI video can/can't do.",
    "sample_activity_idea": "Brainstorm 3 use cases for short AI clips."
  },
  {
    "id": "adult-video-2",
    "track": "Video",
    "title": "Looping & Transitioning",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Prompts for smooth background video.",
    "sample_activity_idea": "Describe a perfect lo-fi study loop."
  },
  {
    "id": "adult-video-3",
    "track": "Video",
    "title": "Cinematic Director",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Apply professional film terminology.",
    "sample_activity_idea": "Prompt a 'dolly zoom' shot on a mountain."
  },
  {
    "id": "adult-video-4",
    "track": "Video",
    "title": "AI Post-Production",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Learn about AI editing and upscaling.",
    "sample_activity_idea": "Plan the visual effects for a sci-fi short."
  },

  // MUSIC
  {
    "id": "adult-music-1",
    "track": "Music",
    "title": "Audio Prompting 101",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Describe instruments, mood, and genre.",
    "sample_activity_idea": "Prompt for '1980s synthwave'."
  },
  {
    "id": "adult-music-2",
    "track": "Music",
    "title": "Tempo & Key",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use specific BPM and musical keys.",
    "sample_activity_idea": "Describe a track in G Major at 128 BPM."
  },
  {
    "id": "adult-music-3",
    "track": "Music",
    "title": "Electronic Sound Design",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Use synth and processing terminology.",
    "sample_activity_idea": "Prompt for 'distorted sawtooth bass'."
  },
  {
    "id": "adult-music-4",
    "track": "Music",
    "title": "Professional Arrangement",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Structure complex, layered compositions.",
    "sample_activity_idea": "Plan a 3-minute cinematic soundtrack."
  },

  // CODING
  {
    "id": "adult-coding-1",
    "track": "Coding",
    "title": "Code Explainer",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Use AI to understand messy legacy code.",
    "sample_activity_idea": "Paste a cryptic script and get comments."
  },
  {
    "id": "adult-coding-2",
    "track": "Coding",
    "title": "Boilerplate Generator",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Speed up setup with AI templates.",
    "sample_activity_idea": "Generate a standard HTML/CSS structure."
  },
  {
    "id": "adult-coding-3",
    "track": "Coding",
    "title": "Regex Rescue",
    "level": 2,
    "duration_minutes": 30,
    "goal": "Master complex string patterns.",
    "sample_activity_idea": "Create a regex for complex email validation."
  },
  {
    "id": "adult-coding-4",
    "track": "Coding",
    "title": "Refactoring Pro",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Optimize code for performance and readability.",
    "sample_activity_idea": "Turn a 50-line function into 5 lines."
  },

  // RESEARCH
  {
    "id": "adult-research-1",
    "track": "Research",
    "title": "Abstract Summarizer",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Condense technical papers into plain text.",
    "sample_activity_idea": "Summarize a medical study on caffeine."
  },
  {
    "id": "adult-research-2",
    "track": "Research",
    "title": "The Counter-Argument",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Test your ideas with AI skepticism.",
    "sample_activity_idea": "Argue with AI about remote work pros/cons."
  },
  {
    "id": "adult-research-3",
    "track": "Research",
    "title": "Synthesis Specialist",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Combine 3 different viewpoints.",
    "sample_activity_idea": "Synthesize a report from 3 news sites."
  },
  {
    "id": "adult-research-4",
    "track": "Research",
    "title": "Deep-Dive Analyst",
    "level": 3,
    "duration_minutes": 45,
    "goal": "Find obscure connections in data.",
    "sample_activity_idea": "Map the history of AI since the 1950s."
  },

  // DATA
  {
    "id": "adult-data-1",
    "track": "Data",
    "title": "Excel Formula Pro",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Write complex VLOOKUP/Index-Match.",
    "sample_activity_idea": "Solve a messy inventory count problem."
  },
  {
    "id": "adult-data-2",
    "track": "Data",
    "title": "Data Reformatting",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Clean messy user-input lists.",
    "sample_activity_idea": "Turn text notes into a clean CSV format."
  },
  {
    "id": "adult-data-3",
    "track": "Data",
    "title": "Sentiment Analysis",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Analyze thousands of reviews for trends.",
    "sample_activity_idea": "Categorize 20 reviews as 'Happy' or 'Sad'."
  },
  {
    "id": "adult-data-4",
    "track": "Data",
    "title": "Predictive Modeling",
    "level": 3,
    "duration_minutes": 50,
    "goal": "Use stats to forecast business metrics.",
    "sample_activity_idea": "Predict next year's sales using seasonality."
  },

  // AUTOMATION
  {
    "id": "adult-automation-1",
    "track": "Automation",
    "title": "Personal AI Assistant",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Identify time-wasters in your week.",
    "sample_activity_idea": "Plan an automated email sorting rule."
  },
  {
    "id": "adult-automation-2",
    "track": "Automation",
    "title": "Scripting 101",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Write basic shell/python scripts.",
    "sample_activity_idea": "Automate renaming 100 files at once."
  },
  {
    "id": "adult-automation-3",
    "track": "Automation",
    "title": "API Integrator",
    "level": 2,
    "duration_minutes": 40,
    "goal": "Understand how AI talks to other apps.",
    "sample_activity_idea": "Connect AI to a Calendar or Slack app."
  },
  {
    "id": "adult-automation-4",
    "track": "Automation",
    "title": "Enterprise Workflow",
    "level": 3,
    "duration_minutes": 50,
    "goal": "Design a 10-step autonomous system.",
    "sample_activity_idea": "The 'Auto-Research & Newsletter' agent."
  },

  // BUSINESS
  {
    "id": "adult-business-1",
    "track": "Business",
    "title": "AI for Small Teams",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Quick ROI wins for productivity.",
    "sample_activity_idea": "Automate meeting summaries for a team."
  },
  {
    "id": "adult-business-2",
    "track": "Business",
    "title": "Strategic SWOT Analysis",
    "level": 1,
    "duration_minutes": 20,
    "goal": "Evaluate business ideas with AI.",
    "sample_activity_idea": "Run a SWOT on a new 'AI Coffee Shop'."
  },
  {
    "id": "adult-business-3",
    "track": "Business",
    "title": "Market Positioning",
    "level": 2,
    "duration_minutes": 35,
    "goal": "Find your niche in a crowded market.",
    "sample_activity_idea": "Compare 5 competitors and find the gap."
  },
  {
    "id": "adult-business-4",
    "track": "Business",
    "title": "Enterprise AI Strategy",
    "level": 3,
    "duration_minutes": 50,
    "goal": "Scale AI across a whole corporation.",
    "sample_activity_idea": "Design an AI Ethics Policy for a company."
  },

  // PROJECTS
  {
    "id": "adult-project-1",
    "track": "Projects",
    "title": "Personal Learning Plan",
    "level": 1,
    "duration_minutes": 30,
    "goal": "Master a new skill in 30 days.",
    "sample_activity_idea": "Plan a 4-week roadmap to learn Python."
  },
  {
    "id": "adult-project-2",
    "track": "Projects",
    "title": "Professional Portfolio",
    "level": 1,
    "duration_minutes": 30,
    "goal": "Draft high-impact case studies.",
    "sample_activity_idea": "Revamp your resume using AI tone matching."
  },
  {
    "id": "adult-project-3",
    "track": "Projects",
    "title": "Custom GPT Prototype",
    "level": 2,
    "duration_minutes": 45,
    "goal": "Design a specialized AI tool for work.",
    "sample_activity_idea": "The 'Real Estate Contract Reviewer' bot."
  },
  {
    "id": "adult-project-4",
    "track": "Projects",
    "title": "The Fully Autonomous Agent",
    "level": 3,
    "duration_minutes": 60,
    "goal": "Blueprint a long-running, multi-task AI.",
    "sample_activity_idea": "A bot that monitors stock news and trades."
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
