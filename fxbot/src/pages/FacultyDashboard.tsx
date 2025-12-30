import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import FacultyIssuesList from "@/components/faculty/FacultyIssuesList";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const FacultyDashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/auth');
                return;
            }

            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();

            if (profileData?.role !== 'faculty') {
                navigate('/student/menu');
                return;
            }

            setProfile(profileData);
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <header className="glass fixed top-0 left-0 right-0 z-50 border-b-0">
                <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-primary">Faculty Dashboard</h1>
                            <p className="text-xs text-muted-foreground">{profile.name} • {profile.department}</p>
                        </div>
                    </div>

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
            </header>

            <main className="container mx-auto p-4 md:p-8 pt-24 md:pt-32 pb-10">
                <FacultyIssuesList />
            </main>
        </div>
    );
};

export default FacultyDashboard;
