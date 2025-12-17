import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { spotlightAPI, Spotlight, uploadFile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Loader2 } from "lucide-react";

export default function AddSpotlight() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [spotlights, setSpotlights] = useState<Spotlight[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: [] as string[],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (fileInputRef.current) fileInputRef.current.value = '';
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
      await spotlightAPI.create({
        title: formData.title,
        description: formData.description,
        images: formData.images,
      });

      toast({
        title: "Success",
        description: "Spotlight created successfully!",
      });

      setFormData({
        title: "",
        description: "",
        images: [],
      });
      fetchSpotlights();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create spotlight",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpotlights = async () => {
    try {
      const data = await spotlightAPI.getAll();
      setSpotlights(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch spotlights",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await spotlightAPI.delete(id);
      toast({
        title: "Success",
        description: "Spotlight deleted successfully!",
      });
      fetchSpotlights();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete spotlight",
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
          <h1 className="text-3xl font-bold mb-2">Manage Spotlight</h1>
          <p className="text-muted-foreground">
            Feature spotlights and success stories
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Add Spotlight</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Spotlight title"
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
                      placeholder="Spotlight description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Upload Images</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
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
                  </div>

                  {formData.images.length > 0 && (
                    <div>
                      <Label>Images Added: {formData.images.length}</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.images.map((img, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={img}
                              alt={`Spotlight ${idx}`}
                              className="h-16 w-16 object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
                    {isLoading ? "Creating..." : "Create Spotlight"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Spotlights</CardTitle>
              </CardHeader>
              <CardContent>
                <button
                  onClick={fetchSpotlights}
                  className="text-blue-500 hover:underline mb-4 text-sm"
                >
                  Refresh List
                </button>
                <div className="space-y-3">
                  {spotlights.map((spotlight) => (
                    <div
                      key={spotlight.id}
                      className="p-4 border rounded-lg hover:bg-secondary/50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{spotlight.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {spotlight.description}
                          </p>
                          {spotlight.images.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold mb-2">
                                Images ({spotlight.images.length}):
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                {spotlight.images.map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt={`Spotlight ${idx}`}
                                    className="h-12 w-12 object-cover rounded"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(spotlight.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(spotlight.timestamp).toLocaleString()}
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
