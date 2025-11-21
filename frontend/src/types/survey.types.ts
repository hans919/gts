export interface Survey {
  id: number;
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  start_date: string;
  end_date?: string;
  status: 'draft' | 'active' | 'closed';
  target_graduation_year?: string;
  target_program?: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
  responses_count?: number;
  responses?: SurveyResponse[];
}

export interface SurveyQuestion {
  id: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'rating' | 'date';
  question: string;
  required: boolean;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface SurveyResponse {
  id: number;
  survey_id: number;
  graduate_id: number;
  responses: Record<string, any>;
  submitted_at?: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
  survey?: Survey;
  graduate?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export interface SurveyFormData {
  title: string;
  description?: string;
  questions: SurveyQuestion[];
  start_date: string;
  end_date?: string;
  status: 'draft' | 'active' | 'closed';
  target_graduation_year?: string;
  target_program?: string;
  is_anonymous: boolean;
}

export interface SurveyResponseFormData {
  survey_id: number;
  graduate_id: number;
  responses: Record<string, any>;
  is_complete: boolean;
}
