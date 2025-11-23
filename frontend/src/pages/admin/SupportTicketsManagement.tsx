import { useState, useEffect } from 'react';
import { Loader2, MessageSquare, Clock, CheckCircle, AlertCircle, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface SupportTicket {
  id: number;
  graduate_id: number;
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  description: string;
  admin_response: string | null;
  responded_at: string | null;
  created_at: string;
}

export default function SupportTicketsManagement() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('open');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://lightsteelblue-locust-816886.hostingersite.com/api/admin/support-tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const handleRespond = async (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setResponse(ticket.admin_response || '');
    setStatus(ticket.status);
  };

  const handleSubmitResponse = async () => {
    if (!selectedTicket) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://lightsteelblue-locust-816886.hostingersite.com/api/admin/support-tickets/${selectedTicket.id}`,
        {
          status,
          admin_response: response,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Success!",
        description: "Response submitted successfully!",
        variant: "success",
      });
      setSelectedTicket(null);
      setResponse('');
      fetchTickets();
    } catch (error: any) {
      console.error('Error submitting response:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || 'Failed to submit response',
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://lightsteelblue-locust-816886.hostingersite.com/api/admin/support-tickets/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Success!",
        description: "Ticket deleted successfully!",
        variant: "success",
      });
      fetchTickets();
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast({
        title: "Error",
        description: "Failed to delete ticket",
        variant: "destructive",
      });
      setDeleteId(null);
    }
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

  const getCategoryLabel = (category: string) => {
    return category.replace('_', ' ').split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
          <h1 className="text-3xl font-bold">Support Tickets Management</h1>
          <p className="text-muted-foreground">Manage graduate support requests</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-sm">
            Open: {tickets.filter(t => t.status === 'open').length}
          </div>
          <div className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-md text-sm">
            In Progress: {tickets.filter(t => t.status === 'in_progress').length}
          </div>
          <div className="px-3 py-2 bg-green-100 text-green-700 rounded-md text-sm">
            Resolved: {tickets.filter(t => t.status === 'resolved').length}
          </div>
        </div>
      </div>

      {selectedTicket && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Respond to Ticket #{selectedTicket.id}</CardTitle>
            <CardDescription>
              {selectedTicket.first_name} {selectedTicket.last_name} ({selectedTicket.email})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold">Subject:</p>
              <p className="text-sm">{selectedTicket.subject}</p>
            </div>
            
            <div>
              <p className="text-sm font-semibold">Description:</p>
              <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
            </div>

            <div>
              <Label htmlFor="status">Update Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div>
              <Label htmlFor="response">Admin Response</Label>
              <Textarea
                id="response"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={4}
                placeholder="Type your response to the graduate..."
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitResponse}>
                Submit Response
              </Button>
              <Button variant="outline" onClick={() => setSelectedTicket(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {tickets.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No support tickets yet</p>
            </CardContent>
          </Card>
        ) : (
          tickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      Ticket #{ticket.id}: {ticket.subject}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <span className="font-semibold">From:</span> {ticket.first_name} {ticket.last_name} ({ticket.email})
                      <br />
                      <span className="font-semibold">Created:</span> {new Date(ticket.created_at).toLocaleString()}
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
                      {getCategoryLabel(ticket.category)}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-semibold">Issue Description:</p>
                    <p className="text-sm text-muted-foreground">{ticket.description}</p>
                  </div>

                  {ticket.admin_response && (
                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                      <p className="text-xs font-semibold text-blue-900 mb-1">Admin Response:</p>
                      <p className="text-sm text-blue-800">{ticket.admin_response}</p>
                      {ticket.responded_at && (
                        <p className="text-xs text-blue-600 mt-2">
                          Responded: {new Date(ticket.responded_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRespond(ticket)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {ticket.admin_response ? 'Update Response' : 'Respond'}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(ticket.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Support Ticket</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this support ticket? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
