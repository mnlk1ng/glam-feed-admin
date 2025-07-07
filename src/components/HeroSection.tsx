
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sparkles } from "lucide-react";

interface HeroSectionProps {
  heroImage: string;
  title: string;
  subtitle: string;
  badge: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonColor: string;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heroImage,
  title,
  subtitle,
  badge,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonColor,
  onPrimaryClick,
  onSecondaryClick
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <Badge className="mb-6 px-6 py-2 text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-2xl">
          {badge}
        </Badge>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className={`${primaryButtonColor} text-white px-8 py-4 text-lg font-bold shadow-2xl transform hover:scale-105 transition-all duration-300`}
            onClick={onPrimaryClick}
          >
            <Calendar className="mr-2 h-5 w-5" />
            {primaryButtonText}
          </Button>
          
          <Button 
            size="lg"
            variant="outline" 
            className="border-2 border-white/80 text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-bold backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            onClick={onSecondaryClick}
          >
            <Sparkles className="mr-2 h-5 w-5" />
            {secondaryButtonText}
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500" />
    </section>
  );
};

export default HeroSection;
