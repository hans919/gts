export interface DashboardStats {
  total_graduates: number;
  total_surveys: number;
  active_surveys: number;
  total_responses: number;
  employment_stats: EmploymentStatusStat[];
  recent_graduates: any[];
}

export interface EmploymentStatusStat {
  employment_status: string;
  count: number;
}

export interface JobRelevanceStat {
  job_relevance: string;
  count: number;
}

export interface SalaryDistribution {
  salary_range: string;
  count: number;
  average: number;
}

export interface IndustryDistribution {
  industry: string;
  count: number;
}

export interface ProgramOutcome {
  program: string;
  degree_level: string;
  total_graduates: number;
  employed_count: number;
  avg_salary: number;
}

export interface SurveyCompletionStat {
  id: number;
  title: string;
  status: string;
  total_responses: number;
  completed_responses: number;
}

export interface GraduatesByYear {
  graduation_year: number;
  count: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}
