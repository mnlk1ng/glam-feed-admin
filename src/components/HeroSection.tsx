
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
}

const HeroSection = ({ 
  heroImage = "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
  title = "PRISCILA ZILLO",
  subtitle = "Ganhe dinheiro com suas habilidades digitais. Transforme seu conhecimento em renda.",
  badge = "LANÇADORA DIGITAL",
  primaryButtonText = "♡ Meus links",
  secondaryButtonText = "⊙ Saber mais",
  primaryButtonColor = "bg-pink-500 hover:bg-pink-600"
}: HeroSectionProps) => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <Badge className="bg-pink-500 text-white mb-4 text-sm px-3 py-1">
          {badge}
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className={`${primaryButtonColor} text-white px-8 py-3 text-lg`}>
            {primaryButtonText}
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-pink-400 text-6xl animate-pulse">
        P
      </div>
      <div className="absolute bottom-32 right-10 text-pink-400 text-4xl animate-bounce">
        +
      </div>
    </section>
  );
};

export default HeroSection;
