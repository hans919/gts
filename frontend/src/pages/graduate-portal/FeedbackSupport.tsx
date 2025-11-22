import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, MessageSquare, Send, CheckCircle, Clock, AlertCircle, ArrowLeft, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

interface SupportTicket {
  id: number;
  subject: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  created_at: string;
  admin_response?: string;
  responded_at?: string;
}

export default function FeedbackSupport() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  // const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  const [formData, setFormData] = useState({
    subject: '',
    category: 'technical',
    priority: 'medium',
    description: '',
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/support-tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTickets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('priority', formData.priority);
      formDataToSend.append('description', formData.description);
      
      attachments.forEach((file, index) => {
        formDataToSend.append(`attachments[${index}]`, file);
      });

      await axios.post(
        'https://lightsteelblue-locust-816886.hostingersite.com/api/graduate/support-tickets',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Support ticket submitted successfully!');
      setShowForm(false);
      setFormData({
        subject: '',
        category: 'technical',
        priority: 'medium',
        description: '',
      });
      setAttachments([]);
      fetchTickets();
    } catch (error: any) {
      console.error('Error submitting ticket:', error);
      alert(error.response?.data?.message || 'Failed to submit ticket');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/graduate/dashboard')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Feedback & Support</h1>
                  <p className="text-sm text-muted-foreground">Get help and submit feedback</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setShowForm(!showForm)}>
              <Send className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* New Ticket Form */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>
                Describe your issue or feedback and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Problem</option>
                      <option value="survey">Survey Question</option>
                      <option value="feedback">General Feedback</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority *</Label>
                    <select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide detailed information about your issue or feedback..."
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="attachments">Attachments (optional)</Label>
                  <div className="mt-2">
                    <label className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <Paperclip className="h-5 w-5 mr-2" />
                      <span className="text-sm">Attach files (screenshots, documents)</span>
                      <input
                        id="attachments"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                      />
                    </label>
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm truncate">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={submitting} className="flex-1">
                    {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Submit Ticket
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tickets List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Support Tickets ({tickets.length})</h2>
          
          {tickets.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">No support tickets yet</p>
                <Button onClick={() => setShowForm(true)}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Your First Ticket
                </Button>
              </CardContent>
            </Card>
          ) : (
            tickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{ticket.subject}</CardTitle>
                      <CardDescription className="mt-2">
                        Ticket #{ticket.id} • Created {new Date(ticket.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                        {ticket.category.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{ticket.description}</p>
                    
                    {ticket.admin_response && (
                      <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                        <p className="text-xs font-semibold text-blue-900 mb-1">Admin Response:</p>
                        <p className="text-sm text-blue-800">{ticket.admin_response}</p>
                        {ticket.responded_at && (
                          <p className="text-xs text-blue-600 mt-2">
                            {new Date(ticket.responded_at).toLocaleDateString()} at {new Date(ticket.responded_at).toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Quick Contact Info */}
        <Card className="mt-6 bg-accent border-accent">
          <CardHeader>
            <CardTitle>Need Immediate Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>📧 Email: support@graduatetracker.edu</p>
            <p>📞 Phone: (123) 456-7890</p>
            <p>⏰ Office Hours: Monday - Friday, 9:00 AM - 5:00 PM</p>
            <p className="text-muted-foreground mt-4">
              For urgent issues, please call during office hours. For non-urgent matters, submit a ticket above.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
