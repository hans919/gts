import { useState, useEffect } from 'react';
import { Loader2, Briefcase, Building2, MapPin, DollarSign, Calendar, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from 'axios';

interface EmploymentSurvey {
  id: number;
  graduate_id: number;
  first_name: string;
  last_name: string;
  email: string;
  student_id: string;
  program: string;
  major: string;
  graduation_year: number;
  employment_status: string;
  company_name: string | null;
  job_title: string | null;
  industry: string | null;
  job_type: string | null;
  start_date: string | null;
  monthly_salary: number | null;
  salary_currency: string;
  job_location_city: string | null;
  job_location_country: string | null;
  is_related_to_course: string | null;
  job_finding_duration_months: string | null;
  job_finding_method: string | null;
  skills_acquired_in_college: string | null;
  additional_trainings: string | null;
  job_satisfaction: string | null;
  career_goals: string | null;
  further_education_plans: string | null;
  comments: string | null;
  created_at: string;
  updated_at: string;
}

export default function EmploymentSurveysManagement() {
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState<EmploymentSurvey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<EmploymentSurvey | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [error, setError] = useState<string>('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please login again.');
        setLoading(false);
        return;
      }

      const res = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/admin/employment-surveys', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log('Employment surveys fetched:', res.data.length, 'surveys');
      setSurveys(Array.isArray(res.data) ? res.data : []);
      setError('');
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching surveys:', error);
      const errorMsg = error.response?.data?.message || 'Failed to fetch employment surveys. Please try again.';
      setError(errorMsg);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lightsteelblue-locust-816886.hostingersite.com/api/admin/employment-surveys/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteId(null);
      fetchSurveys();
    } catch (error) {
      console.error('Error deleting survey:', error);
      setError('Failed to delete survey');
    }
  };

  const getEmploymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'employed': return 'bg-green-100 text-green-700 border-green-200';
      case 'self-employed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'unemployed': return 'bg-red-100 text-red-700 border-red-200';
      case 'further education': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'freelancing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredSurveys = filter === 'all' 
    ? surveys 
    : surveys.filter(s => s.employment_status.toLowerCase() === filter.toLowerCase());

  const stats = {
    total: surveys.length,
    employed: surveys.filter(s => s.employment_status.toLowerCase() === 'employed').length,
    selfEmployed: surveys.filter(s => s.employment_status.toLowerCase() === 'self-employed').length,
    unemployed: surveys.filter(s => s.employment_status.toLowerCase() === 'unemployed').length,
    education: surveys.filter(s => s.employment_status.toLowerCase() === 'further education').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Employment Surveys</h1>
        <p className="text-muted-foreground">View and manage graduate employment survey responses</p>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <div className="text-xs text-muted-foreground">Total Surveys</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.employed}</div>
            <div className="text-xs text-muted-foreground">Employed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.selfEmployed}</div>
            <div className="text-xs text-muted-foreground">Self-Employed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.unemployed}</div>
            <div className="text-xs text-muted-foreground">Unemployed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats.education}</div>
            <div className="text-xs text-muted-foreground">Further Education</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({surveys.length})
        </Button>
        <Button
          variant={filter === 'employed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('employed')}
        >
          Employed ({stats.employed})
        </Button>
        <Button
          variant={filter === 'self-employed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('self-employed')}
        >
          Self-Employed ({stats.selfEmployed})
        </Button>
        <Button
          variant={filter === 'unemployed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unemployed')}
        >
          Unemployed ({stats.unemployed})
        </Button>
        <Button
          variant={filter === 'further education' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('further education')}
        >
          Further Education ({stats.education})
        </Button>
      </div>

      {/* Survey Details Modal */}
      {selectedSurvey && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Survey Details</CardTitle>
                <CardDescription>
                  {selectedSurvey.first_name} {selectedSurvey.last_name} - {selectedSurvey.student_id}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedSurvey(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Graduate Info</p>
                <p className="text-sm">{selectedSurvey.first_name} {selectedSurvey.last_name}</p>
                <p className="text-xs text-muted-foreground">{selectedSurvey.email}</p>
                <p className="text-xs text-muted-foreground">{selectedSurvey.program} - {selectedSurvey.major}</p>
                <p className="text-xs text-muted-foreground">Class of {selectedSurvey.graduation_year}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Submission Date</p>
                <p className="text-sm">{new Date(selectedSurvey.created_at).toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-3">Employment Details</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Employment Status</p>
                  <Badge className={getEmploymentStatusColor(selectedSurvey.employment_status)}>
                    {selectedSurvey.employment_status}
                  </Badge>
                </div>

                {selectedSurvey.company_name && (
                  <div>
                    <p className="text-xs text-muted-foreground">Company</p>
                    <p className="text-sm font-medium">{selectedSurvey.company_name}</p>
                  </div>
                )}

                {selectedSurvey.job_title && (
                  <div>
                    <p className="text-xs text-muted-foreground">Job Title</p>
                    <p className="text-sm font-medium">{selectedSurvey.job_title}</p>
                  </div>
                )}

                {selectedSurvey.industry && (
                  <div>
                    <p className="text-xs text-muted-foreground">Industry</p>
                    <p className="text-sm">{selectedSurvey.industry}</p>
                  </div>
                )}

                {selectedSurvey.job_type && (
                  <div>
                    <p className="text-xs text-muted-foreground">Job Type</p>
                    <p className="text-sm">{selectedSurvey.job_type}</p>
                  </div>
                )}

                {selectedSurvey.start_date && (
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm">{new Date(selectedSurvey.start_date).toLocaleDateString()}</p>
                  </div>
                )}

                {selectedSurvey.monthly_salary && (
                  <div>
                    <p className="text-xs text-muted-foreground">Monthly Salary</p>
                    <p className="text-sm font-medium">
                      {selectedSurvey.salary_currency} {selectedSurvey.monthly_salary.toLocaleString()}
                    </p>
                  </div>
                )}

                {selectedSurvey.job_location_city && (
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm">
                      {selectedSurvey.job_location_city}
                      {selectedSurvey.job_location_country && `, ${selectedSurvey.job_location_country}`}
                    </p>
                  </div>
                )}

                {selectedSurvey.is_related_to_course && (
                  <div>
                    <p className="text-xs text-muted-foreground">Related to Course</p>
                    <p className="text-sm">{selectedSurvey.is_related_to_course}</p>
                  </div>
                )}

                {selectedSurvey.job_finding_duration_months && (
                  <div>
                    <p className="text-xs text-muted-foreground">Time to Find Job</p>
                    <p className="text-sm">{selectedSurvey.job_finding_duration_months}</p>
                  </div>
                )}

                {selectedSurvey.job_finding_method && (
                  <div>
                    <p className="text-xs text-muted-foreground">Job Finding Method</p>
                    <p className="text-sm">{selectedSurvey.job_finding_method}</p>
                  </div>
                )}

                {selectedSurvey.job_satisfaction && (
                  <div>
                    <p className="text-xs text-muted-foreground">Job Satisfaction</p>
                    <p className="text-sm">{selectedSurvey.job_satisfaction}</p>
                  </div>
                )}
              </div>
            </div>

            {selectedSurvey.skills_acquired_in_college && (
              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Skills Acquired in College</p>
                <p className="text-sm">{selectedSurvey.skills_acquired_in_college}</p>
              </div>
            )}

            {selectedSurvey.additional_trainings && (
              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Additional Trainings</p>
                <p className="text-sm">{selectedSurvey.additional_trainings}</p>
              </div>
            )}

            {selectedSurvey.career_goals && (
              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Career Goals</p>
                <p className="text-sm">{selectedSurvey.career_goals}</p>
              </div>
            )}

            {selectedSurvey.further_education_plans && (
              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Further Education Plans</p>
                <p className="text-sm">{selectedSurvey.further_education_plans}</p>
              </div>
            )}

            {selectedSurvey.comments && (
              <div className="border-t pt-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Additional Comments</p>
                <p className="text-sm">{selectedSurvey.comments}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Survey List */}
      <div className="grid gap-4">
        {filteredSurveys.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No employment surveys found</p>
            </CardContent>
          </Card>
        ) : (
          filteredSurveys.map((survey) => (
            <Card key={survey.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {survey.first_name} {survey.last_name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      <span className="font-semibold">{survey.student_id}</span> • {survey.program} - {survey.major}
                      <br />
                      Class of {survey.graduation_year} • {survey.email}
                    </CardDescription>
                  </div>
                  <Badge className={getEmploymentStatusColor(survey.employment_status)}>
                    {survey.employment_status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {survey.company_name && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{survey.company_name}</span>
                      {survey.job_title && <span className="text-muted-foreground">- {survey.job_title}</span>}
                    </div>
                  )}

                  {survey.industry && (
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{survey.industry}</span>
                      {survey.job_type && (
                        <Badge variant="outline" className="text-xs">
                          {survey.job_type}
                        </Badge>
                      )}
                    </div>
                  )}

                  {(survey.job_location_city || survey.job_location_country) && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {survey.job_location_city}
                        {survey.job_location_country && `, ${survey.job_location_country}`}
                      </span>
                    </div>
                  )}

                  {survey.monthly_salary && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {survey.salary_currency} {survey.monthly_salary.toLocaleString()}/month
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Submitted: {new Date(survey.created_at).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSurvey(survey)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <AlertDialog open={deleteId === survey.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(survey.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                              <AlertTriangle className="h-6 w-6 text-destructive" />
                            </div>
                            <div>
                              <AlertDialogTitle className="text-left">Delete Employment Survey</AlertDialogTitle>
                              <AlertDialogDescription className="text-left pt-1">
                                {survey.first_name} {survey.last_name} ({survey.student_id})
                              </AlertDialogDescription>
                            </div>
                          </div>
                        </AlertDialogHeader>
                        <AlertDialogDescription className="pt-2">
                          This will permanently delete this employment survey response. This action cannot be undone.
                        </AlertDialogDescription>
                        <AlertDialogFooter className="mt-4">
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Survey
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
