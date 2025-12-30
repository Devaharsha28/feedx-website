import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Clock } from "lucide-react";

interface Issue {
    id: string;
    created_at: string;
    escalated: boolean;
}

const EscalateIssue = ({ issue, onSuccess }: { issue: Issue; onSuccess: () => void }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [escalateTo, setEscalateTo] = useState("");
    const [reason, setReason] = useState("");

    const canEscalate = () => {
        if (issue.escalated) return false;
        const hoursSinceCreation = (Date.now() - new Date(issue.created_at).getTime()) / (1000 * 60 * 60);
        return hoursSinceCreation >= 48;
    };

    const handleEscalate = async () => {
        if (!reason) {
            toast({ title: "Reason Required", description: "Please provide a reason for escalation", variant: "destructive" });
            return;
        }

        setLoading(true);

        const { error } = await supabase.rpc('escalate_issue', {
            p_issue_id: issue.id,
            p_reason: reason,
            p_escalated_to: escalateTo
        });

        setLoading(false);

        if (!error) {
            toast({ title: "Escalated", description: "Issue has been escalated successfully" });
            setOpen(false);
            onSuccess();
        } else {
            toast({
                title: "Error",
                description: error.message || "Failed to escalate issue",
                variant: "destructive"
            });
        }
    };

    if (issue.escalated) {
        return (
            <div className="bg-red-50/50 border border-red-200/50 rounded-xl p-4 flex items-center gap-3 text-red-700 shadow-sm">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                    <p className="font-semibold text-sm">Issue Escalated</p>
                    <p className="text-xs text-red-600">This issue has been escalated to higher authorities</p>
                </div>
            </div>
        );
    }

    if (!canEscalate()) {
        const hoursLeft = 48 - (Date.now() - new Date(issue.created_at).getTime()) / (1000 * 60 * 60);
        return (
            <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4 flex items-center gap-3 text-blue-700 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                </div>
                <div>
                    <p className="font-semibold text-sm">Escalation Pending</p>
                    <p className="text-xs text-blue-600">Available in {Math.ceil(hoursLeft)} hours (48h minimum)</p>
                </div>
            </div>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" className="w-full shadow-lg hover:shadow-xl transition-all">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Escalate Issue
                </Button>
            </DialogTrigger>
            <DialogContent className="glass border-none">
                <DialogHeader>
                    <DialogTitle className="text-primary">Escalate Issue</DialogTitle>
                    <DialogDescription>
                        This issue has been pending for over 48 hours. You can escalate it to higher authorities.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label className="text-primary font-medium">Escalate To (Optional)</Label>
                        <Input
                            placeholder="e.g., Principal, HOD"
                            value={escalateTo}
                            onChange={(e) => setEscalateTo(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-primary font-medium">Reason for Escalation</Label>
                        <Textarea
                            placeholder="Why are you escalating this issue?"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        className="w-full shadow-lg hover:shadow-xl transition-all"
                        variant="destructive"
                        onClick={handleEscalate}
                        disabled={loading}
                    >
                        Confirm Escalation
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EscalateIssue;
