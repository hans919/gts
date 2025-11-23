import { useState, useEffect } from 'react';
import { Loader2, Plus, Edit, Trash2, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import axios from 'axios';

interface CareerService {
  id: number;
  name: string;
  description: string;
  contact_email: string;
  contact_phone: string;
  website: string;
  category: string;
}

export default function CareerServicesManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<CareerService[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<CareerService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    contact_email: '',
    contact_phone: '',
    website: '',
    category: 'Counseling',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/admin/career-services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (editingService) {
        await axios.put(
          `https://lightsteelblue-locust-816886.hostingersite.com/api/admin/career-services/${editingService.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({
          title: "Success!",
          description: "Service updated successfully!",
          variant: "success",
        });
      } else {
        await axios.post(
          'https://lightsteelblue-locust-816886.hostingersite.com/api/admin/career-services',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast({
          title: "Success!",
          description: "Service created successfully!",
          variant: "success",
        });
      }
      
      resetForm();
      fetchServices();
    } catch (error: any) {
      console.error('Error saving service:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to save service',
        variant: "destructive",
      });
    }
  };

  const handleEdit = (service: CareerService) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      contact_email: service.contact_email,
      contact_phone: service.contact_phone,
      website: service.website,
      category: service.category,
    });
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lightsteelblue-locust-816886.hostingersite.com/api/admin/career-services/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Success!",
        description: "Service deleted successfully!",
        variant: "success",
      });
      fetchServices();
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
      setDeleteId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      contact_email: '',
      contact_phone: '',
      website: '',
      category: 'Counseling',
    });
    setEditingService(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Career Services Management</h1>
          <p className="text-muted-foreground">Manage career support services for graduates</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Service
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingService ? 'Edit Service' : 'Add New Service'}</CardTitle>
            <CardDescription>Fill in the service details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Service Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="Counseling">Counseling</option>
                  <option value="Career Development">Career Development</option>
                  <option value="Job Placement">Job Placement</option>
                  <option value="Networking">Networking</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Contact Email *</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingService ? 'Update Service' : 'Create Service'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {service.name}
                  </CardTitle>
                  <CardDescription>
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                      {service.category}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" onClick={() => setDeleteId(service.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Career Service</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this career service? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <div className="space-y-1 text-sm">
                  <p>📧 {service.contact_email}</p>
                  {service.contact_phone && <p>📞 {service.contact_phone}</p>}
                  {service.website && (
                    <a
                      href={service.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline block"
                    >
                      🌐 Visit Website →
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
