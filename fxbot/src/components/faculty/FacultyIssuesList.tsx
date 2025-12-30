import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { MessageSquare, ExternalLink, AlertTriangle } from "lucide-react";

interface Issue {
    id: string;
    issue_id: string;
    type: string;
    category: string;
    description: string;
    status: string;
    created_at: string;
    user_id: string;
    anonymous: boolean;
    proof_files: string[] | null;
    escalated: boolean;
    profiles: {
        name: string;
        department: string;
        pin: string;
    };
}

const FacultyIssuesList = () => {
    const { toast } = useToast();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    // Response state
    const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
    const [responseText, setResponseText] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [responding, setResponding] = useState(false);

    const fetchIssues = async () => {
        setLoading(true);
        let query = supabase
            .from('issues')
            .select(`
        *,
        profiles:user_id (name, department, pin)
      `)
            .order('created_at', { ascending: false });

        if (filter !== "all") {
            query = query.eq('status', filter);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Error fetching issues:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to load issues",
                variant: "destructive"
            });
        } else {
            setIssues(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchIssues();
    }, [filter]);

    const handleRespond = async () => {
        if (!selectedIssue || !responseText) return;

        setResponding(true);
        const user = (await supabase.auth.getUser()).data.user;

        if (!user) return;

        // 1. Use RPC for atomic update
        const { error } = await supabase.rpc('respond_to_issue', {
            p_issue_id: selectedIssue.id,
            p_message: responseText,
            p_new_status: newStatus || selectedIssue.status
        });

        if (error) {
            toast({
                title: "Error",
                description: error.message || "Failed to send response",
                variant: "destructive"
            });
            setResponding(false);
            return;
        }

        toast({ title: "Success", description: "Response sent successfully" });
        setResponding(false);
        setSelectedIssue(null);
        setResponseText("");
        setNewStatus("");
        fetchIssues();
    };

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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Student Submissions</h2>
                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px] glass border-none">
                        <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="escalated">Escalated Only</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : issues.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground border-none rounded-xl glass flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-lg">No submissions found matching criteria.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {issues.map((issue, index) => (
                        <Card key={issue.id} className={`glass border-none transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up ${issue.escalated ? "border-l-4 border-l-red-500 bg-red-50/30" : ""}`} style={{ animationDelay: `${index * 0.1}s` }}>
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="uppercase tracking-wider text-[10px] font-bold bg-white/50">{issue.type}</Badge>
                                            <Badge className={`${getStatusColor(issue.status)} shadow-sm`}>{issue.status.replace('_', ' ')}</Badge>
                                            {issue.escalated && (
                                                <Badge variant="destructive" className="flex items-center gap-1 animate-pulse">
                                                    <AlertTriangle className="w-3 h-3" /> Escalated
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-lg font-bold text-primary">
                                            {issue.anonymous ? "Anonymous Student" : issue.profiles?.name || "Unknown Student"}
                                        </CardTitle>
                                        <CardDescription className="text-xs font-medium mt-1">
                                            {!issue.anonymous && `${issue.profiles?.pin} • ${issue.profiles?.department} • `}
                                            {format(new Date(issue.created_at), 'PPP p')}
                                        </CardDescription>
                                    </div>
                                    {issue.type === 'issue' && (
                                        <div className="text-xs font-mono text-muted-foreground bg-white/50 px-2 py-1 rounded border border-white/20">
                                            {issue.issue_id}
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="pb-3">
                                <div className="space-y-4">
                                    <div className="bg-white/40 p-4 rounded-lg border border-white/20">
                                        <span className="font-semibold text-xs text-primary uppercase tracking-wider block mb-2">Category: {issue.category}</span>
                                        <p className="text-sm leading-relaxed text-foreground/90">{issue.description}</p>
                                    </div>

                                    {issue.proof_files && issue.proof_files.length > 0 && (
                                        <div className="flex gap-2">
                                            {issue.proof_files.map((path, i) => {
                                                // Handle both local uploads and legacy Supabase paths
                                                const isLocal = path.startsWith('/') || path.startsWith('uploads');
                                                const fileUrl = isLocal
                                                    ? (path.startsWith('/') ? path : `/${path}`)
                                                    : supabase.storage.from('issue-proofs').getPublicUrl(path).data.publicUrl;

                                                return (
                                                    <Button key={i} variant="outline" size="sm" className="bg-white/50 hover:bg-white" asChild>
                                                        <a
                                                            href={fileUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex items-center gap-2"
                                                        >
                                                            <ExternalLink className="w-3 h-3" /> Proof {i + 1}
                                                        </a>
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="bg-white/30 p-4 flex justify-end rounded-b-xl border-t border-white/10">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => {
                                            setSelectedIssue(issue);
                                            setNewStatus(issue.status);
                                        }} className="shadow-md hover:shadow-lg transition-all">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Respond & Update
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px] glass border-none">
                                        <DialogHeader>
                                            <DialogTitle>Respond to {issue.type}</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 mt-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Update Status</label>
                                                <Select value={newStatus} onValueChange={setNewStatus}>
                                                    <SelectTrigger className="bg-white/50 border-white/20">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="open">Open</SelectItem>
                                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                                        <SelectItem value="resolved">Resolved</SelectItem>
                                                        <SelectItem value="rejected">Rejected</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Response Message</label>
                                                <Textarea
                                                    value={responseText}
                                                    onChange={(e) => setResponseText(e.target.value)}
                                                    placeholder="Type your response to the student..."
                                                    rows={5}
                                                    className="bg-white/50 border-white/20 focus:bg-white"
                                                />
                                            </div>
                                            <Button
                                                className="w-full shadow-lg"
                                                onClick={handleRespond}
                                                disabled={responding || !responseText}
                                            >
                                                {responding ? "Sending..." : "Send Response & Update"}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FacultyIssuesList;
