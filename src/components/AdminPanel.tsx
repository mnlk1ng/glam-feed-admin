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
import { Lock, Loader2 } from "lucide-react";
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

interface AdminPanelProps {
  appSettings: AppSettings;
  setAppSettings: (settings: AppSettings) => void;
}

const AdminPanel = ({ appSettings, setAppSettings }: AdminPanelProps) => {
  const { user, loading, signIn, signOut } = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [services, setServices] = useState([
    { id: 1, title: "CONSULTORIA PREMIUM", category: "Consultoria", status: "Ativo", price: "R$ 497", description: "Sessão 1:1 personalizada para acelerar seus resultados", url: "https://calendly.com/exemplo", image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop" },
    { id: 2, title: "MENTORIA VIP", category: "Mentoria", status: "Ativo", price: "R$ 1.497", description: "Programa completo de 3 meses para transformar sua carreira", url: "https://mentoria.example.com", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" },
    { id: 3, title: "CURSO DIGITAL MASTERY", category: "Curso", status: "Ativo", price: "R$ 297", description: "Aprenda do zero ao profissional em marketing digital", url: "https://curso.example.com", image: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop" },
    { id: 4, title: "COMUNIDADE EXCLUSIVA", category: "Comunidade", status: "Ativo", price: "R$ 97/mês", description: "Acesso vitalício à nossa comunidade de experts", url: "https://comunidade.example.com", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop" }
  ]);

  const [newService, setNewService] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    url: "",
    image: ""
  });

  const [tempSettings, setTempSettings] = useState(appSettings);

  const colorOptions = [
    { name: "Rosa/Roxo", value: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" },
    { name: "Azul", value: "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700" },
    { name: "Verde", value: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" },
    { name: "Laranja", value: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700" },
    { name: "Dourado", value: "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700" }
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
        status: "Ativo",
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

  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id 
        ? { ...service, status: service.status === "Ativo" ? "Pausado" : "Ativo" }
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
            
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-purple-500/20">
              <p className="text-xs text-gray-400 text-center">
                <strong>Autenticação Supabase:</strong> Use suas credenciais reais
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
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

                <div className="space-y-2">
                  <Label className="text-white">Estilo do Botão Principal</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {colorOptions.map((color) => (
                      <Button
                        key={color.name}
                        variant={tempSettings.primaryButtonColor === color.value ? "default" : "outline"}
                        className={`${color.value} text-white border-gray-600 text-xs`}
                        onClick={() => setTempSettings({...tempSettings, primaryButtonColor: color.value})}
                      >
                        {color.name}
                      </Button>
                    ))}
                  </div>
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
                  <CardTitle className="text-white text-sm">Serviços Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-400">{services.filter(s => s.status === "Ativo").length}</p>
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
                  <p className="text-3xl font-bold text-purple-400">24%</p>
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
