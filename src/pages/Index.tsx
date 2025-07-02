
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Home, User, Settings } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProfessionalFeed from "@/components/ProfessionalFeed";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const featuredServices = [
    {
      id: 1,
      title: "DIGITAL ANIME",
      image: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
      category: "Digital Art",
      featured: true
    },
    {
      id: 2,
      title: "PORTFÓLIO",
      image: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
      category: "Portfolio",
      featured: false
    },
    {
      id: 3,
      title: "TALVEZ VOCÊ GOSTE",
      image: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
      category: "Sugestões",
      featured: false
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "feed":
        return <ProfessionalFeed />;
      case "admin":
        return <AdminPanel />;
      default:
        return (
          <div className="space-y-8">
            <HeroSection />
            
            {/* Featured Services Grid */}
            <section className="px-4 md:px-8">
              <h2 className="text-2xl font-bold text-white mb-6">Serviços em Destaque</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredServices.map((service) => (
                  <Card key={service.id} className="bg-gray-900/50 border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <Badge className="bg-pink-500 text-white mb-2">{service.category}</Badge>
                          <h3 className="text-white font-bold text-lg">{service.title}</h3>
                        </div>
                        <Button 
                          size="sm" 
                          className="absolute top-4 right-4 bg-pink-500 hover:bg-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Categories Section */}
            <section className="px-4 md:px-8">
              <h2 className="text-2xl font-bold text-white mb-6">Categorias</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Emoções", "Casater", "Expert", "Minha Lista"].map((category) => (
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
