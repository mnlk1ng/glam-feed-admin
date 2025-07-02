
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const ProfessionalFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Priscila Zillo",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      title: "Transformação Completa - Cliente Maria",
      description: "De 0 a R$ 15.000 em 3 meses! Veja como a Maria transformou sua vida digital com nossa mentoria exclusiva.",
      beforeImage: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      category: "Transformação Digital",
      likes: 128,
      comments: 24,
      timestamp: "2h atrás",
      results: "R$ 15.000 em vendas"
    },
    {
      id: 2,
      author: "Ana Silva",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face",
      title: "Resultado Extraordinário - Cliente João",
      description: "Do zero ao primeiro R$ 50.000! Acompanhe a jornada completa de transformação digital do João.",
      beforeImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=400&h=300&fit=crop",
      category: "Negócio Digital",
      likes: 89,
      comments: 15,
      timestamp: "5h atrás",
      results: "R$ 50.000 em faturamento"
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
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
        title: newPost.title,
        description: newPost.description,
        beforeImage: newPost.beforeImage,
        afterImage: newPost.afterImage,
        category: newPost.category || "Transformação",
        results: newPost.results,
        likes: 0,
        comments: 0,
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
    <div className="min-h-screen p-6 md:p-12 bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Feed de Transformações
            </h1>
            <p className="text-gray-300 text-lg">Inspire-se com resultados reais de nossas clientes</p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300">
                ✨ Compartilhar Transformação
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900/95 border-purple-500/30 backdrop-blur-xl max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Compartilhar Nova Transformação
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitPost} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white font-semibold">Título da Transformação</Label>
                  <Input
                    placeholder="Ex: Cliente alcançou R$ 20.000 em 2 meses..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white font-semibold">Descrição da Jornada</Label>
                  <Textarea
                    placeholder="Conte a história completa da transformação..."
                    value={newPost.description}
                    onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                    className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400 min-h-24"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Categoria</Label>
                    <Input
                      placeholder="Ex: Transformação Digital..."
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Resultado Alcançado</Label>
                    <Input
                      placeholder="Ex: R$ 25.000 em vendas..."
                      value={newPost.results}
                      onChange={(e) => setNewPost({...newPost, results: e.target.value})}
                      className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Imagem - Antes</Label>
                    <Input
                      placeholder="URL da imagem do antes..."
                      value={newPost.beforeImage}
                      onChange={(e) => setNewPost({...newPost, beforeImage: e.target.value})}
                      className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white font-semibold">Imagem - Depois</Label>
                    <Input
                      placeholder="URL da imagem do depois..."
                      value={newPost.afterImage}
                      onChange={(e) => setNewPost({...newPost, afterImage: e.target.value})}
                      className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <Button type="submit" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full font-bold py-3 shadow-xl">
                  ✨ Publicar Transformação
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <Card key={post.id} className="bg-gray-900/60 border-purple-500/20 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 ring-4 ring-pink-500/30">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold">
                      {post.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">{post.author}</h3>
                    <p className="text-gray-400">{post.timestamp}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold">
                      {post.category}
                    </Badge>
                    {post.results && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold">
                        {post.results}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-white font-bold text-xl mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {post.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">{post.description}</p>
                </div>
                
                {/* Before and After Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <div className="absolute -top-3 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                      ANTES
                    </div>
                    <div className="rounded-xl overflow-hidden border-2 border-red-500/30 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={post.beforeImage} 
                        alt="Antes"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -top-3 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
                      DEPOIS
                    </div>
                    <div className="rounded-xl overflow-hidden border-2 border-green-500/30 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={post.afterImage} 
                        alt="Depois"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 pt-4 border-t border-purple-500/20">
                  <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10 font-semibold">
                    💖 {post.likes} curtidas
                  </Button>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 font-semibold">
                    💬 {post.comments} comentários
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-500/10 font-semibold">
                    📤 Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalFeed;
