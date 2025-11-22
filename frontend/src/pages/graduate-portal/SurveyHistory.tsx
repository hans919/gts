import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, FileText, CheckCircle, Clock, AlertCircle, Plus, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

interface Survey {
  id: number;
  survey_type: string;
  employment_status: string;
  company_name?: string;
  job_title?: string;
  status: 'completed' | 'pending' | 'expired';
  created_at: string;
  due_date?: string;
}

export default function SurveyHistory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [pendingSurveys, setPendingSurveys] = useState<any[]>([]);
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    total: 0,
    completion_rate: 0
  });

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const fetchSurveyData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/survey-history', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSurveys(response.data.completed || []);
      setPendingSurveys(response.data.pending || []);
      setStats(response.data.stats || {
        completed: 0,
        pending: 0,
        total: 0,
        completion_rate: 0
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching survey history:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-orange-100 text-orange-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      case 'expired':
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            Expired
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/graduate/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Survey History</h1>
                <p className="text-sm text-muted-foreground">Track your survey completion progress</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Surveys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{stats.completion_rate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Surveys */}
        {pendingSurveys.length > 0 && (
          <Card className="mb-6 border-orange-200 bg-accent">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-orange-600" />
                Pending Surveys
              </CardTitle>
              <CardDescription>
                Please complete these surveys as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingSurveys.map((survey, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-card border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{survey.title}</h3>
                    <p className="text-sm text-muted-foreground">{survey.description}</p>
                    {survey.due_date && (
                      <p className="text-xs text-orange-600 mt-1">
                        <Calendar className="inline mr-1 h-3 w-3" />
                        Due: {new Date(survey.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <Button onClick={() => navigate(`/graduate/take-survey/${survey.id}`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Start Survey
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Completed Surveys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                Completed Surveys
              </span>
              <Button onClick={() => navigate('/graduate/survey')}>
                <Plus className="mr-2 h-4 w-4" />
                New Survey
              </Button>
            </CardTitle>
            <CardDescription>
              Your survey submission history
            </CardDescription>
          </CardHeader>
          <CardContent>
            {surveys.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No surveys completed yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start by completing your first employment survey
                </p>
                <Button onClick={() => navigate('/graduate/survey')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Complete First Survey
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {surveys.map((survey) => (
                  <div
                    key={survey.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {survey.survey_type || 'Employment Survey'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted on {new Date(survey.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      {getStatusBadge(survey.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Employment Status:</span>
                        <p className="font-medium">{survey.employment_status}</p>
                      </div>
                      {survey.company_name && (
                        <div>
                          <span className="text-muted-foreground">Company:</span>
                          <p className="font-medium">{survey.company_name}</p>
                        </div>
                      )}
                      {survey.job_title && (
                        <div>
                          <span className="text-muted-foreground">Position:</span>
                          <p className="font-medium">{survey.job_title}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
