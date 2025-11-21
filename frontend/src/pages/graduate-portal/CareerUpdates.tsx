import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, GraduationCap, Plus, Briefcase, TrendingUp, Calendar, Building, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

interface CareerUpdate {
  id: number;
  update_type: string;
  company_name: string;
  job_title: string;
  description: string;
  effective_date: string;
  created_at: string;
}

export default function CareerUpdates() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [updates, setUpdates] = useState<CareerUpdate[]>([]);

  const [formData, setFormData] = useState({
    update_type: '',
    company_name: '',
    job_title: '',
    description: '',
    effective_date: '',
  });

  useEffect(() => {
    fetchCareerUpdates();
  }, []);

  const fetchCareerUpdates = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('http://127.0.0.1:8000/api/graduate/career-updates', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUpdates(response.data);
      setFetching(false);
    } catch (error) {
      console.error('Error fetching career updates:', error);
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
      const response = await axios.post(
        'http://127.0.0.1:8000/api/graduate/career-updates',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUpdates([response.data, ...updates]);
      setFormData({
        update_type: '',
        company_name: '',
        job_title: '',
        description: '',
        effective_date: '',
      });
      setShowForm(false);
      alert('Career update added successfully!');
    } catch (err: any) {
      console.error('Error adding career update:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to add career update');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/graduate/dashboard');
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'New Job':
        return <Briefcase className="h-4 w-4" />;
      case 'Promotion':
        return <TrendingUp className="h-4 w-4" />;
      case 'Job Change':
        return <Building className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getUpdateColor = (type: string) => {
    switch (type) {
      case 'New Job':
        return 'bg-blue-100 text-blue-800';
      case 'Promotion':
        return 'bg-green-100 text-green-800';
      case 'Job Change':
        return 'bg-purple-100 text-purple-800';
      case 'Career Milestone':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Career Status Updates</h1>
                  <p className="text-sm text-muted-foreground">Track your professional journey</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Update
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Update Form */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add Career Update</CardTitle>
              <CardDescription>
                Share news about job changes, promotions, or career milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="update_type">Update Type *</Label>
                  <select
                    id="update_type"
                    name="update_type"
                    value={formData.update_type}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select type...</option>
                    <option value="New Job">New Job</option>
                    <option value="Promotion">Promotion</option>
                    <option value="Job Change">Job Change (Different Company)</option>
                    <option value="Career Milestone">Career Milestone</option>
                    <option value="Certification">New Certification</option>
                    <option value="Award">Award or Recognition</option>
                  </select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company/Organization *</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job_title">Job Title/Position *</Label>
                    <Input
                      id="job_title"
                      name="job_title"
                      value={formData.job_title}
                      onChange={handleChange}
                      placeholder="Senior Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="effective_date">Effective Date *</Label>
                  <Input
                    id="effective_date"
                    name="effective_date"
                    type="date"
                    value={formData.effective_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your new role, responsibilities, or achievement..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Update
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Updates Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Your Career Timeline</CardTitle>
            <CardDescription>
              {updates.length === 0 
                ? "No updates yet. Add your first career milestone!" 
                : `${updates.length} career ${updates.length === 1 ? 'update' : 'updates'}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {updates.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No career updates yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start tracking your professional journey by adding your first update
                </p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Update
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {updates.map((update) => (
                  <div
                    key={update.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getUpdateColor(update.update_type)}>
                          <span className="mr-1">{getUpdateIcon(update.update_type)}</span>
                          {update.update_type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(update.effective_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Added {new Date(update.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold text-lg">{update.job_title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Building className="mr-1 h-3 w-3" />
                          {update.company_name}
                        </p>
                      </div>

                      <p className="text-sm leading-relaxed">{update.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-sm">💡 Keep Your Profile Updated</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-1 list-disc list-inside">
              <li>Add updates whenever you change jobs or get promoted</li>
              <li>Share certifications and professional achievements</li>
              <li>Keep your profile current for better alumni networking</li>
              <li>Your updates help the university improve career services</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
