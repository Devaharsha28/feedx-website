import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import EscalateIssue from "./EscalateIssue";

interface Issue {
    id: string;
    issue_id: string;
    type: string;
    category: string;
    description: string;
    status: string;
    created_at: string;
    escalated: boolean;
    proof_files: string[] | null;
    resolution_message?: string;
}

const TrackIssues = ({ userId }: { userId: string }) => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchIssues = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('issues')
            .select('*')
            .eq('user_id', userId)
            .in('status', ['open', 'submitted', 'in_progress'])
            .order('created_at', { ascending: false });

        setIssues(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchIssues();
    }, [userId]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-status-open text-white';
            case 'submitted': return 'bg-blue-500 text-white';
            case 'in_progress': return 'bg-status-progress text-white';
            case 'resolved': return 'bg-status-resolved text-white';
            case 'rejected': return 'bg-status-rejected text-white';
            default: return 'bg-gray-500 text-white';
        }
    };

    const getStatusStep = (status: string) => {
        const steps = ['submitted', 'in_progress', 'resolved'];
        // Map 'open' to 'submitted' for stepper
        if (status === 'open') return 0;
        return steps.indexOf(status);
    };

    if (loading) return <div className="text-center py-10">Loading issues...</div>;

    if (issues.length === 0) {
        return (
            <div className="text-center py-10 text-muted-foreground">
                No active issues found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {issues.map((issue, index) => (
                <Card key={issue.id} className="glass border-none cursor-pointer hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg font-bold text-primary">
                                    {issue.type === 'issue' ? issue.issue_id : 'Feedback'}
                                </CardTitle>
                                <CardDescription className="text-xs font-medium">{format(new Date(issue.created_at), 'PPP')}</CardDescription>
                            </div>
                            <Badge className={`${getStatusColor(issue.status)} shadow-sm`}>
                                {issue.status.replace('_', ' ')}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="line-clamp-2 text-sm mb-4 text-foreground/80">{issue.description}</p>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="w-full bg-white/50 hover:bg-white border-white/20 transition-all">View Details & Track</Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto glass border-l border-white/20">
                                <SheetHeader>
                                    <SheetTitle className="text-primary">Issue Details</SheetTitle>
                                    <SheetDescription>ID: {issue.issue_id || 'N/A'}</SheetDescription>
                                </SheetHeader>

                                <div className="mt-6 space-y-6">
                                    {/* Status Stepper */}
                                    <div className="space-y-4 bg-white/40 p-4 rounded-xl border border-white/20">
                                        <h3 className="font-semibold text-primary">Status Tracking</h3>
                                        <div className="space-y-4 relative">
                                            {/* Vertical Line */}
                                            <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-muted/50 -z-10" />

                                            {['Submitted', 'In Progress', 'Resolved'].map((label, index) => {
                                                const currentStep = getStatusStep(issue.status);
                                                const isCompleted = index <= currentStep;
                                                const isCurrent = index === currentStep;

                                                return (
                                                    <div key={label} className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "h-8 w-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                                            isCompleted ? "border-primary bg-primary text-white shadow-md" : "border-muted bg-background/50 text-muted-foreground",
                                                            isCurrent && "ring-4 ring-primary/20 scale-110"
                                                        )}>
                                                            {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                                                        </div>
                                                        <span className={cn(
                                                            "font-medium transition-colors duration-300",
                                                            isCompleted ? "text-primary" : "text-muted-foreground",
                                                            isCurrent && "font-bold"
                                                        )}>{label}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-primary">Description</h3>
                                        <p className="text-sm text-foreground/90 bg-white/50 p-4 rounded-xl border border-white/20 shadow-sm">
                                            {issue.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="bg-white/40 p-3 rounded-lg border border-white/20">
                                            <span className="font-semibold block text-primary text-xs uppercase tracking-wider">Category</span>
                                            <span className="text-foreground/80">{issue.category}</span>
                                        </div>
                                        <div className="bg-white/40 p-3 rounded-lg border border-white/20">
                                            <span className="font-semibold block text-primary text-xs uppercase tracking-wider">Type</span>
                                            <span className="text-foreground/80 capitalize">{issue.type}</span>
                                        </div>
                                    </div>

                                    {/* Escalation Section */}
                                    <EscalateIssue
                                        issue={issue}
                                        onSuccess={() => {
                                            fetchIssues();
                                        }}
                                    />

                                    {/* Proof Files */}
                                    {issue.proof_files && issue.proof_files.length > 0 && (
                                        <div className="space-y-2">
                                            <h3 className="font-semibold text-primary">Attachments</h3>
                                            <div className="grid grid-cols-3 gap-2">
                                                {issue.proof_files.map((path, i) => {
                                                    const isLocal = path.startsWith('/') || path.startsWith('uploads');
                                                    const fileUrl = isLocal
                                                        ? (path.startsWith('/') ? path : `/${path}`)
                                                        : supabase.storage.from('issue-proofs').getPublicUrl(path).data.publicUrl;

                                                    return (
                                                        <a
                                                            key={i}
                                                            href={fileUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="aspect-square bg-white/40 border border-white/20 rounded-lg flex flex-col items-center justify-center text-xs font-medium text-muted-foreground hover:bg-white/60 hover:text-primary transition-colors cursor-pointer p-2 text-center"
                                                        >
                                                            <ExternalLink className="w-4 h-4 mb-1" />
                                                            <span>File {i + 1}</span>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default TrackIssues;
