
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  heroImage?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonColor?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const HeroSection = ({ 
  heroImage = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop&crop=face",
  title = "PRISCILA ZILLO",
  subtitle = "Ganhe dinheiro com suas habilidades digitais. Transforme seu conhecimento em renda.",
  badge = "EXPERT DIGITAL",
  primaryButtonText = "✨ Agendar Consulta",
  secondaryButtonText = "🔥 Ver Transformações",
  primaryButtonColor = "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700",
  onPrimaryClick,
  onSecondaryClick
}: HeroSectionProps) => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Expert Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <Badge className="bg-gradient-to-r from-gold-400 to-yellow-300 text-black font-bold mb-6 text-sm px-4 py-2 shadow-2xl">
          {badge}
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl tracking-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            className={`${primaryButtonColor} text-white px-10 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20`}
            onClick={onPrimaryClick}
          >
            {primaryButtonText}
          </Button>
          <Button 
            variant="outline" 
            className="border-2 border-white/80 text-white hover:bg-white hover:text-black px-10 py-4 text-lg font-semibold backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            onClick={onSecondaryClick}
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>

      {/* Floating Luxury Elements */}
      <div className="absolute top-20 left-10 text-gold-300 text-8xl animate-pulse opacity-30">
        ✨
      </div>
      <div className="absolute bottom-32 right-10 text-pink-300 text-6xl animate-bounce opacity-40">
        💎
      </div>
      <div className="absolute top-1/3 right-20 text-purple-300 text-4xl animate-pulse opacity-20">
        ⭐
      </div>
    </section>
  );
};

export default HeroSection;
