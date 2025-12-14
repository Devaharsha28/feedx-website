import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Instagram, MessageCircle, Heart, Star, Award, Youtube } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { joinIllustration } from '@/lib/illustrations';
import { useEffect, useState } from 'react';

const Join = () => {
  const [links, setLinks] = useState<{ whatsappChannel?: string; whatsappCommunity?: string; instagram?: string }>({});
  useEffect(() => {
    fetch('/social-links.json')
      .then((res) => res.json())
      .then((data) => setLinks(data))
      .catch(() => setLinks({}));
  }, []);

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

  const socials = [
    {
      title: 'WhatsApp Channel',
      href: links.whatsappChannel || '#',
      icon: <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-green-600" />,
    },
    {
      title: 'WhatsApp Community',
      href: links.whatsappCommunity || '#',
      icon: <Users className="w-6 h-6 md:w-7 md:h-7 text-emerald-600" />,
    },
    {
      title: 'Instagram Page',
      href: links.instagram || '#',
      icon: <Instagram className="w-6 h-6 md:w-7 md:h-7 text-pink-600" />,
    },
    {
      title: 'YouTube Channel',
      href: 'https://www.youtube.com/@feedx_official',
      icon: <Youtube className="w-6 h-6 md:w-7 md:h-7 text-red-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="border-b border-border bg-white pt-24 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">
              Join FEEDX
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Become part of Telangana's largest polytechnic student community
            </p>
          </div>
          <img src={joinIllustration} alt="Join FEEDX" className="w-full max-w-md" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Social Join Card */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {socials.map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border p-4 bg-card hover:bg-muted transition-smooth"
                  >
                    {s.icon}
                    <span className="font-medium text-sm sm:text-base">{s.title}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section (kept compact) */}
          <Card>
            <CardHeader>
              <CardTitle>Why Join FEEDX?</CardTitle>
              <CardDescription>Discover the benefits of being part of our community</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Join;