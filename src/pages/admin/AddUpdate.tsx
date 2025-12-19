import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updatesAPI, Update, uploadFile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Loader2 } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export default function AddUpdate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    type: "announcement",
    category: "General",
    images: [] as string[],
    files: [] as string[],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin-login';
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      priority: value as "low" | "medium" | "high",
    }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, url],
        }));
        toast({ title: "Image uploaded successfully" });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        setFormData((prev) => ({
          ...prev,
          files: [...prev.files, url],
        }));
        toast({ title: "File uploaded successfully" });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (documentInputRef.current) {
        documentInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updatesAPI.create({
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        type: formData.type,
        category: formData.category,
        images: formData.images,
        files: formData.files,
      });

      toast({
        title: "Success",
        description: "Update created successfully!",
      });

      setFormData({
        title: "",
        type: "announcement",
        category: "General",
        description: "",
        priority: "medium",
        images: [],
        files: [],
      });
      fetchUpdates();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create update",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUpdates = async () => {
    try {
      const data = await updatesAPI.getAll();
      setUpdates(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch updates",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await updatesAPI.delete(id);
      toast({
        title: "Success",
        description: "Update deleted successfully!",
      });
      fetchUpdates();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete update",
        variant: "destructive",
      });
    }
  };

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin")}
            className="mb-4"
          >
            ← Back to Admin Panel
          </Button>
          <h1 className="text-3xl font-bold mb-2">Manage Updates</h1>
          <p className="text-muted-foreground">
            Create and manage platform updates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Add Update</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Update title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description <span className="text-xs text-muted-foreground">(Markdown supported)</span></Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Update description - supports **bold**, *italic*, [links](url), lists, etc."
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                    />
                    {formData.description && (
                      <div className="mt-2 p-3 border border-border rounded-lg bg-card">
                        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                        <MarkdownRenderer content={formData.description} />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={handleTypeChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="exam">Exam</SelectItem>
                        <SelectItem value="result">Result</SelectItem>
                        <SelectItem value="circular">Circular</SelectItem>
                        <SelectItem value="announcement">Announcement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      placeholder="e.g., Academic, Events"
                      value={formData.category}
                      onChange={handleCategoryChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      type="text"
                      id="category"
                      name="category"
                      placeholder="e.g., Academics, Admissions"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={handlePriorityChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="images">Upload Images</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                        id="image-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Images
                          </>
                        )}
                      </Button>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.images.map((img, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
                            <img src={img} alt="" className="w-12 h-12 object-cover rounded" />
                            <span className="text-sm flex-1 truncate">{img.split('/').pop()}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeImage(index)} className="h-6 w-6 p-0 text-destructive">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="documents">Attach Files (PDF, Documents, etc.)</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={documentInputRef}
                        onChange={handleDocumentUpload}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt"
                        multiple
                        className="hidden"
                        id="document-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => documentInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Files
                          </>
                        )}
                      </Button>
                    </div>
                    {formData.files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {formData.files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
                            <span className="text-sm flex-1 truncate">{file.split('/').pop()}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-6 w-6 p-0 text-destructive">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
                    {isLoading ? "Creating..." : "Create Update"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <button
                  onClick={fetchUpdates}
                  className="text-blue-500 hover:underline mb-4 text-sm"
                >
                  Refresh List
                </button>
                <div className="space-y-3">
                  {updates.map((update) => (
                    <div
                      key={update.id}
                      className="p-4 border rounded-lg hover:bg-secondary/50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{update.title}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full capitalize ${priorityColors[update.priority]}`}
                            >
                              {update.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {update.description}
                          </p>
                          {update.images.length > 0 && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                              {update.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`Update ${idx}`}
                                  className="h-12 w-12 object-cover rounded"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(update.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(update.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
