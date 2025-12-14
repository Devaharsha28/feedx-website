import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resourcesAPI, Resource } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Download, ArrowLeft } from "lucide-react";

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        if (id) {
          const data = await resourcesAPI.getById(id);
          setResource(data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch resource details",
          variant: "destructive",
        });
        navigate("/resources");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResource();
  }, [id, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
          <p className="text-muted-foreground">Loading resource details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
            <Button onClick={() => navigate("/resources")}>Back to Resources</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/resources")}
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>
            
            {resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <p className="text-lg text-muted-foreground mb-4">
              {resource.description}
            </p>

            <p className="text-sm text-muted-foreground">
              Added on {new Date(resource.timestamp).toLocaleDateString()}
            </p>
          </div>

          {/* Images */}
          {resource.images.length > 0 && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Images</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resource.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Resource ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => window.open(image, "_blank")}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Long Description */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {resource.longDescription}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Files */}
          {resource.files.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Available Files</h2>
                <div className="space-y-3">
                  {resource.files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">
                          File {idx + 1}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleDownloadFile(file, `resource-file-${idx + 1}`)
                        }
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
