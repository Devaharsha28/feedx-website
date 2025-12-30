import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { eventsAPI, Event, uploadFile } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Loader2, FileText } from "lucide-react";

export default function AddEvent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    registerLink: "",
    image: "",
    status: "upcoming" as "upcoming" | "conducted",
    isComingSoon: false,
    files: [] as string[],
  });
  const imageInputRef = useRef<HTMLInputElement>(null);
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

    setIsUploadingImage(true);
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
      setIsUploadingImage(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploadingFile(true);
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
      setIsUploadingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
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
      await eventsAPI.create({
        title: formData.title,
        description: formData.description,
        date: formData.isComingSoon ? "Coming Soon" : formData.date,
        time: formData.isComingSoon ? "TBA" : formData.time,
        location: formData.location,
        registerLink: formData.registerLink || "#",
        image: formData.image,
        status: formData.status,
        files: formData.files,
      });

      toast({
        title: "Success",
        description: "Event created successfully!",
      });

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        registerLink: "",
        image: "",
        status: "upcoming",
        isComingSoon: false,
        files: [],
      });
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await eventsAPI.getAll();
      setEvents(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch events",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await eventsAPI.delete(id);
      toast({
        title: "Success",
        description: "Event deleted successfully!",
      });
      fetchEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
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
          <h1 className="text-3xl font-bold mb-2">Manage Upcoming Events</h1>
          <p className="text-muted-foreground">
            Create and manage upcoming events and webinars
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Add Event</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Event title"
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
                      placeholder="Event description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2 py-2">
                    <input
                      type="checkbox"
                      id="isComingSoon"
                      checked={formData.isComingSoon}
                      onChange={(e) => setFormData(prev => ({ ...prev, isComingSoon: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="isComingSoon" className="cursor-pointer font-semibold text-primary">
                      ✨ Mark as "Coming Soon"
                    </Label>
                  </div>

                  {!formData.isComingSoon && (
                    <>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          required={!formData.isComingSoon}
                        />
                      </div>

                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          name="time"
                          type="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          required={!formData.isComingSoon}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Event location or Online"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="registerLink">Registration Link</Label>
                    <Input
                      id="registerLink"
                      name="registerLink"
                      type="url"
                      placeholder="https://example.com/register"
                      value={formData.registerLink}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label>Event Status</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        type="button"
                        variant={formData.status === 'upcoming' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setFormData(prev => ({ ...prev, status: 'upcoming' }))}
                      >
                        Upcoming
                      </Button>
                      <Button
                        type="button"
                        variant={formData.status === 'conducted' ? 'default' : 'outline'}
                        className="flex-1"
                        onClick={() => setFormData(prev => ({ ...prev, status: 'conducted' }))}
                      >
                        Conducted
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Event Image</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={imageInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
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
                            Choose Image
                          </>
                        )}
                      </Button>
                    </div>
                    {formData.image && (
                      <div className="mt-2 relative">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="h-32 w-full object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Event Files (PDF, etc.)</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,image/*"
                        multiple
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploadingFile}
                        className="w-full"
                      >
                        {isUploadingFile ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <FileText className="w-4 h-4 mr-2" />
                            Choose Files
                          </>
                        )}
                      </Button>
                    </div>
                    {formData.files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.files.map((file, index) => {
                          const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file);
                          return (
                            <div key={index} className="flex items-center gap-2 p-2 bg-secondary/50 rounded group">
                              {isImage ? (
                                <img src={file} alt="Preview" className="w-8 h-8 object-cover rounded" />
                              ) : (
                                <FileText className="w-4 h-4 text-blue-500" />
                              )}
                              <span className="text-sm flex-1 truncate">{file.split('/').pop()}</span>
                              <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)} className="h-6 w-6 p-0 text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading || isUploadingImage || isUploadingFile}>
                    {isLoading ? "Creating..." : "Create Event"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                <button
                  onClick={fetchEvents}
                  className="text-blue-500 hover:underline mb-4 text-sm"
                >
                  Refresh List
                </button>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border rounded-lg hover:bg-secondary/50 transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{event.title}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase ${event.status === 'upcoming'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                              }`}>
                              {event.status || 'upcoming'}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {event.description}
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs font-medium mb-2">
                            <div className={event.date === "Coming Soon" ? "text-primary animate-pulse" : "text-muted-foreground"}>
                              📅 {event.date}
                            </div>
                            <div className={event.time === "TBA" ? "text-primary italic" : "text-muted-foreground"}>
                              ⏰ {event.time}
                            </div>
                            <div className="col-span-2 text-muted-foreground">📍 {event.location}</div>
                          </div>
                          {event.image && (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="h-12 w-12 object-cover rounded mb-2"
                            />
                          )}
                          {event.files && event.files.length > 0 && (
                            <div className="mb-2">
                              <p className="text-xs text-muted-foreground mb-1">Files:</p>
                              <div className="flex flex-wrap gap-1">
                                {event.files.map((file, idx) => (
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
                          {event.registerLink !== "#" && (
                            <a
                              href={event.registerLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-500 hover:underline"
                            >
                              Registration Link
                            </a>
                          )}
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(event.id)}
                        >
                          Delete
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString()}
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
