import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft, MapPin, Building2, Star, MessageSquare, 
  Bookmark, GitCompare, Download, Bell, ChevronRight, ChevronDown, ChevronUp,
  Phone, Mail, Globe, ExternalLink, TrendingUp, Image as ImageIcon
} from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface InstituteData {
  code: string;
  name: string;
  place: string;
  dist: string;
  region: string;
  type: string;
  minority: string;
  mode: string;
  description?: string;
  images?: string[];
  bannerImage?: string;
  logoImage?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  principal?: string;
  established?: string;
  courses?: string[];
  facilities?: string[];
  rating?: number;
  reviews?: number;
}

// Basic institute data
const allInstitutes: InstituteData[] = [
  { code: 'ADBP', name: 'S.G GOVT POLYTECHNIC', place: 'ADILABAD', dist: 'ADB', region: 'OU', type: 'GOV', minority: 'NA', mode: 'COED' },
  { code: 'AITH', name: 'ANNAMACHARYA INST. OF TECHNOLOGY. AND SCI.', place: 'HAYATHNAGAR MANDAL', dist: 'RR', region: 'OU', type: 'PVT', minority: 'NA', mode: 'COED' },
  { code: 'AIZA', name: 'AIZZA COLLEGE OF ENGG AND TECHNOLOGY', place: 'MANCHERIAL', dist: 'MNC', region: 'OU', type: 'PVT', minority: 'MUS', mode: 'COED' },
  { code: 'AKIT', name: 'ABDULKALAM INST. OF TECHNOLOGY AND SCI.', place: 'KOTHAGUDEM', dist: 'KGM', region: 'OU', type: 'PVT', minority: 'NA', mode: 'COED' },
  { code: 'ANRK', name: 'ANURAG ENGINNERING COLLGE', place: 'KODAD', dist: 'SRP', region: 'OU', type: 'PVT', minority: 'NA', mode: 'COED' },
  { code: 'ARJN', name: 'ARJUN COLLEGE OF TECHNOLOGY AND SCIENCE', place: 'BATASINGARAM', dist: 'RR', region: 'OU', type: 'PVT', minority: 'NA', mode: 'COED' },
  { code: 'ASRA', name: 'AVANTHIS SCIENTIFIC TECH AND RESEARCH ACADEMY', place: 'HAYATHNAGAR', dist: 'RR', region: 'OU', type: 'PVT', minority: 'NA', mode: 'COED' },
  { code: 'BLMP', name: 'GOVT POLYTECHNIC', place: 'BELLAMPALLI', dist: 'MNC', region: 'OU', type: 'GOV', minority: 'NA', mode: 'COED' },
  { code: 'BOMA', name: 'BOMMA INST. OF TECHNOLOGY AND SCI.', place: 'KHAMMAM', dist: 'KHM', region: 'OU', type: 'PVT', minority: 'NA', mode: 'COED' },
  { code: 'JNGP', name: 'J N GOVT POLYTECHNIC', place: 'RAMANTHAPUR', dist: 'MDL', region: 'OU', type: 'GOV', minority: 'NA', mode: 'COED' },
  { code: 'MASB', name: 'GOVT POLYTECHNIC', place: 'MASAB TANK', dist: 'HYD', region: 'OU', type: 'GOV', minority: 'NA', mode: 'COED' },
  { code: 'NZBD', name: 'GOVT POLYTECHNIC', place: 'NIZAMABAD', dist: 'NZB', region: 'OU', type: 'GOV', minority: 'NA', mode: 'COED' },
  { code: 'NALG', name: 'GOVT POLYTECHNIC', place: 'NALGONDA', dist: 'NLG', region: 'OU', type: 'GOV', minority: 'NA', mode: 'COED' },
  { code: 'IOES', name: 'GOVT INSTITUTE OF ELECTRONICS', place: 'SECUNDERABAD', dist: 'HYD', region: 'OU', type: 'GOV', minority: 'NA', mode: 'COED', established: '1981' },
  { code: 'IOEPH', name: 'GOVT INSTITUTE OF ELECTRONICS', place: 'SECUNDERABAD', dist: 'HYD', region: 'OU', type: 'GOV', minority: 'NA', mode: 'COED', established: '1981' },
];

// Default placeholder images
const defaultBanner = "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop";
const defaultLogo = "https://cdn-icons-png.flaticon.com/512/3914/3914158.png";

