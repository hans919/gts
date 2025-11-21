import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, GraduationCap, Briefcase, DollarSign, ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

export default function EmploymentSurvey() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [surveyHistory, setSurveyHistory] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    employment_status: '',
    company_name: '',
    job_title: '',
    industry: '',
    job_type: '',
    start_date: '',
    monthly_salary: '',
    salary_currency: 'PHP',
    job_location_city: '',
    job_location_country: '',
    is_related_to_course: '',
    job_finding_duration_months: '',
    job_finding_method: '',
    skills_acquired_in_college: '',
    additional_trainings: '',
    job_satisfaction: '',
    career_goals: '',
    further_education_plans: '',
    comments: '',
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

      const response = await axios.get('http://127.0.0.1:8000/api/graduate/surveys', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSurveyHistory(response.data.surveys || []);
      setFetching(false);
    } catch (error) {
      console.error('Error fetching survey data:', error);
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:8000/api/graduate/surveys',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Survey submitted successfully! Thank you for your response.');
      navigate('/graduate/dashboard');
    } catch (err: any) {
      console.error('Error submitting survey:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to submit survey');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/graduate/dashboard');
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={handleBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Employment Tracer Survey</h1>
                <p className="text-sm text-muted-foreground">Help us track your career progress</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Survey History */}
        {surveyHistory.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Survey History</CardTitle>
              <CardDescription>Your previous survey responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {surveyHistory.map((survey, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{survey.survey_type || 'Employment Survey'}</p>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {new Date(survey.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={survey.employment_status === 'Employed' ? 'default' : 'secondary'}>
                      {survey.employment_status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Survey Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Employment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Employment Status
              </CardTitle>
              <CardDescription>Tell us about your current employment situation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="employment_status">Current Employment Status *</Label>
                <select
                  id="employment_status"
                  name="employment_status"
                  value={formData.employment_status}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select status...</option>
                  <option value="Employed">Employed</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Unemployed - Looking for work">Unemployed - Looking for work</option>
                  <option value="Unemployed - Not looking for work">Unemployed - Not looking for work</option>
                  <option value="Further Education">Pursuing Further Education</option>
                  <option value="Freelancing">Freelancing</option>
                </select>
              </div>

              {(formData.employment_status === 'Employed' || formData.employment_status === 'Self-employed') && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company/Organization Name *</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="job_title">Job Title/Position *</Label>
                      <Input
                        id="job_title"
                        name="job_title"
                        value={formData.job_title}
                        onChange={handleChange}
                        placeholder="Software Engineer"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry *</Label>
                      <Input
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="Information Technology"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="job_type">Job Type *</Label>
                      <select
                        id="job_type"
                        name="job_type"
                        value={formData.job_type}
                        onChange={handleChange}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select type...</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="start_date">Start Date *</Label>
                      <Input
                        id="start_date"
                        name="start_date"
                        type="date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="monthly_salary">Monthly Salary (Optional)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="monthly_salary"
                          name="monthly_salary"
                          type="number"
                          value={formData.monthly_salary}
                          onChange={handleChange}
                          placeholder="25000"
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="salary_currency">Currency</Label>
                      <select
                        id="salary_currency"
                        name="salary_currency"
                        value={formData.salary_currency}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="PHP">PHP</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="job_location_city">Job Location (City) *</Label>
                      <Input
                        id="job_location_city"
                        name="job_location_city"
                        value={formData.job_location_city}
                        onChange={handleChange}
                        placeholder="Manila"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="job_location_country">Country *</Label>
                      <Input
                        id="job_location_country"
                        name="job_location_country"
                        value={formData.job_location_country}
                        onChange={handleChange}
                        placeholder="Philippines"
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Job Relevance & Finding */}
          {(formData.employment_status === 'Employed' || formData.employment_status === 'Self-employed') && (
            <Card>
              <CardHeader>
                <CardTitle>Job Relevance & Search Experience</CardTitle>
                <CardDescription>How your education relates to your current work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="is_related_to_course">Is your job related to your college course? *</Label>
                  <select
                    id="is_related_to_course"
                    name="is_related_to_course"
                    value={formData.is_related_to_course}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select...</option>
                    <option value="Yes, directly related">Yes, directly related</option>
                    <option value="Yes, somewhat related">Yes, somewhat related</option>
                    <option value="No, not related">No, not related</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_finding_duration_months">How long did it take to find this job after graduation? *</Label>
                  <select
                    id="job_finding_duration_months"
                    name="job_finding_duration_months"
                    value={formData.job_finding_duration_months}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select duration...</option>
                    <option value="0">Less than a month</option>
                    <option value="1-3">1-3 months</option>
                    <option value="4-6">4-6 months</option>
                    <option value="7-12">7-12 months</option>
                    <option value="12+">More than 12 months</option>
                    <option value="before_graduation">Before graduation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="job_finding_method">How did you find this job? *</Label>
                  <select
                    id="job_finding_method"
                    name="job_finding_method"
                    value={formData.job_finding_method}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select method...</option>
                    <option value="Online job boards">Online job boards (JobStreet, LinkedIn, etc.)</option>
                    <option value="Company website">Company website</option>
                    <option value="Referral">Referral from friend/family</option>
                    <option value="Career fair">Career fair</option>
                    <option value="College placement">College placement office</option>
                    <option value="Social media">Social media</option>
                    <option value="Walk-in application">Walk-in application</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Skills & Development */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Professional Development</CardTitle>
              <CardDescription>Your learning and career development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills_acquired_in_college">What skills from college do you use in your current work/situation?</Label>
                <Textarea
                  id="skills_acquired_in_college"
                  name="skills_acquired_in_college"
                  value={formData.skills_acquired_in_college}
                  onChange={handleChange}
                  placeholder="e.g., Programming, Critical thinking, Communication..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional_trainings">Have you taken any additional training or certifications?</Label>
                <Textarea
                  id="additional_trainings"
                  name="additional_trainings"
                  value={formData.additional_trainings}
                  onChange={handleChange}
                  placeholder="e.g., AWS Certification, Project Management Course..."
                  rows={3}
                />
              </div>

              {(formData.employment_status === 'Employed' || formData.employment_status === 'Self-employed') && (
                <div className="space-y-2">
                  <Label htmlFor="job_satisfaction">How satisfied are you with your current job?</Label>
                  <select
                    id="job_satisfaction"
                    name="job_satisfaction"
                    value={formData.job_satisfaction}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select...</option>
                    <option value="Very satisfied">Very satisfied</option>
                    <option value="Satisfied">Satisfied</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Dissatisfied">Dissatisfied</option>
                    <option value="Very dissatisfied">Very dissatisfied</option>
                  </select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Future Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Career Goals & Future Plans</CardTitle>
              <CardDescription>Your aspirations and next steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="career_goals">What are your short-term career goals?</Label>
                <Textarea
                  id="career_goals"
                  name="career_goals"
                  value={formData.career_goals}
                  onChange={handleChange}
                  placeholder="Share your career aspirations for the next 1-3 years..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="further_education_plans">Do you plan to pursue further education?</Label>
                <select
                  id="further_education_plans"
                  name="further_education_plans"
                  value={formData.further_education_plans}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select...</option>
                  <option value="Yes, immediately">Yes, within the next year</option>
                  <option value="Yes, in a few years">Yes, in a few years</option>
                  <option value="Maybe">Maybe, still considering</option>
                  <option value="No">No plans currently</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments or Feedback</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Any additional information you'd like to share..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" disabled={loading} className="flex-1">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Submit Survey
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleBack}>
              Cancel
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
