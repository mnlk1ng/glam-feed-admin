
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, User, Settings, ExternalLink, Calendar, Sparkles } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ProfessionalFeed from "@/components/ProfessionalFeed";
import AdminPanel from "@/components/AdminPanel";
import { useAuth } from "@/hooks/useAuth";
import { useSupabaseData } from "@/hooks/useSupabaseData";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState("home");
  const { services, posts, appSettings, loading } = useSupabaseData();

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

  // Se o usuário está logado, mostrar painel admin
  if (user) {
    return <AdminPanel />;
  }

  // Se ainda está carregando autenticação
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "feed":
        return <ProfessionalFeed posts={posts} />;
      default:
        return (
          <div className="space-y-12">
            {appSettings && (
              <HeroSection 
                heroImage={appSettings.hero_image_url}
                title={appSettings.title}
                subtitle={appSettings.subtitle}
                badge={appSettings.badge}
                primaryButtonText={appSettings.primary_button_text}
                secondaryButtonText={appSettings.secondary_button_text}
                primaryButtonColor={appSettings.primary_button_color}
                onPrimaryClick={handlePrimaryButtonClick}
                onSecondaryClick={handleSecondaryButtonClick}
              />
            )}
            
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
                  {services.filter(service => service.status === 'Ativo').map((service) => (
                    <Card 
                      key={service.id} 
                      className="bg-gray-900/60 border-purple-500/20 hover:border-pink-500/50 transition-all duration-500 group cursor-pointer shadow-2xl hover:shadow-purple-500/20 backdrop-blur-xl overflow-hidden"
                      onClick={() => handleLinkClick(service.url)}
                    >
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          {service.image_url && (
                            <img 
                              src={service.image_url} 
                              alt={service.title}
                              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
                          
                          <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-3 mb-4">
                              <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold">
                                {service.category}
                              </Badge>
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                                {service.price}
                              </Badge>
                            </div>
                            <h3 className="text-white font-bold text-xl mb-2 group-hover:text-pink-300 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {service.description}
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
                  <Button 
                    className={`${appSettings?.primary_button_color || 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'} text-white px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300`}
                    onClick={handlePrimaryButtonClick}
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    {appSettings?.primary_button_text || 'Agendar Consulta Gratuita'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-white/80 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-2xl"
                    onClick={() => setActiveSection("feed")}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    {appSettings?.secondary_button_text || 'Ver Transformações Reais'}
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
