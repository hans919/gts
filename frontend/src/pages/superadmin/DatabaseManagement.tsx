import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Database,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  FileText,
  HardDrive,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import api from '@/services/api';

interface Backup {
  filename: string;
  size: number;
  size_formatted: string;
  created_at: string;
}

export default function DatabaseManagement() {
  const [backups, setBackups] = useState<Backup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [exportType, setExportType] = useState<string>('all');
  const [clearType, setClearType] = useState<string>('cache');
  const { toast } = useToast();

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const response = await api.get('/superadmin/backups');
      setBackups(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to load backups',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setCreating(true);
      const response = await api.post('/superadmin/backup');
      
      toast({
        title: 'Success',
        description: response.data.message,
      });
      
      fetchBackups();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create backup',
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };

  const handleRestoreBackup = async () => {
    if (!selectedBackup) return;

    try {
      setRestoring(true);
      const response = await api.post('/superadmin/restore', {
        filename: selectedBackup,
      });

      toast({
        title: 'Success',
        description: response.data.message,
      });

      setIsRestoreDialogOpen(false);
      setSelectedBackup(null);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to restore backup',
        variant: 'destructive',
      });
    } finally {
      setRestoring(false);
    }
  };

  const handleDeleteBackup = async () => {
    if (!selectedBackup) return;

    try {
      await api.delete(`/superadmin/backups/${selectedBackup}`);

      toast({
        title: 'Success',
        description: 'Backup deleted successfully',
      });

      setIsDeleteDialogOpen(false);
      setSelectedBackup(null);
      fetchBackups();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to delete backup',
        variant: 'destructive',
      });
    }
  };

  const handleExportData = async () => {
    try {
      setExporting(true);
      const response = await api.post('/superadmin/export', {
        type: exportType,
      });

      // Create downloadable JSON file
      const dataStr = JSON.stringify(response.data.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `export_${exportType}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: 'Success',
        description: `${exportType} data exported successfully`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to export data',
        variant: 'destructive',
      });
    } finally {
      setExporting(false);
    }
  };

  const handleClearCache = async () => {
    try {
      setClearing(true);
      const response = await api.post('/superadmin/clear-cache', {
        type: clearType,
      });

      toast({
        title: 'Success',
        description: response.data.message,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to clear cache',
        variant: 'destructive',
      });
    } finally {
      setClearing(false);
    }
  };

  const openRestoreDialog = (filename: string) => {
    setSelectedBackup(filename);
    setIsRestoreDialogOpen(true);
  };

  const openDeleteDialog = (filename: string) => {
    setSelectedBackup(filename);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Database className="h-8 w-8" />
          Database Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage database backups, exports, and system maintenance
        </p>
      </div>

      {/* Backup Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                Database Backups
              </CardTitle>
              <CardDescription>
                Create and manage database backups
              </CardDescription>
            </div>
            <Button
              onClick={handleCreateBackup}
              disabled={creating}
              className="flex items-center gap-2"
            >
              {creating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Create Backup
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <p className="mt-4 text-gray-600">Loading backups...</p>
            </div>
          ) : backups.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Database className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg font-medium">No backups found</p>
              <p className="text-sm mt-2">Create your first backup to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {backups.map((backup) => (
                <div
                  key={backup.filename}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {backup.filename}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="secondary">{backup.size_formatted}</Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(backup.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openRestoreDialog(backup.filename)}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Restore
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(backup.filename)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export System Data
          </CardTitle>
          <CardDescription>
            Export data to JSON format for analysis or backup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Select Data Type</label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Data</SelectItem>
                  <SelectItem value="users">Users Only</SelectItem>
                  <SelectItem value="graduates">Graduates Only</SelectItem>
                  <SelectItem value="surveys">Surveys Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleExportData}
              disabled={exporting}
              className="flex items-center gap-2"
            >
              {exporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Export Data
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cache Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Clear Cache & Logs
          </CardTitle>
          <CardDescription>
            Clear application cache and log files to free up space
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Select Type</label>
              <Select value={clearType} onValueChange={setClearType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cache">Cache Only</SelectItem>
                  <SelectItem value="logs">Logs Only</SelectItem>
                  <SelectItem value="all">Cache & Logs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleClearCache}
              disabled={clearing}
              variant="outline"
              className="flex items-center gap-2"
            >
              {clearing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Clearing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Clear {clearType === 'all' ? 'Both' : clearType === 'cache' ? 'Cache' : 'Logs'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Restore Database Backup?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will restore the database from <strong>{selectedBackup}</strong>.
              <br />
              <br />
              <span className="text-red-600 font-semibold">
                WARNING: This action will overwrite all current data!
              </span>
              <br />
              Make sure you have a recent backup before proceeding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRestoreBackup}
              disabled={restoring}
              className="bg-red-600 hover:bg-red-700"
            >
              {restoring ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Restoring...
                </>
              ) : (
                'Restore Database'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Backup?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{selectedBackup}</strong>?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBackup}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Backup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
