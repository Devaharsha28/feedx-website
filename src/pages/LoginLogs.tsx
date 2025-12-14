import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Activity, User, Clock, Globe } from 'lucide-react';

interface LoginLog {
  id: number;
  username: string;
  login_time: string;
  ip_address: string;
  success: boolean;
  device_info?: string;
}

const LoginLogs = () => {
  const [logs, setLogs] = useState<LoginLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterUsername, setFilterUsername] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
      return;
    }
    fetchLogs();
  }, [token]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      let url = '/api/auth/login-logs';
      if (filterUsername) {
        url += `?username=${filterUsername}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch logs');

      const data = await response.json();
      setLogs(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch logs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const successCount = logs.filter((log) => log.success).length;
  const failureCount = logs.filter((log) => !log.success).length;

  return (
    <div className="min-h-screen bg-slate-900 pt-20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/admin")}
              className="mr-4"
            >
              ← Back to Admin Panel
            </Button>
            <Activity className="w-8 h-8 text-purple-500" />
            <h1 className="text-3xl font-bold text-white">Login Activity</h1>
          </div>
          <Button
            onClick={fetchLogs}
            disabled={loading}
            variant="outline"
          >
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-green-500/30 bg-slate-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Successful Logins</p>
                  <p className="text-3xl font-bold text-green-400">{successCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-slate-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Failed Attempts</p>
                  <p className="text-3xl font-bold text-red-400">{failureCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-slate-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Attempts</p>
                  <p className="text-3xl font-bold text-blue-400">{logs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="mb-6 border-slate-700 bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Filter by username..."
                value={filterUsername}
                onChange={(e) => setFilterUsername(e.target.value)}
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded px-4 py-2 text-white placeholder:text-gray-500 text-sm"
              />
              <Button
                onClick={() => {
                  setFilterUsername('');
                  fetchLogs();
                }}
                variant="outline"
              >
                Clear
              </Button>
              <Button
                onClick={fetchLogs}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Table */}
        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Loading logs...</p>
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No logs found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">Username</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">Login Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">IP Address</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-300">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                        <td className="py-3 px-4 text-white font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          {log.username}
                        </td>
                        <td className="py-3 px-4 text-gray-400 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          {new Date(log.login_time).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-gray-400 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          {log.ip_address || 'N/A'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              log.success
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {log.success ? 'Success' : 'Failed'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginLogs;
