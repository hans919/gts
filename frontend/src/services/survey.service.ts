import api from './api';
import { Survey, SurveyFormData, SurveyResponse, SurveyResponseFormData } from '../types/survey.types';

export const surveyService = {
  async getAll(params?: {
    status?: string;
    active?: boolean;
    page?: number;
  }): Promise<{ data: Survey[]; total: number; per_page: number; current_page: number }> {
    const response = await api.get('/surveys', { params });
    return response.data;
  },

  async getById(id: number): Promise<Survey> {
    const response = await api.get(`/surveys/${id}`);
    return response.data;
  },

  async create(data: SurveyFormData): Promise<Survey> {
    const response = await api.post('/surveys', data);
    return response.data;
  },

  async update(id: number, data: Partial<SurveyFormData>): Promise<Survey> {
    const response = await api.put(`/surveys/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/surveys/${id}`);
  },

  async getResponses(surveyId: number): Promise<SurveyResponse[]> {
    const response = await api.get(`/surveys/${surveyId}/responses`);
    return response.data;
  },

  async duplicate(surveyId: number): Promise<Survey> {
    const response = await api.post(`/surveys/${surveyId}/duplicate`);
    return response.data;
  },
};

export const surveyResponseService = {
  async getAll(params?: {
    survey_id?: number;
    graduate_id?: number;
    is_complete?: boolean;
    page?: number;
  }): Promise<{ data: SurveyResponse[]; total: number; per_page: number; current_page: number }> {
    const response = await api.get('/survey-responses', { params });
    return response.data;
  },

  async getById(id: number): Promise<SurveyResponse> {
    const response = await api.get(`/survey-responses/${id}`);
    return response.data;
  },

  async create(data: SurveyResponseFormData): Promise<SurveyResponse> {
    const response = await api.post('/survey-responses', data);
    return response.data;
  },

  async update(id: number, data: Partial<SurveyResponseFormData>): Promise<SurveyResponse> {
    const response = await api.put(`/survey-responses/${id}`, data);
    return response.data;
  },

  async submit(id: number): Promise<SurveyResponse> {
    const response = await api.post(`/survey-responses/${id}/submit`);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/survey-responses/${id}`);
  },
};

export default surveyService;
