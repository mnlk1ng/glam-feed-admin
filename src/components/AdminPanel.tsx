
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [services, setServices] = useState([
    { id: 1, title: "Digital Anime", category: "Design", status: "Ativo", price: "R$ 150" },
    { id: 2, title: "Portfólio Premium", category: "Portfolio", status: "Ativo", price: "R$ 300" },
    { id: 3, title: "Consultoria Digital", category: "Consultoria", status: "Pausado", price: "R$ 500" }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Priscila Zillo", email: "priscila@email.com", role: "Admin", status: "Ativo" },
    { id: 2, name: "Ana Silva", email: "ana@email.com", role: "Profissional", status: "Ativo" },
    { id: 3, name: "Maria Santos", email: "maria@email.com", role: "Cliente", status: "Ativo" }
  ]);

  const [newService, setNewService] = useState({
    title: "",
    category: "",
    price: "",
    description: ""
  });

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (newService.title && newService.category && newService.price) {
      const service = {
        id: services.length + 1,
        title: newService.title,
        category: newService.category,
        status: "Ativo",
        price: newService.price
      };
      setServices([...services, service]);
      setNewService({ title: "", category: "", price: "", description: "" });
      toast({
        title: "Serviço adicionado!",
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

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Painel Administrativo</h1>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="services" className="text-white data-[state=active]:bg-pink-500">
              Serviços
            </TabsTrigger>
            <TabsTrigger value="users" className="text-white data-[state=active]:bg-pink-500">
              Usuários
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-white data-[state=active]:bg-pink-500">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gerenciar Serviços</h2>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-pink-500 hover:bg-pink-600">
                    + Novo Serviço
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Adicionar Novo Serviço</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddService} className="space-y-4">
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
                    <Input
                      placeholder="Preço (ex: R$ 150)..."
                      value={newService.price}
                      onChange={(e) => setNewService({...newService, price: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Textarea
                      placeholder="Descrição do serviço..."
                      value={newService.description}
                      onChange={(e) => setNewService({...newService, description: e.target.value})}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Button type="submit" className="bg-pink-500 hover:bg-pink-600 w-full">
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
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{service.title}</h3>
                        <p className="text-gray-400">{service.category} • {service.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
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

          {/* Users Management */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Gerenciar Usuários</h2>
            
            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id} className="bg-gray-900/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-bold">{user.name}</h3>
                        <p className="text-gray-400">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-blue-500">{user.role}</Badge>
                        <Badge className={user.status === "Ativo" ? "bg-green-500" : "bg-red-500"}>
                          {user.status}
                        </Badge>
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
                  <CardTitle className="text-white">Total de Serviços</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-pink-400">{services.length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Usuários Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-400">{users.filter(u => u.status === "Ativo").length}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Receita Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-400">R$ 2.850</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Taxa de Conversão</CardTitle>
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
