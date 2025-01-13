export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  pillCount: number;
  reason: string;
  frequency: '1x' | '2x' | '3x' | '4x';
  notes?: string;
}

export interface User {
  username: string;
  password: string;
}