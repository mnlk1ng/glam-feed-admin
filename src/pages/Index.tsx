
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Home, User, Settings, ExternalLink } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProfessionalFeed from "@/components/ProfessionalFeed";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [appSettings, setAppSettings] = useState({
    heroImage: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
    title: "PRISCILA ZILLO",
    subtitle: "Ganhe dinheiro com suas habilidades digitais. Transforme seu conhecimento em renda.",
    badge: "LANÇADORA DIGITAL",
    primaryButtonText: "♡ Meus links",
    secondaryButtonText: "⊙ Saber mais",
    primaryButtonColor: "bg-pink-500 hover:bg-pink-600"
  });

  const myLinks = [
    {
      id: 1,
      title: "PORTFÓLIO DIGITAL",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      description: "Veja meus trabalhos de design",
      url: "https://portfolio.example.com",
      category: "Design"
    },
    {
      id: 2,
      title: "CONSULTORIA 1:1",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
      description: "Agendar uma sessão personalizada",
      url: "https://calendly.com/exemplo",
      category: "Serviços"
    },
    {
      id: 3,
      title: "CURSO DIGITAL",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&h=600&fit=crop",
      description: "Aprenda design digital do zero",
      url: "https://curso.example.com",
      category: "Educação"
    },
    {
      id: 4,
      title: "INSTAGRAM",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=600&fit=crop",
      description: "Siga meu dia a dia criativo",
      url: "https://instagram.com/exemplo",
      category: "Social"
    }
  ];

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderContent = () => {
    switch (activeSection) {
      case "feed":
        return <ProfessionalFeed />;
      case "admin":
        return <AdminPanel appSettings={appSettings} setAppSettings={setAppSettings} />;
      default:
        return (
          <div className="space-y-8">
            <HeroSection {...appSettings} />
            
            {/* Meus Links */}
            <section className="px-4 md:px-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Meus Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {myLinks.map((link) => (
                  <Card 
                    key={link.id} 
                    className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 group cursor-pointer"
                    onClick={() => handleLinkClick(link.url)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={link.image} 
                          alt={link.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge className="bg-pink-500 text-white mb-2">{link.category}</Badge>
                          <h3 className="text-white font-bold text-lg mb-1">{link.title}</h3>
                          <p className="text-gray-300 text-sm">{link.description}</p>
                        </div>
                        <Button 
                          size="sm" 
                          className="absolute top-4 right-4 bg-pink-500 hover:bg-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Categorias */}
            <section className="px-4 md:px-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Categorias</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {["Design", "Serviços", "Educação", "Social"].map((category) => (
                  <Button 
                    key={category}
                    variant="outline" 
                    className="border-pink-500/30 text-pink-300 hover:bg-pink-500/20 hover:border-pink-500"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-gray-800 z-50">
        <div className="flex justify-around items-center py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection("home")}
            className={`flex flex-col items-center gap-1 ${
              activeSection === "home" ? "text-pink-400" : "text-gray-400"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Início</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection("feed")}
            className={`flex flex-col items-center gap-1 ${
              activeSection === "feed" ? "text-pink-400" : "text-gray-400"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Feed</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection("admin")}
            className={`flex flex-col items-center gap-1 ${
              activeSection === "admin" ? "text-pink-400" : "text-gray-400"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Admin</span>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
