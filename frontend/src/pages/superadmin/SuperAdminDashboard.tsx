import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserCheck, 
  Shield, 
  GraduationCap, 
  Activity,
  TrendingUp,
  Server,
  HardDrive,
  Clock,
  AlertCircle,
  CheckCircle,
  UserPlus,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import api from '@/services/api';

interface SystemStats {
  total_users: number;
  total_admins: number;
  total_super_admins: number;
  total_graduates: number;
  total_graduates_profile?: number;
  total_surveys?: number;
  total_jobs?: number;
  total_support_tickets?: number;
  pending_tickets?: number;
}

interface SystemHealth {
  status: string;
  database: {
    status: string;
    connection_time: number;
  };
  storage: {
    total: number;
    free: number;
    used: number;
    usage_percentage: number;
  };
  memory: {
    current: number;
    peak: number;
    limit: number;
  };
  php_version: string;
  laravel_version: string;
  server_time: string;
}

interface UserEngagement {
  daily_active_users: number;
  weekly_active_users: number;
  monthly_active_users: number;
  new_users_this_week: number;
  new_users_this_month: number;
  recent_registrations: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
  }>;
}

interface SecurityLog {
  timestamp: string;
  level: string;
  type: string;
  message: string;
  user?: string;
}

interface ActivityItem {
  type: string;
  description: string;
  user: string;
  timestamp: string;
  icon: string;
}

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [engagement, setEngagement] = useState<UserEngagement | null>(null);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [statsRes, healthRes, engagementRes, logsRes, activityRes] = await Promise.all([
        api.get('/superadmin/statistics'),
        api.get('/superadmin/system-health'),
        api.get('/superadmin/user-engagement'),
        api.get('/superadmin/security-logs'),
        api.get('/superadmin/activity-timeline'),
      ]);

      setStats(statsRes.data);
      setHealth(healthRes.data);
      setEngagement(engagementRes.data);
      setSecurityLogs(logsRes.data.logs || []);
      setActivities(activityRes.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size > 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.total_users || 0,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Graduates',
      value: stats?.total_graduates || 0,
      icon: GraduationCap,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Administrators',
      value: stats?.total_admins || 0,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Super Admins',
      value: stats?.total_super_admins || 0,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Activity className="h-8 w-8" />
          SuperAdmin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Comprehensive system monitoring and analytics
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Main Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="health">System Health</TabsTrigger>
              <TabsTrigger value="engagement">User Engagement</TabsTrigger>
              <TabsTrigger value="security">Security Logs</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats?.total_graduates_profile !== undefined && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Graduate Profiles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.total_graduates_profile}</div>
                    </CardContent>
                  </Card>
                )}
                {stats?.total_surveys !== undefined && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Active Surveys</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.total_surveys}</div>
                    </CardContent>
                  </Card>
                )}
                {stats?.total_jobs !== undefined && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Job Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.total_jobs}</div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {stats?.total_support_tickets !== undefined && (
                <Card>
                  <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">{stats.total_support_tickets}</p>
                        <p className="text-sm text-gray-500">Total tickets</p>
                      </div>
                      {stats.pending_tickets !== undefined && (
                        <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600">{stats.pending_tickets}</p>
                          <p className="text-sm text-gray-500">Pending</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* System Health Tab */}
            <TabsContent value="health" className="space-y-6">
              {health && (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Server className="h-5 w-5" />
                          System Status
                        </CardTitle>
                        <Badge variant={health.status === 'healthy' ? 'default' : 'destructive'}>
                          {health.status === 'healthy' ? (
                            <><CheckCircle className="h-3 w-3 mr-1" /> Healthy</>
                          ) : (
                            <><AlertCircle className="h-3 w-3 mr-1" /> Issues Detected</>
                          )}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">PHP Version</p>
                          <p className="font-semibold">{health.php_version}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Laravel Version</p>
                          <p className="font-semibold">{health.laravel_version}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Database</p>
                          <p className="font-semibold">{health.database.status} ({health.database.connection_time}ms)</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Server Time</p>
                          <p className="font-semibold">{new Date(health.server_time).toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <HardDrive className="h-5 w-5" />
                          Storage
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Total</span>
                          <span className="font-semibold">{formatBytes(health.storage.total)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Used</span>
                          <span className="font-semibold">{formatBytes(health.storage.used)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Free</span>
                          <span className="font-semibold">{formatBytes(health.storage.free)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{ width: `${health.storage.usage_percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                          {health.storage.usage_percentage}% used
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="h-5 w-5" />
                          Memory Usage
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Current</span>
                          <span className="font-semibold">{formatBytes(health.memory.current)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Peak</span>
                          <span className="font-semibold">{formatBytes(health.memory.peak)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Limit</span>
                          <span className="font-semibold">
                            {health.memory.limit === -1 ? 'Unlimited' : formatBytes(health.memory.limit)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>

            {/* User Engagement Tab */}
            <TabsContent value="engagement" className="space-y-6">
              {engagement && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Daily Active Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600">
                          {engagement.daily_active_users}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Today</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Weekly Active Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-600">
                          {engagement.weekly_active_users}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Monthly Active Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-purple-600">
                          {engagement.monthly_active_users}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          New User Growth
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">This Week</span>
                          <span className="text-2xl font-bold">{engagement.new_users_this_week}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">This Month</span>
                          <span className="text-2xl font-bold">{engagement.new_users_this_month}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <UserPlus className="h-5 w-5" />
                          Recent Registrations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {engagement.recent_registrations.slice(0, 5).map((user) => (
                            <div key={user.id} className="flex items-center justify-between text-sm">
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                              <Badge variant="outline">{user.role}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </TabsContent>

            {/* Security Logs Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & System Logs
                  </CardTitle>
                  <CardDescription>
                    Recent security events and system activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {securityLogs.length === 0 ? (
                      <p className="text-center py-8 text-gray-500">No logs available</p>
                    ) : (
                      securityLogs.map((log, index) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <Badge 
                            variant={
                              log.level === 'error' ? 'destructive' : 
                              log.level === 'warning' ? 'default' : 
                              'secondary'
                            }
                            className="mt-0.5"
                          >
                            {log.level}
                          </Badge>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{log.message}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">{log.type}</Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(log.timestamp).toLocaleString()}
                              </span>
                              {log.user && (
                                <span className="text-xs text-gray-500">• {log.user}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Timeline Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Activity Timeline
                  </CardTitle>
                  <CardDescription>
                    Recent system and user activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.length === 0 ? (
                      <p className="text-center py-8 text-gray-500">No recent activities</p>
                    ) : (
                      activities.map((activity, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <UserPlus className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