export default function InstituteDetail() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [institute, setInstitute] = useState<InstituteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    whatsNew: true,
    tableOfContents: true,
    highlights: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const fetchInstitute = async () => {
      try {
        const response = await fetch(`/api/admin/institutes/${code}`);
        if (response.ok) {
          const data = await response.json();
          setInstitute(data);
        } else {
          const upperCode = code?.toUpperCase() || '';
          const basic = allInstitutes.find(i => i.code.toUpperCase() === upperCode);
          if (basic) {
            setInstitute(basic);
          }
        }
      } catch (error) {
        const upperCode = code?.toUpperCase() || '';
        const basic = allInstitutes.find(i => i.code.toUpperCase() === upperCode);
        if (basic) {
          setInstitute(basic);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (code) {
      fetchInstitute();
    }
  }, [code]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading institute details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-24">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Institute Not Found</h1>
            <p className="text-gray-600 mb-6">The institute code "{code}" was not found in our records.</p>
            <Button onClick={() => navigate("/institute-profile")} className="bg-blue-600 hover:bg-blue-700">
              Back to Institute Directory
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const typeLabel = institute.type === 'GOV' ? 'Government' : 'Private';
  const modeLabel = institute.mode === 'COED' ? 'Co-Education' : institute.mode === 'GIRLS' ? 'Women Only' : 'Men Only';
  const rating = institute.rating || 4.2;
  const reviews = institute.reviews || 84;
  const established = institute.established || '1990';

  // Table of contents items
  const tocItems = [
    { id: 'highlights', label: `${institute.name} Highlights 2025` },
    { id: 'programs', label: `${institute.code} Popular programs` },
    { id: 'admission', label: `${institute.code} Admission process` },
    { id: 'reviews', label: `${institute.code} Student Reviews` },
    { id: 'placements', label: `${institute.code} Placements 2025` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-16">
        {/* Hero Banner - Shiksha Style */}
        <div className="relative bg-white shadow-sm">
          {/* Banner Image */}
          <div className="relative h-40 sm:h-48 overflow-hidden">
            <img
              src={institute.bannerImage || defaultBanner}
              alt={`${institute.name} campus`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Photo count badge */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span>{institute.images?.length || 2} Photos</span>
            </div>
          </div>

          {/* Institute Info Card */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-16 sm:-mt-20 pb-6">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                {/* Logo */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-xl shadow-lg border border-gray-200 p-2 flex items-center justify-center shrink-0">
                  <img
                    src={institute.logoImage || defaultLogo}
                    alt={`${institute.code} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 pt-2 sm:pt-8">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-2">
                    {institute.name}: Courses, Fees, Admission 2025, Reviews, Info
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {institute.place}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{rating}</span>/5
                      <span className="text-blue-600 hover:underline cursor-pointer">({reviews} Reviews)</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <span className="text-blue-600 hover:underline cursor-pointer">1 Student Q&A</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {typeLabel} Institute
                    </span>
                    <span className="text-gray-500 text-sm">Estd. {established}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto sm:pt-8">
                  <Button variant="outline" className="flex items-center gap-2 border-gray-300 hover:bg-gray-50">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 border-gray-300 hover:bg-gray-50">
                    <GitCompare className="w-4 h-4" />
                    Compare
                  </Button>
                  <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="w-4 h-4" />
                    Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs - Shiksha Style */}
          <div className="border-t border-gray-200 bg-white sticky top-16 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollArea className="w-full">
                <div className="flex gap-0 min-w-max">
                  {['College Info', 'Courses', 'Fees', 'Reviews', 'Placements', 'Cut-Offs', 'Gallery', 'Infrastructure', 'Faculty', 'Compare', 'Q&A'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase().replace(/[^a-z]/g, ''))}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                        activeTab === tab.toLowerCase().replace(/[^a-z]/g, '')
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* What's New Section */}
              <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('whatsNew')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{institute.code}</p>
                      <h2 className="text-lg font-semibold text-gray-900">What's new?</h2>
                    </div>
                  </div>
                  {expandedSections.whatsNew ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {expandedSections.whatsNew && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 mb-4">
                      Get all the latest information regarding {institute.name} Courses, Fees, Eligibility, Admission, Rankings and Reviews on this page.
                    </p>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Keep Me Notified
                    </Button>
                  </CardContent>
                )}
              </Card>

              {/* Table of Contents */}
              <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleSection('tableOfContents')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">{institute.code} Overview</p>
                    <h2 className="text-lg font-semibold text-gray-900">Table of contents</h2>
                  </div>
                  {expandedSections.tableOfContents ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {expandedSections.tableOfContents && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <ul className="space-y-2">
                      {tocItems.map((item) => (
                        <li key={item.id}>
                          <a href={`#${item.id}`} className="text-blue-600 hover:text-blue-800 hover:underline text-sm">
                            {item.label}
                          </a>
                        </li>
                      ))}
                      <li>
                        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                          + 7 more items
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </li>
                    </ul>
                  </CardContent>
                )}
              </Card>

              {/* Highlights Section */}
              <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden" id="highlights">
                <button
                  onClick={() => toggleSection('highlights')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-lg font-semibold text-gray-900">{institute.name} Highlights 2025</h2>
                  {expandedSections.highlights ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                
                {expandedSections.highlights && (
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 mb-6">
                      Established in {established}, {institute.name} is located in {institute.place}, Telangana. The institute offers diploma programs in various engineering and technology streams.
                    </p>
                    
                    {/* Quick Info Table */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700 w-1/3">Institute Code</td>
                            <td className="px-4 py-3 text-gray-900">{institute.code}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Type</td>
                            <td className="px-4 py-3 text-gray-900">{typeLabel}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Location</td>
                            <td className="px-4 py-3 text-gray-900">{institute.place}, {institute.dist}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Region</td>
                            <td className="px-4 py-3 text-gray-900">{institute.region}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Mode</td>
                            <td className="px-4 py-3 text-gray-900">{modeLabel}</td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Established</td>
                            <td className="px-4 py-3 text-gray-900">{established}</td>
                          </tr>
                          {institute.minority !== 'NA' && (
                            <tr className="border-b border-gray-200">
                              <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Minority Status</td>
                              <td className="px-4 py-3 text-gray-900">{institute.minority}</td>
                            </tr>
                          )}
                          {institute.principal && (
                            <tr>
                              <td className="px-4 py-3 bg-gray-50 font-medium text-gray-700">Principal</td>
                              <td className="px-4 py-3 text-gray-900">{institute.principal}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Contact Info */}
                    {(institute.phone || institute.email || institute.website) && (
                      <div className="mt-6 space-y-3">
                        <h3 className="font-semibold text-gray-900">Contact Information</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {institute.phone && (
                            <a href={`tel:${institute.phone}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                              <Phone className="w-4 h-4" />
                              {institute.phone}
                            </a>
                          )}
                          {institute.email && (
                            <a href={`mailto:${institute.email}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                              <Mail className="w-4 h-4" />
                              {institute.email}
                            </a>
                          )}
                          {institute.website && (
                            <a href={institute.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                              <Globe className="w-4 h-4" />
                              Visit Website
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Courses */}
                    {institute.courses && institute.courses.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Courses Offered</h3>
                        <div className="flex flex-wrap gap-2">
                          {institute.courses.map((course, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Facilities */}
                    {institute.facilities && institute.facilities.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {institute.facilities.map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              {facility}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Campus Gallery */}
              <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{institute.code}</p>
                      <h3 className="font-semibold text-gray-900">Take a look at Campus</h3>
                    </div>
                  </div>
                  
                  {institute.images && institute.images.length > 0 ? (
                    <Carousel className="w-full">
                      <CarouselContent>
                        {institute.images.map((img, idx) => (
                          <CarouselItem key={idx}>
                            <div className="relative rounded-lg overflow-hidden">
                              <img
                                src={img}
                                alt={`Campus ${idx + 1}`}
                                className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => window.open(img, "_blank")}
                              />
                              <span className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                {idx === 0 ? 'Entrance' : `View ${idx + 1}`}
                              </span>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={defaultBanner}
                        alt="Campus"
                        className="w-full h-48 object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Entrance
                      </span>
                    </div>
                  )}
                  
                  <button className="w-full mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium text-right">
                    View All →
                  </button>
                </CardContent>
              </Card>

              {/* News & Updates */}
              <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{institute.code}</p>
                      <h3 className="font-semibold text-gray-900">News & Updates</h3>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-2 mb-4">
                    <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      Latest
                    </button>
                    <button className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-full text-sm">
                      Popular
                    </button>
                  </div>

                  {/* News Items */}
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm leading-tight block mb-1">
                        TS POLYCET 2026: Notification, Registration, Syllabus, Pattern, Important Dates
                      </a>
                      <p className="text-xs text-gray-500">Samridhi Mishra · Dec 10, 2025</p>
                      <p className="text-xs text-gray-400">11.9K views</p>
                    </div>
                    <div>
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-sm leading-tight block mb-1">
                        TS POLYCET Counselling 2025: Seat Allotment (OUT), Internal Sliding Ongoing, Dates
                      </a>
                      <p className="text-xs text-gray-500">Samridhi Mishra · Nov 16, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                      <span>Admission Process</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                      <span>Fee Structure</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                      <span>Placement Records</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                    <a href="#" className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 transition-colors">
                      <span>Student Reviews</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/institute-profile")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Institute Directory
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
