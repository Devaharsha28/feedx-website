import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X } from "lucide-react";

interface SubmitNewFormProps {
    userId: string;
    onSuccess: () => void;
}

const SubmitNewForm = ({ userId, onSuccess }: SubmitNewFormProps) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState<'issue' | 'feedback' | 'suggestion'>('issue');

    // Form fields
    const [category, setCategory] = useState("");
    const [specifyCategory, setSpecifyCategory] = useState("");
    const [description, setDescription] = useState("");
    const [sentTo, setSentTo] = useState("");
    const [facultyName, setFacultyName] = useState("");
    const [anonymous, setAnonymous] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const getCategoryOptions = () => {
        if (type === 'issue') {
            return ['Academic', 'Hostel', 'Infrastructure', 'Library', 'Other'];
        } else if (type === 'feedback') {
            return ['Teaching', 'Facilities', 'Administration', 'Events', 'Other'];
        } else {
            return ['Infrastructure', 'Academic Program', 'Student Activities', 'Technology', 'Other'];
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length + selectedFiles.length > 3) {
            toast({
                title: "Limit Exceeded",
                description: "Maximum 3 files allowed",
                variant: "destructive"
            });
            return;
        }

        // Validate file types and size
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
            const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

            if (!isValidType) toast({ title: "Invalid File", description: `${file.name} is not a supported format`, variant: "destructive" });
            if (!isValidSize) toast({ title: "File too large", description: `${file.name} exceeds 5MB limit`, variant: "destructive" });

            return isValidType && isValidSize;
        });

        setSelectedFiles(prev => [...prev, ...validFiles]);
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const uploadFiles = async () => {
        const uploadedUrls: string[] = [];

        for (const file of selectedFiles) {
            const formData = new FormData();
            formData.append('file', file);
            // Add optional metadata if needed by backend, though simple upload is fine
            // formData.append('userId', userId); 

            try {
                // Determine API URL based on environment
                // In production (served from same origin), /api/upload is correct.
                // In dev (vite), we might need full URL or proxy. Start with relative /api/upload assuming proxy/same-origin.
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: {
                        // Authorization header if needed by backend verifyToken middleware
                        // We can get session from supabase
                        'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Upload failed:', errorData);
                    toast({
                        title: "Upload Failed",
                        description: errorData.error || `Failed to upload ${file.name}`,
                        variant: "destructive"
                    });
                    continue;
                }

                const data = await response.json();
                if (data.url) {
                    uploadedUrls.push(data.url);
                }
            } catch (error) {
                console.error('Upload error:', error);
                toast({
                    title: "Upload Error",
                    description: `Network error uploading ${file.name}`,
                    variant: "destructive"
                });
            }
        }

        return uploadedUrls;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let proofUrls: string[] = [];
            if (type === 'issue' && selectedFiles.length > 0) {
                proofUrls = await uploadFiles();
            }

            const { error } = await supabase.from('issues').insert({
                user_id: userId,
                type,
                category,
                specify_category: specifyCategory,
                description,
                sent_to: sentTo,
                faculty_name: facultyName,
                anonymous,
                proof_files: proofUrls.length > 0 ? proofUrls : null
            });

            if (error) throw error;

            toast({ title: "Success", description: "Submission successful" });

            // Reset form
            setCategory("");
            setSpecifyCategory("");
            setDescription("");
            setSentTo("");
            setFacultyName("");
            setAnonymous(false);
            setSelectedFiles([]);

            onSuccess();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to submit",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto glass border-none animate-fade-in-up">
            <CardHeader>
                <CardTitle className="text-primary text-2xl text-center">Submit New Request</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Type Selection */}
                    <div className="grid grid-cols-3 gap-2 bg-white/30 p-1 rounded-xl">
                        {(['issue', 'feedback', 'suggestion'] as const).map((t) => (
                            <Button
                                key={t}
                                type="button"
                                variant={type === t ? "default" : "ghost"}
                                onClick={() => setType(t)}
                                className={`capitalize rounded-lg transition-all duration-300 ${type === t ? 'shadow-md' : 'hover:bg-white/50'}`}
                            >
                                {t}
                            </Button>
                        ))}
                    </div>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200/60"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white/50 px-2 text-muted-foreground font-semibold tracking-wider">Details</span>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label className="text-primary font-medium">Category</Label>
                        <Select value={category} onValueChange={setCategory} required>
                            <SelectTrigger className="bg-white/50 border-white/20 focus:ring-primary/20 transition-all hover:bg-white/80">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {getCategoryOptions().map((opt) => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {category === 'Other' && (
                        <div className="space-y-2 animate-fade-in-up">
                            <Label className="text-primary font-medium">Specify Category</Label>
                            <Input
                                value={specifyCategory}
                                onChange={(e) => setSpecifyCategory(e.target.value)}
                                required
                                className="bg-white/50 border-white/20 focus:ring-primary/20 transition-all hover:bg-white/80"
                            />
                        </div>
                    )}

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="text-primary font-medium">Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your issue or feedback in detail..."
                            className="min-h-[120px] bg-white/50 border-white/20 focus:ring-primary/20 transition-all hover:bg-white/80"
                            required
                        />
                    </div>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200/60"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white/50 px-2 text-muted-foreground font-semibold tracking-wider">Recipient</span>
                        </div>
                    </div>

                    {/* Target */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-primary font-medium">Department / Sent To</Label>
                            <Input
                                value={sentTo}
                                onChange={(e) => setSentTo(e.target.value)}
                                placeholder="e.g., CPS Department"
                                className="bg-white/50 border-white/20 focus:ring-primary/20 transition-all hover:bg-white/80"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-primary font-medium">Specific Faculty (Optional)</Label>
                            <Input
                                value={facultyName}
                                onChange={(e) => setFacultyName(e.target.value)}
                                placeholder="Faculty Name"
                                className="bg-white/50 border-white/20 focus:ring-primary/20 transition-all hover:bg-white/80"
                            />
                        </div>
                    </div>

                    {/* File Upload (Issues Only) */}
                    {type === 'issue' && (
                        <>
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-200/60"></span>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white/50 px-2 text-muted-foreground font-semibold tracking-wider">Evidence</span>
                                </div>
                            </div>

                            <div className="space-y-4 border border-white/20 rounded-xl p-6 bg-white/30 animate-fade-in-up">
                                <Label className="text-primary font-medium">Upload Proofs (Max 3) (Optional)</Label>
                                <div className="flex items-center gap-4">
                                    <Button type="button" variant="outline" className="relative bg-white/50 hover:bg-white border-white/20 transition-all hover-lift">
                                        <input
                                            type="file"
                                            multiple
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={handleFileChange}
                                            disabled={selectedFiles.length >= 3}
                                        />
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Files
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        {selectedFiles.length}/3 files selected
                                    </span>
                                </div>

                                {selectedFiles.length > 0 && (
                                    <div className="space-y-2 mt-2">
                                        {selectedFiles.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between bg-white/60 p-3 rounded-lg border border-white/20 animate-slide-in-right" style={{ animationDelay: `${index * 0.1}s` }}>
                                                <span className="text-sm truncate max-w-[200px] font-medium">{file.name}</span>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeFile(index)}
                                                    className="hover:bg-red-100 hover:text-red-500 rounded-full h-8 w-8 p-0"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200/60"></span>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white/50 px-2 text-muted-foreground font-semibold tracking-wider">Privacy</span>
                        </div>
                    </div>

                    {/* Anonymous Toggle */}
                    <div className="flex items-center justify-between border border-white/20 rounded-xl p-4 bg-white/30 transition-all hover:bg-white/40">
                        <div className="space-y-0.5">
                            <Label className="text-base font-medium text-primary">Anonymous Submission</Label>
                            <p className="text-sm text-muted-foreground">
                                Hide your identity from faculty
                            </p>
                        </div>
                        <Switch
                            checked={anonymous}
                            onCheckedChange={setAnonymous}
                        />
                    </div>

                    <Button type="submit" className="w-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {type === 'issue' ? 'Report Issue' : type === 'feedback' ? 'Submit Feedback' : 'Submit Suggestion'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default SubmitNewForm;
