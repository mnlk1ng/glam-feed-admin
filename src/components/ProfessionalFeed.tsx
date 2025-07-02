
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const ProfessionalFeed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Priscila Zillo",
      avatar: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
      title: "Resultado Incrível - Cliente Satisfeita!",
      description: "Mais um trabalho finalizado com sucesso. Cliente conquistou +500% de engajamento!",
      image: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
      category: "Digital Marketing",
      likes: 42,
      comments: 8,
      timestamp: "2h atrás"
    },
    {
      id: 2,
      author: "Ana Silva",
      avatar: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
      title: "Portfólio Atualizado",
      description: "Confira meus últimos trabalhos em design digital. Sempre evoluindo!",
      image: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
      category: "Design",
      likes: 28,
      comments: 5,
      timestamp: "4h atrás"
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: ""
  });

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.description) {
      const post = {
        id: posts.length + 1,
        author: "Você",
        avatar: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
        title: newPost.title,
        description: newPost.description,
        image: "/lovable-uploads/633d009f-ec98-422f-9952-239df165ed83.png",
        category: newPost.category || "Geral",
        likes: 0,
        comments: 0,
        timestamp: "agora"
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", description: "", category: "" });
      toast({
        title: "Post criado!",
        description: "Seu resultado foi compartilhado com sucesso.",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Feed das Profissionais</h1>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-pink-500 hover:bg-pink-600">
                + Compartilhar Resultado
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Compartilhar Novo Resultado</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitPost} className="space-y-4">
                <Input
                  placeholder="Título do seu resultado..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Textarea
                  placeholder="Descreva seu resultado e conquista..."
                  value={newPost.description}
                  onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Input
                  placeholder="Categoria (ex: Design, Marketing, Desenvolvimento...)"
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <Button type="submit" className="bg-pink-500 hover:bg-pink-600 w-full">
                  Publicar Resultado
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{post.author}</h3>
                    <p className="text-gray-400 text-sm">{post.timestamp}</p>
                  </div>
                  <Badge className="bg-pink-500">{post.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">{post.title}</h4>
                  <p className="text-gray-300">{post.description}</p>
                </div>
                
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <Button variant="ghost" size="sm" className="text-pink-400 hover:text-pink-300">
                    ♡ {post.likes} curtidas
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
                    💬 {post.comments} comentários
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300">
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
