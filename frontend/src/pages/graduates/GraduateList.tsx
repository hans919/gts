import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Search, Pencil, Trash, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
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
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

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
  latest_employment_survey?: {
    employment_status: string;
    company_name: string;
    job_title: string;
    created_at: string;
  };
}

export default function GraduateList() {
  const { toast } = useToast();
  const [graduates, setGraduates] = useState<Graduate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
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

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lightsteelblue-locust-816886.hostingersite.com/api/graduates/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Success!",
        description: "Graduate deleted successfully!",
        variant: "success",
      });
      fetchGraduates();
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting graduate:', error);
      toast({
        title: "Error",
        description: "Failed to delete graduate",
        variant: "destructive",
      });
      setDeleteId(null);
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
                <option value="Employed">Employed</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Further Education">Further Education</option>
                <option value="Freelancing">Freelancing</option>
                <option value="employed">Employed (Old)</option>
                <option value="self-employed">Self-Employed (Old)</option>
                <option value="pursuing_higher_education">Pursuing Higher Education (Old)</option>
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
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline">
                          {graduate.latest_employment_survey?.employment_status ||
                           graduate.current_employment?.employment_status 
                            ? (graduate.latest_employment_survey?.employment_status || graduate.current_employment?.employment_status || '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
                            : graduate.current_status || 'No Status'}
                        </Badge>
                        {graduate.latest_employment_survey && (
                          <span className="text-xs text-muted-foreground">
                            {graduate.latest_employment_survey.company_name || 'Survey submitted'}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/graduates/${graduate.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteId(graduate.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Graduate</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this graduate? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
