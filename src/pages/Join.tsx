import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { joinIllustration } from '@/lib/illustrations';
import { useEffect, useState } from 'react';

const Join = () => {
  const [links, setLinks] = useState<{ whatsappChannel?: string; instagram?: string; youtube?: string }>({});
  useEffect(() => {
    fetch('/social-links.json')
      .then((res) => res.json())
      .then((data) => setLinks(data))
      .catch(() => setLinks({}));
  }, []);

  const benefits = [
    {
      icon: <img src="https://cdn.jsdelivr.net/npm/heroicons@2.1.5/24/outline/user-group.svg" alt="Community" className="w-6 h-6" />,
      title: "Community Support",
      description: "Connect with fellow students and get help from seniors and alumni"
    },
    {
      icon: <img src="https://cdn.jsdelivr.net/npm/heroicons@2.1.5/24/outline/trophy.svg" alt="Resources" className="w-6 h-6" />,
      title: "Exclusive Resources",
      description: "Access to study materials, project guides, and career resources"
    },
    {
      icon: <img src="https://cdn.jsdelivr.net/npm/heroicons@2.1.5/24/outline/star.svg" alt="Skill" className="w-6 h-6" />,
      title: "Skill Development",
      description: "Workshops, webinars, and training programs for career growth"
    },
    {
      icon: <img src="https://cdn.jsdelivr.net/npm/heroicons@2.1.5/24/outline/heart.svg" alt="Networking" className="w-6 h-6" />,
      title: "Networking Opportunities",
      description: "Connect with industry professionals and potential employers"
    }
  ];

  const socials = [
    {
      title: 'WhatsApp',
      href: links.whatsappChannel || '#',
      icon: <img src="https://cdn.simpleicons.org/whatsapp/25D366" alt="WhatsApp" className="w-7 h-7" />,
    },
    {
      title: 'Instagram',
      href: links.instagram || '#',
      icon: <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="Instagram" className="w-7 h-7" />,
    },
    {
      title: 'YouTube',
      href: links.youtube || '#',
      icon: <img src="https://cdn.simpleicons.org/youtube/FF0000" alt="YouTube" className="w-7 h-7" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Header */}
      <div className="relative border-b border-border bg-background pt-24 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 opacity-80 blur-2xl" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gradient">
              Join FEEDX
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Become part of Telangana's largest polytechnic student community
            </p>
          </div>
          <img src={joinIllustration} alt="Join FEEDX" className="w-full max-w-md" />
        </div>
        {/* Fix theme for Join Us button (top right) */}
        <style>{`
          .join-us-btn {
            background: linear-gradient(90deg, #2563eb 0%, #9333ea 100%);
            color: #fff !important;
            border: none;
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
            transition: background 0.2s;
          }
          .join-us-btn:hover {
            background: linear-gradient(90deg, #9333ea 0%, #2563eb 100%);
            color: #fff !important;
          }
        `}</style>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Social Join Card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3">
                  <style>{`
                    @media (max-width: 640px) {
                      .join-social-vertical {
                        display: flex;
                        flex-direction: column;
                        gap: 0.75rem;
                      }
                    }
                  `}</style>
                  <div className="join-social-vertical">
                {socials.map((s) => (
                  <a
                    key={s.title}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border p-4 bg-card hover:bg-muted transition-smooth join-us-btn"
                  >
                    {s.icon}
                    <span className="font-medium text-sm sm:text-base">{s.title}</span>
                  </a>
                ))}
                  </div>
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