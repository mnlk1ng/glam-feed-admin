import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Lock, Loader2, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AppSettings {
  heroImage: string;
  title: string;
  subtitle: string;
  badge: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  primaryButtonColor: string;
}

interface Post {
  id: number;
  author: string;
  avatar: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  category: string;
  timestamp: string;
  results: string;
}

interface AdminPanelProps {
  appSettings: AppSettings;
  setAppSettings: (settings: AppSettings) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

const AdminPanel = ({ appSettings, setAppSettings, posts, setPosts }: AdminPanelProps) => {
  const { user, loading, signIn, signOut } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [services, setServices] = useState([
    { id: 1, title: "HARMONIZAÇÃO FACIAL", category: "Facial", status: "Ativo", price: "R$ 800", description: "Realce sua beleza natural com preenchimentos e contornos faciais", url: "https://calendly.com/harmonizacao", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&h=600&fit=crop&crop=face" },
    { id: 2, title: "LIMPEZA DE PELE PROFUNDA", category: "Skincare", status: "Ativo", price: "R$ 150", description: "Tratamento completo para renovação e purificação da pele", url: "https://agendamento.com/limpeza", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&crop=face" },
    { id: 3, title: "MASSAGEM RELAXANTE", category: "Bem-estar", status: "Ativo", price: "R$ 200", description: "Momento de relaxamento e bem-estar para corpo e mente", url: "https://booking.com/massagem", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop" },
    { id: 4, title: "CONSULTORIA PERSONALIZADA", category: "Consultoria", status: "Ativo", price: "R$ 350", description: "Análise completa e plano de cuidados personalizado", url: "https://consultoria.example.com", image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&h=600&fit=crop" }
  ]);

  const [newService, setNewService] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    url: "",
    image: ""
  });

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: "",
    results: "",
    beforeImage: "",
    afterImage: ""
  });

  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [tempSettings, setTempSettings] = useState(appSettings);

  const colorOptions = [
    { name: "Rosa/Roxo", value: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" },
    { name: "Azul", value: "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700" },
    { name: "Verde", value: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" },
    { name: "Laranja", value: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700" },
    { name: "Dourado", value: "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700" },
    { name: "Violeta", value: "bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700" },
    { name: "Turquesa", value: "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600" },
    { name: "Coral", value: "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600" },
    { name: "Esmeralda", value: "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600" },
    { name: "Sunset", value: "bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600" },
    { name: "Oceano", value: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700" },
    { name: "Lavanda", value: "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500" },
    { name: "Mint", value: "bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-500 hover:to-cyan-500" },
    { name: "Flamingo", value: "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500" },
    { name: "Royal", value: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    
    const { error } = await signIn(loginData.email, loginData.password);
    
    if (error) {
      toast({
        title: "Erro de autenticação",
        description: error.message || "Email ou senha incorretos.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Login realizado com sucesso! ✨",
        description: "Bem-vinda ao painel administrativo.",
      });
      setLoginData({ email: "", password: "" });
    }
    
    setIsSigningIn(false);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    
    if (error) {
      toast({
        title: "Erro ao sair",
        description: error.message || "Ocorreu um erro ao fazer logout.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Logout realizado",
        description: "Você foi desconectada do painel.",
      });
      setLoginData({ email: "", password: "" });
    }
  };

  const handleSaveSettings = () => {
    setAppSettings(tempSettings);
    toast({
      title: "Configurações salvas! ✨",
      description: "As alterações foram aplicadas com sucesso.",
    });
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.title && newService.category && newService.price && newService.url) {
      const service = {
        id: services.length + 1,
        title: newService.title,
        category: newService.category,
        status: "Ativo" as const,
        price: newService.price,
        description: newService.description,
        url: newService.url,
        image: newService.image || "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop"
      };
      setServices([...services, service]);
      setNewService({ title: "", category: "", price: "", description: "", url: "", image: "" });
      toast({
        title: "Serviço adicionado! 🎉",
        description: "Novo serviço foi criado com sucesso.",
      });
    }
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.description && newPost.beforeImage && newPost.afterImage) {
      const post: Post = {
        id: posts.length + 1,
        author: "Priscila Zillo",
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
        title: "Transformação adicionada! ✨",
        description: "Nova transformação foi publicada no feed.",
      });
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      description: post.description,
      category: post.category,
      results: post.results,
      beforeImage: post.beforeImage,
      afterImage: post.afterImage
    });
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost && newPost.title && newPost.description && newPost.beforeImage && newPost.afterImage) {
      const updatedPosts = posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...newPost }
          : post
      );
      setPosts(updatedPosts);
      setEditingPost(null);
      setNewPost({ title: "", description: "", category: "", results: "", beforeImage: "", afterImage: "" });
      toast({
        title: "Transformação atualizada! ✨",
        description: "As alterações foram salvas com sucesso.",
      });
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Transformação removida",
      description: "A transformação foi excluída do feed.",
    });
  };

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === "Ativo" ? "Pausado" as const : "Ativo" as const }
        : service
    ));
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-pink-900/10 flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Verificando autenticação...</span>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar tela de login
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-pink-900/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900/80 border-purple-500/20 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
                <Lock className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Acesso Administrativo
            </CardTitle>
            <p className="text-gray-400">Entre com suas credenciais para continuar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white font-semibold">Email</Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400"
                  required
                  disabled={isSigningIn}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-white font-semibold">Senha</Label>
                <Input
                  type="password"
                  placeholder="Digite sua senha..."
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="bg-gray-800/80 border-purple-500/30 text-white placeholder-gray-400"
                  required
                  disabled={isSigningIn}
                />
              </div>

              <Button 
                type="submit" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 w-full font-bold py-3 shadow-xl"
                disabled={isSigningIn}
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Entrar no Painel
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-900 via-purple-900/10 to-pink-900/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <p className="text-gray-400 text-sm mt-1">Bem-vinda, {user.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white">
            Sair
          </Button>
        </div>

        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="appearance" className="text-white data-[state=active]:bg-pink-500">
              Aparência
            </TabsTrigger>
            <TabsTrigger value="services" className="text-white data-[state=active]:bg-pink-500">
              Serviços
            </TabsTrigger>
            <TabsTrigger value="feed" className="text-white data-[state=active]:bg-pink-500">
              Feed
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-pink-500">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Personalizar Página Principal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-white">Imagem de Fundo da Hero</Label>
                  <Input
                    placeholder="URL da imagem..."
                    value={tempSettings.heroImage}
                    onChange={(e) => setTempSettings({...tempSettings, heroImage: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Título Principal</Label>
                  <Input
                    placeholder="Seu nome..."
                    value={tempSettings.title}
                    onChange={(e) => setTempSettings({...tempSettings, title: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Subtítulo/Descrição</Label>
                  <Textarea
                    placeholder="Sua descrição..."
                    value={tempSettings.subtitle}
                    onChange={(e) => setTempSettings({...tempSettings, subtitle: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white min-h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Badge de Destaque</Label>
                  <Input
                    placeholder="Texto do badge..."
                    value={tempSettings.badge}
                    onChange={(e) => setTempSettings({...tempSettings, badge: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Botão Principal</Label>
                    <Input
                      placeholder="Texto do botão..."
                      value={tempSettings.primaryButtonText}
                      onChange={(e) => setTempSettings({...tempSettings, primaryButtonText: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">Botão Secundário</Label>
                    <Input
                      placeholder="Texto do botão..."
                      value={tempSettings.secondaryButtonText}
                      onChange={(e) => setTempSettings({...tempSettings, secondaryButtonText: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-white text-lg font-semibold">Estilo do Botão Principal</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {colorOptions.map((color) => (
                      <Button
                        key={color.name}
                        variant={tempSettings.primaryButtonColor === color.value ? "default" : "outline"}
                        className={`${color.value} text-white border-2 ${
                          tempSettings.primaryButtonColor === color.value 
                            ? 'border-white shadow-lg scale-105' 
                            : 'border-gray-600 hover:border-white/50'
                        } text-sm font-semibold py-3 transition-all duration-200`}
                        onClick={() => setTempSettings({...tempSettings, primaryButtonColor: color.value})}
                      >
                        {color.name}
                      </Button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">
                    Escolha uma das {colorOptions.length} opções de cores disponíveis para personalizar o botão principal.
                  </p>
                </div>

                <Button onClick={handleSaveSettings} className="bg-green-500 hover:bg-green-600 w-full font-bold py-3">
                  ✨ Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Gerenciar Serviços</h2>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-pink-500 hover:bg-pink-600 font-bold">
                    + Novo Serviço
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Adicionar Novo Serviço</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddService} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Nome do serviço..."
                        value={newService.title}
                        onChange={(e) => setNewService({...newService, title: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="Categoria..."
                        value={newService.category}
                        onChange={(e) => setNewService({...newService, category: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Preço (ex: R$ 150)..."
                        value={newService.price}
                        onChange={(e) => setNewService({...newService, price: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="URL do serviço..."
                        value={newService.url}
                        onChange={(e) => setNewService({...newService, url: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <Input
                      placeholder="URL da imagem (opcional)..."
                      value={newService.image}
                      onChange={(e) => setNewService({...newService, image: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Textarea
                      placeholder="Descrição do serviço..."
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Button type="submit" className="bg-pink-500 hover:bg-pink-600 w-full font-bold">
                      Criar Serviço
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id} className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{service.title}</h3>
                        <p className="text-gray-400">{service.category} • {service.price}</p>
                        <p className="text-gray-500 text-sm mt-1">{service.description}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge className={service.status === "Ativo" ? "bg-green-500" : "bg-yellow-500"}>
                          {service.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleServiceStatus(service.id)}
                          className="border-gray-600 text-gray-300"
                        >
                          {service.status === "Ativo" ? "Pausar" : "Ativar"}
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Feed Management */}
          <TabsContent value="feed" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-white">Gerenciar Feed de Transformações</h2>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-pink-500 hover:bg-pink-600 font-bold">
                    + Nova Transformação
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingPost ? "Editar Transformação" : "Adicionar Nova Transformação"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={editingPost ? handleUpdatePost : handleAddPost} className="space-y-4">
                    <Input
                      placeholder="Título da transformação..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Textarea
                      placeholder="Descrição da transformação..."
                      value={newPost.description}
                      onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white min-h-20"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Categoria..."
                        value={newPost.category}
                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="Resultado..."
                        value={newPost.results}
                        onChange={(e) => setNewPost({...newPost, results: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="URL da foto ANTES..."
                        value={newPost.beforeImage}
                        onChange={(e) => setNewPost({...newPost, beforeImage: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Input
                        placeholder="URL da foto DEPOIS..."
                        value={newPost.afterImage}
                        onChange={(e) => setNewPost({...newPost, afterImage: e.target.value})}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-pink-500 hover:bg-pink-600 flex-1 font-bold">
                        {editingPost ? "Atualizar" : "Criar"} Transformação
                      </Button>
                      {editingPost && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setEditingPost(null);
                            setNewPost({ title: "", description: "", category: "", results: "", beforeImage: "", afterImage: "" });
                          }}
                          className="border-gray-600 text-gray-300"
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id} className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg">{post.title}</h3>
                          <p className="text-gray-400 text-sm">{post.category} • {post.results}</p>
                          <p className="text-gray-300 mt-2">{post.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditPost(post)}
                            className="border-gray-600 text-gray-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeletePost(post.id)}
                            className="border-red-600 text-red-400 hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-400 mb-2">ANTES</p>
                          <img src={post.beforeImage} alt="Antes" className="w-full h-32 object-cover rounded border-2 border-red-500/30" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-2">DEPOIS</p>
                          <img src={post.afterImage} alt="Depois" className="w-full h-32 object-cover rounded border-2 border-green-500/30" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Total de Serviços</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-pink-400">{services.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Transformações</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-400">{posts.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Clicks nos Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-400">1.240</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Taxa de Conversão</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-400">24%</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
