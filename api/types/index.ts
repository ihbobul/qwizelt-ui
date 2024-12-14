export interface Question {
  id: number;
  question: string;
  prompt: {
    id: number;
    prompt: string;
    type: string;
    difficulty: string;
  };
  variants: {
    id: number;
    variant: string;
  }[];
  labels: string[];
}

export interface Variant {
  id: number;
  variant: string;
}

export interface NewVariant {
  variant: string;
  id: number;
  question: {
    id: number;
    question: string;
  };
}

export interface RegisterParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization?: string;
}
