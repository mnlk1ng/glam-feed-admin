
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

const ProfessionalFeed = () => {
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
      author: "Dra. Ana Silva",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      title: "Limpeza de Pele Profunda",
      description: "Resultado surpreendente! Pele completamente renovada e radiante. Tratamento personalizado que transformou a textura e luminosidade da pele.",
      beforeImage: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=500&fit=crop&crop=face",
      afterImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=500&fit=crop&crop=face",
      category: "Skincare",
      timestamp: "5h atrás",
      results: "Pele renovada"
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: "",
    results: "",
    beforeImage: "",
    afterImage: ""
  });

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.description && newPost.beforeImage && newPost.afterImage) {
      const post = {
        id: posts.length + 1,
        author: "Você",
        avatar: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=150&h=150&fit=crop&crop=face",
        title: newPost.title,
        description: newPost.description,
        beforeImage: newPost.beforeImage,
        afterImage: newPost.afterImage,
        category: newPost.category || "Transformação",
        results: newPost.results,
        timestamp: "agora"
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", description: "", category: "", results: "", beforeImage: "", afterImage: "" });
      toast({
        title: "Transformação compartilhada! ✨",
        description: "Seu resultado foi publicado com sucesso no feed.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-pink-900/10">
      <div className="px-4 sm:px-6 lg:px-12 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Mobile Optimized */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Transformações Reais
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-6">
              Inspire-se com resultados incríveis dos nossos tratamentos estéticos
            </p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-6 py-3 text-sm sm:text-base shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Compartilhar Resultado
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900/95 border-purple-500/30 backdrop-blur-xl max-w-lg mx-4 sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Compartilhar Nova Transformação
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitPost} className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label className="text-white font-semibold text-sm">Título do Tratamento</Label>
                    <Input
                      placeholder="Ex: Harmonização Facial Completa..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-semibold text-sm">Descrição do Resultado</Label>
                    <Textarea
                      placeholder="Conte sobre a transformação da cliente..."
                      value={newPost.description}
                      onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                      className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400 min-h-20 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white font-semibold text-sm">Categoria</Label>
                      <Input
                        placeholder="Ex: Harmonização Facial..."
                        value={newPost.category}
                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                        className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400 text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white font-semibold text-sm">Resultado</Label>
                      <Input
                        placeholder="Ex: Autoestima renovada..."
                        value={newPost.results}
                        onChange={(e) => setNewPost({...newPost, results: e.target.value})}
                        className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white font-semibold text-sm">Foto - Antes</Label>
                      <Input
                        placeholder="URL da foto antes..."
                        value={newPost.beforeImage}
                        onChange={(e) => setNewPost({...newPost, beforeImage: e.target.value})}
                        className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400 text-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-white font-semibold text-sm">Foto - Depois</Label>
                      <Input
                        placeholder="URL da foto depois..."
                        value={newPost.afterImage}
                        onChange={(e) => setNewPost({...newPost, afterImage: e.target.value})}
                        className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400 text-sm"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full font-bold py-3 shadow-xl text-sm">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Publicar Transformação
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Posts Feed - Mobile Optimized */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="bg-gray-900/80 border-purple-500/20 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden">
                <CardHeader className="pb-3 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 sm:w-14 sm:h-14 ring-2 ring-pink-500/30">
                      <AvatarImage src={post.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm">
                        {post.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm sm:text-base truncate">{post.author}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">{post.timestamp}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs px-2 py-1">
                        {post.category}
                      </Badge>
                      {post.results && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xs px-2 py-1">
                          {post.results}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 px-4 sm:px-6 pb-6">
                  <div>
                    <h4 className="text-white font-bold text-lg sm:text-xl mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                      {post.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{post.description}</p>
                  </div>
                  
                  {/* Before and After Images - Mobile Optimized */}
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute -top-2 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        ANTES
                      </div>
                      <div className="rounded-xl overflow-hidden border-2 border-red-500/30 shadow-xl group-hover:scale-[1.02] transition-transform duration-300">
                        <img 
                          src={post.beforeImage} 
                          alt="Antes do tratamento"
                          className="w-full h-48 sm:h-64 object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -top-2 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                        DEPOIS
                      </div>
                      <div className="rounded-xl overflow-hidden border-2 border-green-500/30 shadow-xl group-hover:scale-[1.02] transition-transform duration-300">
                        <img 
                          src={post.afterImage} 
                          alt="Depois do tratamento"
                          className="w-full h-48 sm:h-64 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalFeed;
