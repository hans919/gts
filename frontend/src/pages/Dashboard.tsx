import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ClipboardList, 
  Activity,
  Loader2,
  Briefcase,
  Filter,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

interface DashboardData {
  total_graduates: number;
  total_surveys: number;
  active_surveys: number;
  total_responses: number;
  employed_count: number;
  employment_stats: Array<{ employment_status: string; count: number }>;
  recent_graduates: Array<{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    program: string;
    graduation_year: string;
    created_at: string;
  }>;
}

interface GraduatesByYear {
  graduation_year: string;
  count: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    total_graduates: 0,
    total_surveys: 0,
    active_surveys: 0,
    total_responses: 0,
    employed_count: 0,
    employment_stats: [],
    recent_graduates: [],
  });
  const [graduatesByYear, setGraduatesByYear] = useState<GraduatesByYear[]>([]);
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [yearFilter, setYearFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [employmentStatusFilter, setEmploymentStatusFilter] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchDashboardData();
    fetchGraduatesByYear();
  }, [yearFilter, departmentFilter, programFilter, employmentStatusFilter]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const params: any = {};
      
      if (yearFilter) params.graduation_year = yearFilter;
      if (departmentFilter) params.program = departmentFilter;
      if (programFilter) params.major = programFilter;
      if (employmentStatusFilter) params.employment_status = employmentStatusFilter;
      
      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/analytics/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const fetchGraduatesByYear = async () => {
    try {
      const token = localStorage.getItem('token');
      const params: any = {};
      
      if (yearFilter) params.graduation_year = yearFilter;
      if (departmentFilter) params.program = departmentFilter;
      if (programFilter) params.major = programFilter;
      if (employmentStatusFilter) params.employment_status = employmentStatusFilter;
      
      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/analytics/graduates-by-year', {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setGraduatesByYear(response.data);
    } catch (error) {
      console.error('Error fetching graduates by year:', error);
    }
  };

  const calculateEmploymentRate = () => {
    if (data.total_graduates === 0) return 0;
    // Use employed_count from backend (more reliable)
    const employed = data.employed_count || 0;
    return Math.round((employed / data.total_graduates) * 100);
  };

  const clearFilters = () => {
    setYearFilter('');
    setDepartmentFilter('');
    setProgramFilter('');
    setEmploymentStatusFilter('');
  };

  const hasActiveFilters = yearFilter || departmentFilter || programFilter || employmentStatusFilter;

  if (!user) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[450px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link to="/admin/graduates/new">Add Graduate</Link>
          </Button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Graduation Year</label>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">All Years</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">All Departments</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Education">Education</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Arts and Sciences">Arts and Sciences</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Program/Major</label>
                  <Input
                    placeholder="Filter by program/major..."
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Employment Status</label>
                  <select
                    value={employmentStatusFilter}
                    onChange={(e) => setEmploymentStatusFilter(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">All Status</option>
                    <option value="Employed">Employed</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Further Education">Further Education</option>
                    <option value="Freelancing">Freelancing</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Graduates
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_graduates}</div>
            <p className="text-xs text-muted-foreground">
              Registered in the system
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Surveys
            </CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.active_surveys}</div>
            <p className="text-xs text-muted-foreground">
              {data.total_surveys} total surveys
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Employment Rate
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateEmploymentRate()}%</div>
            <p className="text-xs text-muted-foreground">
              Based on employment data
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Survey Responses
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.total_responses}</div>
            <p className="text-xs text-muted-foreground">
              Total completed responses
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Graduates by Year</CardTitle>
            <CardDescription>Number of graduates per graduation year</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            {graduatesByYear.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={graduatesByYear}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="graduation_year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3b82f6" name="Graduates" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-sm text-muted-foreground">
                No graduation data available
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Graduates</CardTitle>
            <CardDescription>
              You have {data.total_graduates} total graduates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.recent_graduates.length === 0 ? (
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">No graduates yet</p>
                    <p className="text-sm text-muted-foreground">
                      Add your first graduate to get started
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/admin/graduates/new">Add</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {data.recent_graduates.map((graduate) => (
                  <div key={graduate.id} className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {graduate.first_name[0]}{graduate.last_name[0]}
                      </span>
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {graduate.first_name} {graduate.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {graduate.program} • {graduate.graduation_year}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/graduates/${graduate.id}/edit`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
                {data.total_graduates > 5 && (
                  <div className="pt-2 border-t">
                    <Button variant="link" className="w-full" asChild>
                      <Link to="/admin/graduates">View all graduates</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Employment Status Chart */}
      {data.employment_stats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Employment Status Distribution</CardTitle>
            <CardDescription>Current employment status of graduates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.employment_stats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ employment_status, percent }) => 
                    `${employment_status}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="employment_status"
                >
                  {data.employment_stats.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
