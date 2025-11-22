import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Briefcase, GraduationCap, Users, BookOpen, Calendar, MapPin, ExternalLink, Search, Bookmark, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/services/api';

interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary_range: string;
  posted_date: string;
  description: string;
  external_link: string;
  bookmarked: boolean;
}

interface CareerService {
  id: number;
  name: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  category: string;
}

interface TrainingProgram {
  id: number;
  title: string;
  provider: string;
  description: string;
  duration: string;
  schedule: string;
  registration_link: string;
  category: string;
}

export default function AlumniResources() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'services' | 'training'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [services, setServices] = useState<CareerService[]>([]);
  const [training, setTraining] = useState<TrainingProgram[]>([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const [jobsRes, servicesRes, trainingRes] = await Promise.all([
        api.get('/graduate/jobs'),
        api.get('/graduate/career-services'),
        api.get('/graduate/training-programs'),
      ]);

      setJobs(jobsRes.data);
      setServices(servicesRes.data);
      setTraining(trainingRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setLoading(false);
    }
  };

  const toggleBookmark = async (jobId: number) => {
    try {
      await api.post(`/graduate/jobs/${jobId}/bookmark`);

      setJobs(jobs.map(job => 
        job.id === jobId ? { ...job, bookmarked: !job.bookmarked } : job
      ));
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory === 'all' || job.type === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTraining = training.filter(program =>
    program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/graduate/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold truncate">Alumni Resources</h1>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">Career opportunities, services, and training</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <Button
            variant={activeTab === 'jobs' ? 'default' : 'outline'}
            onClick={() => setActiveTab('jobs')}
            className="flex-1 justify-start sm:justify-center"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Job Board ({jobs.length})
          </Button>
          <Button
            variant={activeTab === 'services' ? 'default' : 'outline'}
            onClick={() => setActiveTab('services')}
            className="flex-1 justify-start sm:justify-center"
          >
            <Users className="mr-2 h-4 w-4" />
            Career Services ({services.length})
          </Button>
          <Button
            variant={activeTab === 'training' ? 'default' : 'outline'}
            onClick={() => setActiveTab('training')}
            className="flex-1 justify-start sm:justify-center"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Training ({training.length})
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {activeTab === 'jobs' && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border rounded-md bg-background"
            >
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          )}
        </div>

        {/* Job Board Tab */}
        {activeTab === 'jobs' && (
          <div className="grid gap-4">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No job postings found</p>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleBookmark(job.id)}
                      >
                        <Bookmark className={`h-5 w-5 ${job.bookmarked ? 'fill-current text-yellow-500' : ''}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                          {job.type}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          {job.salary_range}
                        </span>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                          Posted {new Date(job.posted_date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      <Button variant="outline" className="w-full" asChild>
                        <a href={job.external_link} target="_blank" rel="noopener noreferrer">
                          View Details <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Career Services Tab */}
        {activeTab === 'services' && (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredServices.length === 0 ? (
              <Card className="md:col-span-2">
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No career services found</p>
                </CardContent>
              </Card>
            ) : (
              filteredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                        {service.category}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="space-y-1 text-sm">
                      <p>📧 {service.contact_email}</p>
                      <p>📞 {service.contact_phone}</p>
                    </div>
                    {service.website && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={service.website} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Training Programs Tab */}
        {activeTab === 'training' && (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTraining.length === 0 ? (
              <Card className="md:col-span-2">
                <CardContent className="p-8 text-center">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No training programs found</p>
                </CardContent>
              </Card>
            ) : (
              filteredTraining.map((program) => (
                <Card key={program.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{program.title}</CardTitle>
                    <CardDescription>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {program.provider}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                      {program.category}
                    </span>
                    <p className="text-sm text-muted-foreground">{program.description}</p>
                    <div className="space-y-1 text-sm">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Duration: {program.duration}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Schedule: {program.schedule}</span>
                      </p>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={program.registration_link} target="_blank" rel="noopener noreferrer">
                        Register Now <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
