
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, User, Settings, ExternalLink, Calendar, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProfessionalFeed from "@/components/ProfessionalFeed";
import AdminPanel from "@/components/AdminPanel";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [appSettings, setAppSettings] = useState({
    heroImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&h=800&fit=crop&crop=face",
    title: "PRISCILA ZILLO",
    subtitle: "Transforme sua beleza e autoestima com tratamentos estéticos personalizados. Realce sua beleza natural com técnicas avançadas e cuidado especializado.",
    badge: "EXPERT EM ESTÉTICA",
    primaryButtonText: "✨ Agendar Consulta",
    secondaryButtonText: "🔥 Ver Transformações",
    primaryButtonColor: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Priscila Zillo",
      avatar: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=150&h=150&fit=crop&crop=face",
      title: "Harmonização Facial Completa",
      description: "Transformação incrível com preenchimento labial e contorno facial. A cliente ganhou autoestima e confiança para conquistar seus sonhos! ✨",
      beforeImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=500&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop&crop=face",
      category: "Harmonização Facial",
      timestamp: "2h atrás",
      results: "Autoestima renovada"
    },
    {
      id: 2,
      author: "Priscila Zillo",
      avatar: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=150&h=150&fit=crop&crop=face",
      title: "Limpeza de Pele Profunda",
      description: "Resultado surpreendente! Pele completamente renovada e radiante. Tratamento personalizado que transformou a textura e luminosidade da pele.",
      beforeImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=500&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=500&fit=crop&crop=face",
      category: "Skincare",
      timestamp: "5h atrás",
      results: "Pele renovada"
    }
  ]);

  // Serviços editáveis via admin
  const [myLinks] = useState([
    {
      id: 1,
      title: "HARMONIZAÇÃO FACIAL",
      image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&h=600&fit=crop&crop=face",
      description: "Realce sua beleza natural com preenchimentos e contornos faciais",
      url: "https://calendly.com/harmonizacao",
      category: "Facial",
      price: "R$ 800"
    },
    {
      id: 2,
      title: "LIMPEZA DE PELE PROFUNDA",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&crop=face",
      description: "Tratamento completo para renovação e purificação da pele",
      url: "https://agendamento.com/limpeza",
      category: "Skincare",
      price: "R$ 150"
    },
    {
      id: 3,
      title: "MASSAGEM RELAXANTE",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      description: "Momento de relaxamento e bem-estar para corpo e mente",
      url: "https://booking.com/massagem",
      category: "Bem-estar",
      price: "R$ 200"
    },
    {
      id: 4,
      title: "CONSULTORIA PERSONALIZADA",
      image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&h=600&fit=crop",
      description: "Análise completa e plano de cuidados personalizado",
      url: "https://consultoria.example.com",
      category: "Consultoria",
      price: "R$ 350"
    }
  ]);

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrimaryButtonClick = () => {
    // Scroll to links section or open scheduling
    const linksSection = document.getElementById('meus-links');
    if (linksSection) {
      linksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryButtonClick = () => {
    setActiveSection("feed");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "feed":
        return <ProfessionalFeed posts={posts} />;
      case "admin":
        return <AdminPanel appSettings={appSettings} setAppSettings={setAppSettings} posts={posts} setPosts={setPosts} />;
      default:
        return (
          <div className="space-y-12">
            <HeroSection 
              {...appSettings} 
              onPrimaryClick={handlePrimaryButtonClick}
              onSecondaryClick={handleSecondaryButtonClick}
            />
            
            {/* Meus Serviços */}
            <section id="meus-links" className="px-6 md:px-12 bg-gradient-to-br from-gray-900 via-purple-900/10 to-pink-900/10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Meus Tratamentos
                  </h2>
                  <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Descubra os tratamentos que vão realçar sua beleza natural
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {myLinks.map((link) => (
                    <Card 
                      key={link.id} 
                      className="bg-gray-900/60 border-purple-500/20 hover:border-pink-500/50 transition-all duration-500 group cursor-pointer shadow-2xl hover:shadow-purple-500/20 backdrop-blur-xl overflow-hidden"
                      onClick={() => handleLinkClick(link.url)}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <img 
                            src={link.image} 
                            alt={link.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
                          
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold">
                                {link.category}
                              </Badge>
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                                {link.price}
                              </Badge>
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2 group-hover:text-pink-300 transition-colors">
                              {link.title}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {link.description}
                            </p>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-2xl"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="px-6 md:px-12 py-16 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Pronta para sua <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Transformação?</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Agende sua consulta e descubra como podemos realçar sua beleza natural
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <Calendar className="mr-2 h-5 w-5" />
                    Agendar Consulta Gratuita
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-white/80 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                    onClick={() => setActiveSection("feed")}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Ver Transformações Reais
                  </Button>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-purple-500/20 z-50 shadow-2xl">
        <div className="flex justify-around items-center py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection("home")}
            className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeSection === "home" 
                ? "text-pink-400 bg-pink-500/10 shadow-lg" 
                : "text-gray-400 hover:text-pink-300"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-semibold">Início</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection("feed")}
            className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeSection === "feed" 
                ? "text-purple-400 bg-purple-500/10 shadow-lg" 
                : "text-gray-400 hover:text-purple-300"
            }`}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-xs font-semibold">Feed</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection("admin")}
            className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 ${
              activeSection === "admin" 
                ? "text-blue-400 bg-blue-500/10 shadow-lg" 
                : "text-gray-400 hover:text-blue-300"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs font-semibold">Admin</span>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-24">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
