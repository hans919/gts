import api from './api';
import {
  DashboardStats,
  EmploymentStatusStat,
  JobRelevanceStat,
  SalaryDistribution,
  IndustryDistribution,
  ProgramOutcome,
  SurveyCompletionStat,
  GraduatesByYear,
} from '../types/analytics.types';

export const analyticsService = {
  async getDashboard(): Promise<DashboardStats> {
    const response = await api.get('/analytics/dashboard');
    return response.data;
  },

  async getEmploymentStatus(): Promise<EmploymentStatusStat[]> {
    const response = await api.get('/analytics/employment-status');
    return response.data;
  },

  async getJobRelevance(): Promise<JobRelevanceStat[]> {
    const response = await api.get('/analytics/job-relevance');
    return response.data;
  },

  async getSalaryDistribution(): Promise<SalaryDistribution[]> {
    const response = await api.get('/analytics/salary-distribution');
    return response.data;
  },

  async getIndustryDistribution(): Promise<IndustryDistribution[]> {
    const response = await api.get('/analytics/industry-distribution');
    return response.data;
  },

  async getProgramOutcomes(): Promise<ProgramOutcome[]> {
    const response = await api.get('/analytics/program-outcomes');
    return response.data;
  },

  async getSurveyCompletion(): Promise<SurveyCompletionStat[]> {
    const response = await api.get('/analytics/survey-completion');
    return response.data;
  },

  async getGraduatesByYear(): Promise<GraduatesByYear[]> {
    const response = await api.get('/analytics/graduates-by-year');
    return response.data;
  },
};

export default analyticsService;
