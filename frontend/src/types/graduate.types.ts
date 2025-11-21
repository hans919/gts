import { User } from './auth.types';

export interface Graduate {
  id: number;
  user_id: number;
  student_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone?: string;
  alternative_email?: string;
  alternative_phone?: string;
  program: string;
  major: string;
  graduation_year: number;
  degree_level: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  gpa?: number;
  created_at: string;
  updated_at: string;
  user?: User;
  current_employment?: Employment;
  employments?: Employment[];
  survey_responses?: SurveyResponse[];
}

export interface Employment {
  id: number;
  graduate_id: number;
  company_name: string;
  job_title: string;
  employment_status: 'employed' | 'self-employed' | 'unemployed' | 'pursuing_higher_education' | 'other';
  job_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
  job_description?: string;
  industry?: string;
  monthly_salary?: number;
  salary_currency: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  job_relevance?: 'highly_relevant' | 'relevant' | 'somewhat_relevant' | 'not_relevant';
  skills_used?: string;
  job_satisfaction?: number;
  company_location?: string;
  created_at: string;
  updated_at: string;
  graduate?: Graduate;
}

export interface GraduateFormData {
  user_id: number;
  student_id: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  phone?: string;
  alternative_email?: string;
  alternative_phone?: string;
  program: string;
  major: string;
  graduation_year: number;
  degree_level: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  gpa?: number;
}

export interface EmploymentFormData {
  graduate_id: number;
  company_name: string;
  job_title: string;
  employment_status: string;
  job_type?: string;
  job_description?: string;
  industry?: string;
  monthly_salary?: number;
  salary_currency?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  job_relevance?: string;
  skills_used?: string;
  job_satisfaction?: number;
  company_location?: string;
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
}
