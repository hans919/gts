import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Search, Calendar, Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface Survey {
  id: number;
  title: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export default function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSurveys();
  }, [searchTerm]);

  const fetchSurveys = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/surveys`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchTerm },
      });
      setSurveys(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching surveys:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this survey?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/surveys/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSurveys();
    } catch (error) {
      console.error('Error deleting survey:', error);
      alert('Failed to delete survey');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      active: 'default',
      draft: 'secondary',
      closed: 'outline',
    };
    return variants[status] || 'outline';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[450px]">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Surveys</h2>
          <p className="text-muted-foreground">
            Create and manage graduate tracer surveys
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link to="/surveys/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Survey
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center py-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search surveys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {surveys.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Plus className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No surveys</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              You have not created any surveys yet. Get started by creating one.
            </p>
            <Button asChild>
              <Link to="/surveys/new">Create Survey</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {surveys.map((survey) => (
            <Card key={survey.id} className="flex flex-col">
              <CardHeader className="grid gap-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="line-clamp-1">{survey.title}</CardTitle>
                    <Badge variant={getStatusBadge(survey.status)} className="w-fit">
                      {survey.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 min-h-[40px]">
                  {survey.description || 'No description provided'}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">
                    {new Date(survey.start_date).toLocaleDateString()} - {new Date(survey.end_date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 mt-auto">
                <Button variant="default" size="sm" className="flex-1" asChild>
                  <Link to={`/surveys/${survey.id}/responses`}>
                    View Responses
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/surveys/${survey.id}/edit`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(survey.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
