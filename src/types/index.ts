export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  goal: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  joinDate: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  sessionsPerWeek: number;
  image: string;
  coach: Coach;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  muscle: string;
  completed?: boolean;
}

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  clients: number;
  image: string;
  bio: string;
  certifications: string[];
}

export interface WorkoutSession {
  id: string;
  date: string;
  programName: string;
  duration: number;
  calories: number;
  exercises: number;
  completed: boolean;
}

export interface ProgressData {
  week: string;
  sessions: number;
  calories: number;
  duration: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}
