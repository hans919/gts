import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

interface Question {
  text: string;
  type: string;
  options?: string[];
  required: boolean;
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  end_date: string;
}

export default function TakeSurvey() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSurvey();
  }, [id]);

  const fetchSurvey = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://lightsteelblue-locust-816886.hostingersite.com/api/surveys/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSurvey(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching survey:', error);
      setError(error.response?.data?.message || 'Failed to load survey');
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, value: any) => {
    setAnswers({
      ...answers,
      [questionIndex]: value,
    });
  };

  const handleCheckboxChange = (questionIndex: number, option: string, checked: boolean) => {
    const currentAnswers = answers[questionIndex] || [];
    if (checked) {
      setAnswers({
        ...answers,
        [questionIndex]: [...currentAnswers, option],
      });
    } else {
      setAnswers({
        ...answers,
        [questionIndex]: currentAnswers.filter((a: string) => a !== option),
      });
    }
  };

  const validateForm = () => {
    if (!survey) return false;

    for (let i = 0; i < survey.questions.length; i++) {
      const question = survey.questions[i];
      if (question.required && !answers[i]) {
        alert(`Please answer question ${i + 1}: ${question.text}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // Format answers for backend
      const formattedAnswers = survey?.questions.map((question, index) => ({
        question: question.text,
        answer: answers[index] || '',
      }));

      await axios.post(
        'https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/submit-survey-response',
        {
          survey_id: id,
          answers: formattedAnswers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Survey submitted successfully!');
      navigate('/graduate/survey-history');
    } catch (error: any) {
      console.error('Error submitting survey:', error);
      setError(error.response?.data?.message || 'Failed to submit survey');
      setSubmitting(false);
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    switch (question.type) {
      case 'text':
        return (
          <Input
            value={answers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            placeholder="Your answer"
            required={question.required}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={answers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            placeholder="Your answer"
            rows={4}
            required={question.required}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {question.options?.map((option, optIndex) => (
              <label key={optIndex} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  required={question.required}
                  className="h-4 w-4"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {question.options?.map((option, optIndex) => (
              <label key={optIndex} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(answers[index] || []).includes(option)}
                  onChange={(e) => handleCheckboxChange(index, option, e.target.checked)}
                  className="h-4 w-4"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'select':
        return (
          <select
            value={answers[index] || ''}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
            required={question.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Select an option</option>
            {question.options?.map((option, optIndex) => (
              <option key={optIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
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

  if (error && !survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/graduate/survey-history')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Survey Not Found</h1>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">{error}</p>
              <Button className="mt-4" onClick={() => navigate('/graduate/survey-history')}>
                Back to Survey History
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!survey) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/graduate/survey-history')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{survey.title}</h1>
              {survey.end_date && (
                <p className="text-sm text-muted-foreground">
                  Due: {new Date(survey.end_date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Survey Description */}
          {survey.description && (
            <Card>
              <CardHeader>
                <CardTitle>About this Survey</CardTitle>
                <CardDescription>{survey.description}</CardDescription>
              </CardHeader>
            </Card>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Questions */}
          {survey.questions.map((question, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg flex items-start">
                  <span className="mr-2">{index + 1}.</span>
                  <span className="flex-1">
                    {question.text}
                    {question.required && <span className="text-destructive ml-1">*</span>}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>{renderQuestion(question, index)}</CardContent>
            </Card>
          ))}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Survey
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
