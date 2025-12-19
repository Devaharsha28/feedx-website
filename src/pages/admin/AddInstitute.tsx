import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X, Plus, Save, Building2, Loader2 } from "lucide-react";
import { uploadFile } from "@/lib/api";

interface InstituteFormData {
  code: string;
  name: string;
  place: string;
  dist: string;
  region: string;
  type: string;
  minority: string;
  mode: string;
  description: string;
  images: string[];
  address: string;
  phone: string;
  email: string;
  website: string;
  principal: string;
  courses: string[];
  facilities: string[];
}

const initialFormData: InstituteFormData = {
  code: "",
  name: "",
  place: "",
  dist: "",
  region: "OU",
  type: "PVT",
  minority: "NA",
  mode: "COED",
  description: "",
  images: [],
  address: "",
  phone: "",
  email: "",
  website: "",
  principal: "",
  courses: [],
  facilities: [],
};

export default function AddInstitute() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<InstituteFormData>(initialFormData);
  const [existingInstitutes, setExistingInstitutes] = useState<InstituteFormData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [courseInput, setCourseInput] = useState("");
  const [facilityInput, setFacilityInput] = useState("");

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Fetch existing institutes
  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch("/api/admin/institutes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setExistingInstitutes(data);
        }
      } catch (error) {
        console.error("Failed to fetch institutes:", error);
      }
    };
    fetchInstitutes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setIsUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadFile(files[i], "images", i);
        uploadedUrls.push(url);
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      toast({ title: "Images uploaded successfully" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addCourse = () => {
    if (courseInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        courses: [...prev.courses, courseInput.trim()],
      }));
      setCourseInput("");
    }
  };

  const removeCourse = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  const addFacility = () => {
    if (facilityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        facilities: [...prev.facilities, facilityInput.trim()],
      }));
      setFacilityInput("");
    }
  };

  const removeFacility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code) {
      toast({ title: "College code is required", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/institutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save institute");
      }

      toast({ title: "Institute saved successfully!" });
      setFormData(initialFormData);

      // Refresh list
      const listResponse = await fetch("/api/admin/institutes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (listResponse.ok) {
        setExistingInstitutes(await listResponse.json());
      }
    } catch (error) {
      toast({
        title: "Failed to save institute",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadInstitute = (inst: InstituteFormData) => {
    setFormData(inst);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteInstitute = async (code: string) => {
    if (!confirm(`Delete institute ${code}?`)) return;

    try {
      const response = await fetch(`/api/admin/institutes/${code}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete");

      toast({ title: "Institute deleted" });
      setExistingInstitutes((prev) => prev.filter((i) => i.code !== code));
    } catch (error) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <Button variant="ghost" onClick={() => navigate("/admin")} className="mb-6 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Admin
        </Button>

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Form */}
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Add/Edit Institute Profile
              </CardTitle>
              <CardDescription>
                Enter the college code and add details. This info will be shown on the institute detail page.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="code">College Code *</Label>
                    <Input
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="e.g., JNGP"
                      className="uppercase"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Institute Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full institute name"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="place">Place</Label>
                    <Input id="place" name="place" value={formData.place} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dist">District Code</Label>
                    <Input id="dist" name="dist" value={formData.dist} onChange={handleChange} placeholder="e.g., HYD" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input id="region" name="region" value={formData.region} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <select id="type" name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-input bg-background">
                      <option value="GOV">Government</option>
                      <option value="PVT">Private</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mode">Mode</Label>
                    <select id="mode" name="mode" value={formData.mode} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-input bg-background">
                      <option value="COED">Co-Education</option>
                      <option value="GIRLS">Women Only</option>
                      <option value="BOYS">Men Only</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minority">Minority</Label>
                    <Input id="minority" name="minority" value={formData.minority} onChange={handleChange} placeholder="NA, MUS, CHR, etc." />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description about the institute..."
                    rows={4}
                  />
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Contact Information</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="principal">Principal Name</Label>
                      <Input id="principal" name="principal" value={formData.principal} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" name="website" value={formData.website} onChange={handleChange} placeholder="https://" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} />
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Campus Images</h3>
                  <div className="flex flex-wrap gap-3">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Campus ${idx + 1}`} className="w-24 h-24 object-cover rounded-lg border border-white/10" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <label className="w-24 h-24 flex flex-col items-center justify-center border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-primary transition">
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground mt-1">Add</span>
                        </>
                      )}
                      <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                    </label>
                  </div>
                </div>

                {/* Courses */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Courses Offered</h3>
                  <div className="flex gap-2">
                    <Input
                      value={courseInput}
                      onChange={(e) => setCourseInput(e.target.value)}
                      placeholder="e.g., Computer Engineering"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCourse())}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={addCourse}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.courses.map((course, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2">
                        {course}
                        <button type="button" onClick={() => removeCourse(idx)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Facilities</h3>
                  <div className="flex gap-2">
                    <Input
                      value={facilityInput}
                      onChange={(e) => setFacilityInput(e.target.value)}
                      placeholder="e.g., Library, Sports Ground"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFacility())}
                    />
                    <Button type="button" variant="outline" size="icon" onClick={addFacility}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.facilities.map((facility, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm flex items-center gap-2">
                        {facility}
                        <button type="button" onClick={() => removeFacility(idx)}>
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-brand" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Institute
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Institutes */}
          <Card className="glass-card border-white/10 h-fit">
            <CardHeader>
              <CardTitle>Saved Institutes</CardTitle>
              <CardDescription>{existingInstitutes.length} institute(s) with extended info</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto">
              {existingInstitutes.length === 0 ? (
                <p className="text-muted-foreground text-sm">No institutes with extended info yet.</p>
              ) : (
                existingInstitutes.map((inst) => (
                  <div key={inst.code} className="flex items-center justify-between p-3 rounded-lg border border-white/10 hover:bg-white/5 transition">
                    <div>
                      <p className="font-semibold text-primary">{inst.code}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[150px]">{inst.name || "No name"}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/admin/institutes/${inst.code}`)}>
                        Manage
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => loadInstitute(inst)}>
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteInstitute(inst.code)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
