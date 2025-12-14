import { useState, useEffect } from "react";
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
import { updatesAPI, Update } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";

export default function AddUpdate() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    images: [] as string[],
  });
  const [currentImageLink, setCurrentImageLink] = useState("");

  // Auth check
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

  // Convert Google Drive share link to direct viewable link
  const convertGDriveLink = (url: string): string => {
    if (!url) return url;
    
    // Format: https://drive.google.com/file/d/FILE_ID/view
    let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    
    // Format: https://drive.google.com/open?id=FILE_ID
    match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    
    // Format: https://drive.google.com/uc?id=FILE_ID
    if (url.includes('drive.google.com/uc')) {
      return url.replace('export=download', 'export=view');
    }
    
    return url;
  };

  const handleAddImage = () => {
    if (currentImageLink.trim()) {
      const link = convertGDriveLink(currentImageLink.trim());
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, link],
      }));
      setCurrentImageLink("");
      toast({ title: "Image link added" });
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
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
        images: formData.images,
      });

      toast({
        title: "Success",
        description: "Update created successfully!",
      });

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        images: [],
      });
      setImagePreview(null);
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
          {/* Form Section */}
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
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Update description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
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
                    <Label htmlFor="imageLink">Image Link (Google Drive or URL)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="imageLink"
                        placeholder="Paste Google Drive or image URL"
                        value={currentImageLink}
                        onChange={(e) => setCurrentImageLink(e.target.value)}
                      />
                      <Button type="button" onClick={handleAddImage} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Share image from Google Drive → "Anyone with link" → Paste here
                    </p>
                    {formData.images.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.images.map((img, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
                            <img src={img} alt="" className="w-10 h-10 object-cover rounded" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            <span className="text-sm flex-1 truncate">{img.length > 40 ? img.substring(0, 40) + '...' : img}</span>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeImage(index)} className="h-6 w-6 p-0 text-destructive">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Update"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* List Section */}
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
                              className={`text-xs px-2 py-1 rounded-full capitalize ${
                                priorityColors[update.priority]
                              }`}
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
