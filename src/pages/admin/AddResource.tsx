import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { resourcesAPI, Resource, uploadFile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Loader2, Link as LinkIcon } from "lucide-react";

export default function AddResource() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    tags: [] as string[],
    images: [] as string[],
    files: [] as string[],
  });
  const [currentTag, setCurrentTag] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [externalLink, setExternalLink] = useState("");

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

  const handleAddTag = () => {
    if (currentTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a resource title before uploading files",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingImage(true);
    try {
      let counter = formData.images.length + 1;
      for (const file of Array.from(files)) {
        const url = await uploadFile(file, formData.title, counter);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, url],
        }));
        toast({ title: "Image uploaded successfully" });
        counter++;
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  // Add an external link (YouTube, Drive PDF, image, etc.) to files list
  const handleAddExternalLink = () => {
    const url = externalLink.trim();
    if (!url) return;
    try {
      new URL(url);
    } catch {
      toast({ title: "Invalid URL", description: "Please paste a valid link", variant: "destructive" });
      return;
    }
    setFormData((prev) => ({ ...prev, files: [...prev.files, url] }));
    setExternalLink("");
    toast({ title: "Link added" });
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
    setIsUploadingImage(true);

    try {
      await resourcesAPI.create({
        title: formData.title,
        description: formData.description,
        longDescription: formData.longDescription,
        tags: formData.tags,
        images: formData.images,
        files: formData.files,
      });

      toast({
        title: "Success",
        description: "Resource created successfully!",
      });

      setFormData({
        title: "",
        description: "",
        longDescription: "",
        tags: [],
        images: [],
        files: [],
      });
      fetchResources();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create resource",
        variant: "destructive",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const fetchResources = async () => {
    try {
      const data = await resourcesAPI.getAll();
      setResources(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch resources",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await resourcesAPI.delete(id);
      toast({
        title: "Success",
        description: "Resource deleted successfully!",
      });
      fetchResources();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resource",
        variant: "destructive",
      });
    }
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
          <h1 className="text-3xl font-bold mb-2">Manage Resources</h1>
          <p className="text-muted-foreground">
            Create and manage learning resources
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="overflow-y-auto max-h-[90vh]">
              <CardHeader>
                <CardTitle>Add Resource</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Resource title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="longDescription">Long Description</Label>
                    <Textarea
                      id="longDescription"
                      name="longDescription"
                      placeholder="Detailed description"
                      value={formData.longDescription}
                      onChange={handleInputChange}
                      required
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        id="tags"
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      />
                      <Button type="button" onClick={handleAddTag} size="sm">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(idx)}
                            className="ml-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Upload Images</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={imageInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={isUploadingImage}
                        className="w-full"
                      >
                        {isUploadingImage ? (
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
                      <div className="mt-2 space-y-2">
                        {formData.images.map((img, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
                            <img src={img} alt="" className="w-10 h-10 object-cover rounded" />
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
                    <Label>Links (YouTube, Google Drive PDF, Images, etc.)</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Paste a link (e.g., https://youtu.be/..., https://drive.google.com/...)"
                        value={externalLink}
                        onChange={(e) => setExternalLink(e.target.value)}
                      />
                      <Button type="button" onClick={handleAddExternalLink}>
                        <LinkIcon className="w-4 h-4 mr-2" /> Add
                      </Button>
                    </div>
                    {formData.files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded">
                            <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">Link</span>
                            <a href={file} target="_blank" rel="noreferrer" className="text-sm flex-1 truncate hover:underline">
                              {file}
                            </a>
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-6 w-6 p-0 text-destructive">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">File upload disabled. Use links instead.</p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isUploadingImage || isUploadingFile}>
                    {isUploadingImage ? "Creating..." : "Create Resource"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <button
                  onClick={fetchResources}
                  className="text-blue-500 hover:underline mb-4 text-sm"
                >
                  Refresh List
                </button>
                <div className="space-y-3">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="p-4 border rounded-lg hover:bg-secondary/50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {resource.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {resource.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {resource.images.length > 0 && (
                            <div className="flex gap-2 mt-2 flex-wrap">
                              {resource.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`Resource ${idx}`}
                                  className="h-12 w-12 object-cover rounded"
                                />
                              ))}
                            </div>
                          )}
                          {resource.files.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-muted-foreground mb-1">Files:</p>
                              <div className="flex flex-wrap gap-1">
                                {resource.files.map((file, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs"
                                  >
                                    File {idx + 1}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(resource.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(resource.timestamp).toLocaleString()}
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
