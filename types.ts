
export type Track = 'Basics' | 'Prompts' | 'Creative Stories' | 'Creative Images' | 'Video' | 'Music' | 'Coding' | 'Research' | 'Data' | 'Automation' | 'Projects' | 'Business';

export interface Mission {
  id: string;
  track: Track;
  title: string;
  level: number;
  duration_minutes: number;
  goal: string;
  sample_activity_idea: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: number;
}

export type MissionStep = 'WARMUP' | 'LEARN' | 'DO' | 'REFLECT' | 'COMPLETE';

export type Audience = 'kids' | 'adults';

export interface AppState {
  currentMission: Mission | null;
  chatHistory: Message[];
  missionStep: MissionStep;
  isChatLoading: boolean;
  userApiKey: string | null;
  completedMissions: string[];
  audience: Audience;
}
