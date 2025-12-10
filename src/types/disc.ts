export type DISCProfile = 'D' | 'I' | 'S' | 'C';

export interface QuizAnswer {
  questionId: number;
  answer: string;
  profile: DISCProfile;
}

export interface QuizResult {
  profile: DISCProfile;
  scores: {
    D: number;
    I: number;
    S: number;
    C: number;
  };
}

export interface CompatibilityResult {
  userProfile: DISCProfile;
  partnerProfile: DISCProfile;
  percentage: number;
  strengths: string[];
  challenges: string[];
}

export interface UserData {
  name: string;
  partnerName?: string; // <--- CAMPO ADICIONADO
  email: string;
  phone?: string;
  userResult?: QuizResult;
  partnerResult?: QuizResult;
  compatibility?: CompatibilityResult;
  hasPremiumReport?: boolean;
}