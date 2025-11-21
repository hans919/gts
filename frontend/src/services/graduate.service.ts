import api from './api';
import { Graduate, GraduateFormData, Employment, EmploymentFormData } from '../types/graduate.types';

export const graduateService = {
  async getAll(params?: {
    graduation_year?: number;
    program?: string;
    search?: string;
    page?: number;
  }): Promise<{ data: Graduate[]; total: number; per_page: number; current_page: number }> {
    const response = await api.get('/graduates', { params });
    return response.data;
  },

  async getById(id: number): Promise<Graduate> {
    const response = await api.get(`/graduates/${id}`);
    return response.data;
  },

  async create(data: GraduateFormData): Promise<Graduate> {
    const response = await api.post('/graduates', data);
    return response.data;
  },

  async update(id: number, data: Partial<GraduateFormData>): Promise<Graduate> {
    const response = await api.put(`/graduates/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/graduates/${id}`);
  },

  async getEmployments(graduateId: number): Promise<Employment[]> {
    const response = await api.get(`/graduates/${graduateId}/employments`);
    return response.data;
  },

  async getSurveyResponses(graduateId: number): Promise<any[]> {
    const response = await api.get(`/graduates/${graduateId}/survey-responses`);
    return response.data;
  },
};

export const employmentService = {
  async getAll(params?: {
    graduate_id?: number;
    employment_status?: string;
    is_current?: boolean;
    page?: number;
  }): Promise<{ data: Employment[]; total: number; per_page: number; current_page: number }> {
    const response = await api.get('/employments', { params });
    return response.data;
  },

  async getById(id: number): Promise<Employment> {
    const response = await api.get(`/employments/${id}`);
    return response.data;
  },

  async create(data: EmploymentFormData): Promise<Employment> {
    const response = await api.post('/employments', data);
    return response.data;
  },

  async update(id: number, data: Partial<EmploymentFormData>): Promise<Employment> {
    const response = await api.put(`/employments/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/employments/${id}`);
  },
};

export default graduateService;
