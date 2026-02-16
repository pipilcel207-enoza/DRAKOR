export interface Drama {
  id: string;
  title: string;
  thumbnail: string;
  playlistId: string;
  playlistIndex?: number; // Tambahan untuk urutan episode
  description: string;
  rating: number;
  year: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum View {
  HOME = 'HOME',
  LATEST = 'LATEST',
  PLAYER = 'PLAYER',
  SEARCH = 'SEARCH',
  AI_CHAT = 'AI_CHAT',
  PROFILE = 'PROFILE'
}

export interface PlaybackState {
  currentPlaylistId: string | null;
  title: string | null;
}