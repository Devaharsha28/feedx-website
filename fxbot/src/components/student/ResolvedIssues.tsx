import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { CheckCircle } from "lucide-react";

interface Issue {
    id: string;
    issue_id: string;
    type: string;
    category: string;
    description: string;
    status: string;
    created_at: string;
    resolved_at: string;
    resolution_message: string;
}

const ResolvedIssues = ({ userId }: { userId: string }) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResolved = async () => {
            const { data } = await supabase
                .from('issues')
                .select('*')
                .eq('user_id', userId)
                .eq('status', 'resolved')
                .order('resolved_at', { ascending: false });

            setIssues(data || []);
            setLoading(false);
        };

        fetchResolved();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="glass p-8 rounded-2xl border-none">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-4 text-sm">Loading history...</p>
                </div>
            </div>
        );
    }

    if (issues.length === 0) {
        return (
            <Card className="glass border-none animate-fade-in-up">
                <CardContent className="py-16 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">No Resolved Issues Yet</h3>
                    <p className="text-muted-foreground">Your resolved issues will appear here once faculty responds.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {issues.map((issue, index) => (
                <Card key={issue.id} className="glass border-none hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold text-primary">
                                        {issue.type === 'issue' ? issue.issue_id : 'Feedback'}
                                    </CardTitle>
                                    <CardDescription className="text-sm">
                                        Resolved on {format(new Date(issue.resolved_at), 'PPP')}
                                    </CardDescription>
                                </div>
                            </div>
                            <Badge className="bg-green-600 hover:bg-green-700 shadow-sm">Resolved</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="bg-white/40 p-4 rounded-xl border border-white/20">
                                <h4 className="text-sm font-semibold text-primary mb-2">Original Request</h4>
                                <p className="text-sm text-foreground/80 leading-relaxed">{issue.description}</p>
                            </div>

                            {issue.resolution_message && (
                                <div className="bg-green-50/50 p-4 rounded-xl border border-green-200/50 shadow-sm">
                                    <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        Faculty Response
                                    </h4>
                                    <p className="text-sm text-green-700 leading-relaxed">{issue.resolution_message}</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ResolvedIssues;
