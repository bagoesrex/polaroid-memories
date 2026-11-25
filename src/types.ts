export interface Memory {
  id: number;
  image: string;
  caption: string;
  date: string;
  backNote: string;
  tilt: number;
}

export interface GiftConfig {
  recipient: string;
  sender: string;
  stickyNote: string;
  letterDate: string;
  letterBody: string;
}

export type ActiveModal = 'polaroid' | 'letter' | 'editor' | null;
