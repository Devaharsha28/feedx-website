import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, User, Activity, CheckCircle, Clock, AlertCircle, Trash2 } from "lucide-react";
import SubmitNewForm from "@/components/student/SubmitNewForm";
import TrackIssues from "@/components/student/TrackIssues";
import ResolvedIssues from "@/components/student/ResolvedIssues";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const StudentMenu = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [stats, setStats] = useState({ active: 0, resolved: 0, pending: 0 });
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/auth');
                return;
            }
            setUser(session.user);

            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            setProfile(profileData);
            fetchStats(session.user.id);
        };

        checkAuth();
    }, [navigate]);

    const fetchStats = async (userId: string) => {
        const { data: issues } = await supabase
            .from('issues')
            .select('status')
            .eq('user_id', userId);

        if (issues) {
            const resolved = issues.filter(i => i.status === 'resolved').length;
            const active = issues.filter(i => i.status === 'in_progress').length;
            const pending = issues.filter(i => ['open', 'submitted'].includes(i.status)).length;
            setStats({ active, resolved, pending });
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (!user || !profile) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 pb-20 md:pb-0">
            {/* Header */}
            <header className="glass fixed top-0 left-0 right-0 z-50 border-b-0">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-primary">{profile.username}</h1>
                            <p className="text-xs text-muted-foreground">{profile.department} Student</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-500 text-muted-foreground">
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-red-600 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" /> Delete Account
                                    </DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to delete your account? This action cannot be undone and all your data will be lost.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex gap-2 sm:justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setDeleteDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="button" variant="destructive" onClick={async () => {
                                        // Since client-side user deletion is restricted, we'll just sign out for now
                                        // In a real app, this would call an Edge Function or Admin API
                                        // For this demo, we can assume "contact admin" or soft delete if supported.
                                        // Let's try to delete profile first (if RLS allows)
                                        if (user) {
                                            await supabase.from('profiles').delete().eq('id', user.id);
                                        }
                                        await supabase.auth.signOut();
                                        navigate('/');
                                    }}>
                                        Delete Account
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-500">
                                    <LogOut className="w-5 h-5" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Confirm Logout</DialogTitle>
                                    <DialogDescription>
                                        Are you sure you want to log out of your account?
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex gap-2 sm:justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setLogoutDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="button" variant="destructive" onClick={handleLogout}>
                                        Log out
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 space-y-8 pt-24 pb-20">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <Card className="glass border-none hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-2xl font-bold text-blue-700">{stats.active}</span>
                            <span className="text-xs text-muted-foreground font-medium">Active</span>
                        </CardContent>
                    </Card>
                    <Card className="glass border-none hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-2xl font-bold text-green-700">{stats.resolved}</span>
                            <span className="text-xs text-muted-foreground font-medium">Resolved</span>
                        </CardContent>
                    </Card>
                    <Card className="glass border-none hover:shadow-lg transition-shadow">
                        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                                <Clock className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="text-2xl font-bold text-orange-700">{stats.pending}</span>
                            <span className="text-xs text-muted-foreground font-medium">Pending</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="submit" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 glass p-1 h-auto">
                        <TabsTrigger value="submit" className="data-[state=active]:bg-primary data-[state=active]:text-white py-2.5">Submit New</TabsTrigger>
                        <TabsTrigger value="track" className="data-[state=active]:bg-primary data-[state=active]:text-white py-2.5">Track</TabsTrigger>
                        <TabsTrigger value="resolved" className="data-[state=active]:bg-primary data-[state=active]:text-white py-2.5">History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="submit" className="space-y-4">
                        <Card className="glass border-none">
                            <CardContent className="pt-6">
                                <SubmitNewForm userId={user.id} onSuccess={() => fetchStats(user.id)} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="track">
                        <TrackIssues userId={user.id} />
                    </TabsContent>

                    <TabsContent value="resolved">
                        <ResolvedIssues userId={user.id} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default StudentMenu;
