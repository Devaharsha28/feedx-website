import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { testimonialsAPI, Testimonial, uploadFile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Loader2 } from "lucide-react";

export default function AddTestimonial() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    content: "",
    image: "",
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const url = await uploadFile(files[0]);
      setFormData((prev) => ({ ...prev, image: url }));
      toast({ title: "Image uploaded successfully" });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await testimonialsAPI.create({
        name: formData.name,
        title: formData.title,
        content: formData.content,
        image: formData.image,
      });

      toast({
        title: "Success",
        description: "Testimonial created successfully!",
      });

      setFormData({
        name: "",
        title: "",
        content: "",
        image: "",
      });
      fetchTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create testimonial",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsAPI.getAll();
      setTestimonials(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await testimonialsAPI.delete(id);
      toast({
        title: "Success",
        description: "Testimonial deleted successfully!",
      });
      fetchTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
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
          <h1 className="text-3xl font-bold mb-2">Manage Testimonials</h1>
          <p className="text-muted-foreground">
            Add and manage user testimonials and reviews
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Add Testimonial</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Person Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="title">Title/Position</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., Student, Faculty, Developer"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Testimonial Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="What do you think about FeedX Nexus?"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Profile Image</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
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
                            Choose Image
                          </>
                        )}
                      </Button>
                    </div>
                    {formData.image && (
                      <div className="mt-2 relative w-32 mx-auto">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="h-32 w-32 object-cover rounded-full"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-1 -right-1 h-6 w-6 p-0 rounded-full"
                          onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || isUploading}>
                    {isLoading ? "Creating..." : "Create Testimonial"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <button
                  onClick={fetchTestimonials}
                  className="text-blue-500 hover:underline mb-4 text-sm"
                >
                  Refresh List
                </button>
                <div className="space-y-3">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="p-4 border rounded-lg hover:bg-secondary/50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {testimonial.image && (
                              <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="h-10 w-10 object-cover rounded-full"
                              />
                            )}
                            <div>
                              <h3 className="font-semibold">{testimonial.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.title}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground italic">
                            "{testimonial.content}"
                          </p>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(testimonial.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(testimonial.timestamp).toLocaleString()}
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
