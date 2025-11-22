import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Search, Pencil, Trash, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';

interface Graduate {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  program: string;
  graduation_year: number;
  current_status: string;
  current_employment?: {
    employment_status: string;
    job_title: string;
    company_name: string;
  };
}

export default function GraduateList() {
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [yearFilter, setYearFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [employmentStatusFilter, setEmploymentStatusFilter] = useState('');

  useEffect(() => {
    fetchGraduates();
  }, [currentPage, searchTerm, yearFilter, departmentFilter, programFilter, employmentStatusFilter]);

  const fetchGraduates = async () => {
    try {
      const token = localStorage.getItem('token');
      const params: any = { 
        page: currentPage, 
        search: searchTerm 
      };
      
      if (yearFilter) params.graduation_year = yearFilter;
      if (departmentFilter) params.program = departmentFilter;
      if (programFilter) params.major = programFilter;
      if (employmentStatusFilter) params.employment_status = employmentStatusFilter;
      
      const response = await axios.get(`https://lightsteelblue-locust-816886.hostingersite.com/api/graduates`, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setGraduates(response.data.data);
      setTotalPages(response.data.last_page);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching graduates:', error);
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setYearFilter('');
    setDepartmentFilter('');
    setProgramFilter('');
    setEmploymentStatusFilter('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const hasActiveFilters = yearFilter || departmentFilter || programFilter || employmentStatusFilter || searchTerm;

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this graduate?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lightsteelblue-locust-816886.hostingersite.com/api/graduates/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGraduates();
    } catch (error) {
      console.error('Error deleting graduate:', error);
      alert('Failed to delete graduate');
    }
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
          <h2 className="text-3xl font-bold tracking-tight">Graduates</h2>
          <p className="text-muted-foreground">
            Manage your graduate database and track their progress.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link to="/graduates/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Graduate
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 py-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search graduates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
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
              Clear
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Graduation Year</label>
              <Select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">All Years</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Engineering">Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Education">Education</option>
                <option value="Nursing">Nursing</option>
                <option value="Arts and Sciences">Arts and Sciences</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Program</label>
              <Input
                placeholder="Filter by program/major..."
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Employment Status</label>
              <Select
                value={employmentStatusFilter}
                onChange={(e) => setEmploymentStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="pursuing_higher_education">Pursuing Higher Education</option>
                <option value="other">Other</option>
              </Select>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Student ID
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Name
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Email
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Program
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Year
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {graduates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-sm text-muted-foreground">No graduates found.</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link to="/graduates/new">Add your first graduate</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                graduates.map((graduate) => (
                  <tr
                    key={graduate.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle font-medium">
                      {graduate.student_id}
                    </td>
                    <td className="p-4 align-middle">
                      {graduate.first_name} {graduate.last_name}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="text-sm">{graduate.email}</span>
                        <span className="text-sm text-muted-foreground">{graduate.phone}</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{graduate.program}</td>
                    <td className="p-4 align-middle">{graduate.graduation_year}</td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline">
                        {graduate.current_employment?.employment_status 
                          ? graduate.current_employment.employment_status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                          : graduate.current_status || 'No Status'}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/graduates/${graduate.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(graduate.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
