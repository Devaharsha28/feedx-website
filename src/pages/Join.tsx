import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Mail, Phone, MapPin, Clock, CheckCircle, Star, Award, Heart } from 'lucide-react';
import { useState } from 'react';
import GlassmorphismBackground from '@/components/GlassmorphismBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Join = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    semester: '',
    branch: '',
    college: '',
    interests: [] as string[],
    message: '',
    newsletter: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Connect with fellow students and get help from seniors and alumni"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Exclusive Resources",
      description: "Access to study materials, project guides, and career resources"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Skill Development",
      description: "Workshops, webinars, and training programs for career growth"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Networking Opportunities",
      description: "Connect with industry professionals and potential employers"
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "join@feedxpolytechnic.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 98765 43210",
      description: "Call us during office hours"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Address",
      value: "FEEDX Polytechnic, Hyderabad",
      description: "Visit our campus"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Office Hours",
      value: "Mon-Fri: 9AM-6PM",
      description: "We're here to help"
    }
  ];

  const interestOptions = [
    "Job Alerts",
    "Study Materials",
    "Project Guidance",
    "Career Counseling",
    "Skill Development",
    "Networking Events",
    "Mentorship Program",
    "Industry Updates"
  ];

  return (
    <GlassmorphismBackground intensity="light" className="bg-gradient-flow">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-20 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-slide-up">
              Join <span className="text-gradient">FEEDX</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Become part of Telangana's largest polytechnic student community
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Join FEEDX?</CardTitle>
                <CardDescription>
                  Discover the benefits of being part of our community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="text-primary mt-1">{benefit.icon}</div>
                    <div>
                      <h4 className="font-medium mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-primary mt-1">{contact.icon}</div>
                    <div>
                      <div className="font-medium text-sm">{contact.label}</div>
                      <div className="text-sm">{contact.value}</div>
                      <div className="text-xs text-muted-foreground">{contact.description}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Join Form */}
          <div className="lg:col-span-2">
            {!submitted ? (
              <Card>
                <CardHeader>
                  <CardTitle>Membership Application</CardTitle>
                  <CardDescription>
                    Fill out the form below to join our community. All fields marked with * are required.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    {/* Academic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Academic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="semester">Semester *</Label>
                          <Select value={formData.semester} onValueChange={(value) => setFormData({...formData, semester: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1st Semester</SelectItem>
                              <SelectItem value="2">2nd Semester</SelectItem>
                              <SelectItem value="3">3rd Semester</SelectItem>
                              <SelectItem value="4">4th Semester</SelectItem>
                              <SelectItem value="5">5th Semester</SelectItem>
                              <SelectItem value="6">6th Semester</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branch">Branch *</Label>
                          <Select value={formData.branch} onValueChange={(value) => setFormData({...formData, branch: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select branch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="civil">Civil Engineering</SelectItem>
                              <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                              <SelectItem value="electrical">Electrical Engineering</SelectItem>
                              <SelectItem value="electronics">Electronics Engineering</SelectItem>
                              <SelectItem value="computer">Computer Engineering</SelectItem>
                              <SelectItem value="automobile">Automobile Engineering</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="college">College Name *</Label>
                        <Input
                          id="college"
                          value={formData.college}
                          onChange={(e) => setFormData({...formData, college: e.target.value})}
                          placeholder="Enter your college name"
                          required
                        />
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Areas of Interest</h3>
                      <p className="text-sm text-muted-foreground">Select all that apply</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {interestOptions.map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest}
                              checked={formData.interests.includes(interest)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({...formData, interests: [...formData.interests, interest]});
                                } else {
                                  setFormData({...formData, interests: formData.interests.filter(i => i !== interest)});
                                }
                              }}
                            />
                            <Label htmlFor={interest} className="text-sm">{interest}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us about yourself or any specific requirements..."
                        rows={4}
                      />
                    </div>

                    {/* Newsletter */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => setFormData({...formData, newsletter: checked as boolean})}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        Subscribe to our newsletter for updates and opportunities
                      </Label>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-brand hover:opacity-90 transition-smooth">
                      Join FEEDX Community
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              /* Success Message */
              <Card className="text-center glass-card border-green-500/20">
                <CardContent className="p-12">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600 animate-bounce" />
                  <h2 className="text-2xl font-bold mb-4">Welcome to FEEDX!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for joining our community. We'll review your application and get back to you soon.
                    In the meantime, explore our resources and connect with fellow students.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-brand hover:opacity-90 transition-smooth glow-primary">
                      Explore Resources
                    </Button>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      Join Another Member
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </GlassmorphismBackground>
  );
};

export default Join;