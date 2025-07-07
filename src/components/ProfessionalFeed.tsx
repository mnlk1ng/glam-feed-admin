
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Award } from "lucide-react";
import { Post } from '@/hooks/useSupabaseData';

interface ProfessionalFeedProps {
  posts: Post[];
}

const ProfessionalFeed: React.FC<ProfessionalFeedProps> = ({ posts }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 dia atrás';
    if (diffDays < 7) return `${diffDays} dias atrás`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} semanas atrás`;
    return `${Math.ceil(diffDays / 30)} meses atrás`;
  };

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Nenhum post encontrado</h2>
          <p className="text-gray-400">Os posts aparecerão aqui quando forem criados no painel administrativo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Transformações Reais
          </h1>
          <p className="text-gray-400 text-lg">
            Veja os resultados incríveis dos nossos tratamentos estéticos
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Card key={post.id} className="bg-gray-900/60 border-purple-500/20 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-6">
                {/* Header do Post */}
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={post.avatar_url}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{post.author}</h3>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                    {post.category}
                  </Badge>
                </div>

                {/* Título do Post */}
                <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>

                {/* Imagens Antes/Depois */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {post.before_image_url && (
                    <div className="relative group">
                      <img
                        src={post.before_image_url}
                        alt="Antes"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-red-600 text-white">ANTES</Badge>
                      </div>
                    </div>
                  )}
                  
                  {post.after_image_url && (
                    <div className="relative group">
                      <img
                        src={post.after_image_url}
                        alt="Depois"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-green-600 text-white">DEPOIS</Badge>
                      </div>
                    </div>
                  )}
                </div>

                {/* Descrição */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {post.description}
                </p>

                {/* Resultado */}
                {post.results && (
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                    <Award className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Resultado:</span>
                    <span className="text-white">{post.results}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalFeed;
