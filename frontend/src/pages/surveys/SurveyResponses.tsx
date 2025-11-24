import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Users, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/services/api';

interface Response {
  id: number;
  graduate_id: number;
  graduate_name: string;
  graduate_email: string;
  responses: Array<{ question: string; answer: any }>;
  submitted_at: string;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Array<{ text: string; type: string; required: boolean }>;
}

export default function SurveyResponses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      // Fetch survey details
      const surveyRes = await api.get(`/surveys/${id}`);
      setSurvey(surveyRes.data);

      // Fetch responses
      const responsesRes = await api.get(`/surveys/${id}/responses`);
      setResponses(responsesRes.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const formatAnswer = (answer: any) => {
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    return answer || 'No answer';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[450px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <p>Survey not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin/surveys')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{survey.title}</h2>
            <p className="text-muted-foreground">Survey responses</p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Responses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div className="text-3xl font-bold">{responses.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div className="text-3xl font-bold">{survey.questions.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {responses.length > 0 ? '100%' : '0%'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Responses */}
      <div className="space-y-4">
        {responses.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No responses yet</h3>
              <p className="text-sm text-muted-foreground">
                Responses will appear here once graduates start submitting this survey
              </p>
            </CardContent>
          </Card>
        ) : (
          responses.map((response, index) => (
            <Card key={response.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Response #{index + 1}</CardTitle>
                    <CardDescription>
                      <span className="font-semibold">{response.graduate_name}</span> ({response.graduate_email})
                      <br />
                      Submitted: {new Date(response.submitted_at).toLocaleString()}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {response.responses.map((item, qIndex) => (
                    <div key={qIndex} className="border-l-4 border-primary/20 pl-4">
                      <p className="font-semibold text-sm mb-1">
                        Q{qIndex + 1}: {item.question}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatAnswer(item.answer)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
