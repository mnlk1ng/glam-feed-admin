
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Edit, Plus, Save, Loader2, LogOut } from 'lucide-react';
import { useSupabaseData, Service, Post, AppSettings } from '@/hooks/useSupabaseData';
import { useAuth } from '@/hooks/useAuth';
import ImageUpload from './ImageUpload';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const AdminPanel = () => {
  const { signOut } = useAuth();
  const {
    services,
    posts,
    appSettings,
    loading,
    saveService,
    deleteService,
    savePost,
    deletePost,
    saveAppSettings
  } = useSupabaseData();

  // Estados para formulários
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [editingSettings, setEditingSettings] = useState<Partial<AppSettings> | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Manipuladores de serviços
  const handleEditService = (service: Service) => {
    setEditingService(service);
    setDialogOpen(true);
  };

  const handleNewService = () => {
    setEditingService({
      title: '',
      category: '',
      price: '',
      description: '',
      url: '',
      image_url: '',
      status: 'Ativo'
    });
    setDialogOpen(true);
  };

  const handleSaveService = async () => {
    if (!editingService) return;
    
    setSaving(true);
    const success = await saveService(editingService);
    if (success) {
      setDialogOpen(false);
      setEditingService(null);
    }
    setSaving(false);
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      await deleteService(id);
    }
  };

  // Manipuladores de posts
  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setPostDialogOpen(true);
  };

  const handleNewPost = () => {
    setEditingPost({
      title: '',
      description: '',
      category: '',
      results: '',
      before_image_url: '',
      after_image_url: '',
      author: 'Priscila Zillo'
    });
    setPostDialogOpen(true);
  };

  const handleSavePost = async () => {
    if (!editingPost) return;
    
    setSaving(true);
    const success = await savePost(editingPost);
    if (success) {
      setPostDialogOpen(false);
      setEditingPost(null);
    }
    setSaving(false);
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este post?')) {
      await deletePost(id);
    }
  };

  // Manipuladores de configurações
  const handleEditSettings = () => {
    setEditingSettings(appSettings || {
      hero_image_url: '',
      title: 'PRISCILA ZILLO',
      subtitle: 'Transforme sua beleza e autoestima com tratamentos estéticos personalizados.',
      badge: 'EXPERT EM ESTÉTICA',
      primary_button_text: '✨ Agendar Consulta',
      secondary_button_text: '🔥 Ver Transformações',
      primary_button_color: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
    });
    setSettingsDialogOpen(true);
  };

  const handleSaveSettings = async () => {
    if (!editingSettings) return;
    
    setSaving(true);
    const success = await saveAppSettings(editingSettings);
    if (success) {
      setSettingsDialogOpen(false);
      setEditingSettings(null);
    }
    setSaving(false);
  };

  // Logout
  const handleLogout = async () => {
    if (confirm('Tem certeza que deseja sair?')) {
      const { error } = await signOut();
      if (error) {
        toast.error('Erro ao fazer logout');
      } else {
        toast.success('Logout realizado com sucesso!');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        <span className="ml-2 text-lg">Carregando dados...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Painel Administrativo
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="bg-gray-900 border-purple-500/20">
            <TabsTrigger value="services" className="data-[state=active]:bg-purple-600">
              Serviços ({services.length})
            </TabsTrigger>
            <TabsTrigger value="posts" className="data-[state=active]:bg-purple-600">
              Posts ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Gerenciamento de Serviços */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gerenciar Serviços</h2>
              <Button onClick={handleNewService} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Serviço
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white">{service.title}</CardTitle>
                        <Badge className="mt-2 bg-purple-600">{service.category}</Badge>
                      </div>
                      <Badge variant={service.status === 'Ativo' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {service.image_url && (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        className="w-full h-32 object-cover rounded"
                      />
                    )}
                    <p className="text-gray-300 text-sm">{service.description}</p>
                    <p className="text-green-400 font-bold">{service.price}</p>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEditService(service)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteService(service.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gerenciamento de Posts */}
          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gerenciar Posts</h2>
              <Button onClick={handleNewPost} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Post
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">{post.title}</CardTitle>
                    <Badge className="w-fit bg-pink-600">{post.category}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {post.before_image_url && (
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Antes</p>
                          <img
                            src={post.before_image_url}
                            alt="Antes"
                            className="w-full h-24 object-cover rounded"
                          />
                        </div>
                      )}
                      {post.after_image_url && (
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Depois</p>
                          <img
                            src={post.after_image_url}
                            alt="Depois"
                            className="w-full h-24 object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm">{post.description}</p>
                    <p className="text-green-400 text-sm">Resultado: {post.results}</p>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEditPost(post)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeletePost(post.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Configurações do App</h2>
              <Button onClick={handleEditSettings} className="bg-purple-600 hover:bg-purple-700">
                <Edit className="h-4 w-4 mr-2" />
                Editar Configurações
              </Button>
            </div>

            {appSettings && (
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Configurações Atuais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {appSettings.hero_image_url && (
                    <div>
                      <Label className="text-gray-300">Imagem Hero</Label>
                      <img
                        src={appSettings.hero_image_url}
                        alt="Hero"
                        className="w-full h-32 object-cover rounded mt-2"
                      />
                    </div>
                  )}
                  <div>
                    <Label className="text-gray-300">Título</Label>
                    <p className="text-white mt-1">{appSettings.title}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Subtítulo</Label>
                    <p className="text-white mt-1">{appSettings.subtitle}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Badge</Label>
                    <p className="text-white mt-1">{appSettings.badge}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Botão Primário</Label>
                      <p className="text-white mt-1">{appSettings.primary_button_text}</p>
                    </div>
                    <div>
                      <Label className="text-gray-300">Botão Secundário</Label>
                      <p className="text-white mt-1">{appSettings.secondary_button_text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para edição de serviços */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-900 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService?.id ? 'Editar Serviço' : 'Novo Serviço'}
            </DialogTitle>
          </DialogHeader>
          
          {editingService && (
            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    title: e.target.value
                  })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoria</Label>
                  <Select
                    value={editingService.category || ''}
                    onValueChange={(value) => setEditingService({
                      ...editingService,
                      category: value
                    })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Facial">Facial</SelectItem>
                      <SelectItem value="Skincare">Skincare</SelectItem>
                      <SelectItem value="Bem-estar">Bem-estar</SelectItem>
                      <SelectItem value="Consultoria">Consultoria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Preço</Label>
                  <Input
                    value={editingService.price || ''}
                    onChange={(e) => setEditingService({
                      ...editingService,
                      price: e.target.value
                    })}
                    placeholder="R$ 150"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>

              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={editingService.description || ''}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    description: e.target.value
                  })}
                  className="bg-gray-800 border-gray-700"
                  rows={3}
                />
              </div>

              <div>
                <Label>URL de Agendamento</Label>
                <Input
                  value={editingService.url || ''}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    url: e.target.value
                  })}
                  placeholder="https://calendly.com/..."
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  value={editingService.status || 'Ativo'}
                  onValueChange={(value) => setEditingService({
                    ...editingService,
                    status: value
                  })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Imagem do Serviço</Label>
                <ImageUpload
                  currentImage={editingService.image_url}
                  onImageUploaded={(url) => setEditingService({
                    ...editingService,
                    image_url: url
                  })}
                  folder="services"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  onClick={() => setDialogOpen(false)}
                  variant="outline"
                  className="border-gray-700"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveService}
                  disabled={saving}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para edição de posts */}
      <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
        <DialogContent className="bg-gray-900 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPost?.id ? 'Editar Post' : 'Novo Post'}
            </DialogTitle>
          </DialogHeader>
          
          {editingPost && (
            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    title: e.target.value
                  })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoria</Label>
                  <Select
                    value={editingPost.category || ''}
                    onValueChange={(value) => setEditingPost({
                      ...editingPost,
                      category: value
                    })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Harmonização Facial">Harmonização Facial</SelectItem>
                      <SelectItem value="Skincare">Skincare</SelectItem>
                      <SelectItem value="Bem-estar">Bem-estar</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Resultado</Label>
                  <Input
                    value={editingPost.results || ''}
                    onChange={(e) => setEditingPost({
                      ...editingPost,
                      results: e.target.value
                    })}
                    placeholder="Autoestima renovada"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>

              <div>
                <Label>Descrição</Label>
                <Textarea
                  value={editingPost.description || ''}
                  onChange={(e) => setEditingPost({
                    ...editingPost,
                    description: e.target.value
                  })}
                  className="bg-gray-800 border-gray-700"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Imagem "Antes"</Label>
                  <ImageUpload
                    currentImage={editingPost.before_image_url}
                    onImageUploaded={(url) => setEditingPost({
                      ...editingPost,
                      before_image_url: url
                    })}
                    folder="posts/before"
                  />
                </div>

                <div>
                  <Label>Imagem "Depois"</Label>
                  <ImageUpload
                    currentImage={editingPost.after_image_url}
                    onImageUploaded={(url) => setEditingPost({
                      ...editingPost,
                      after_image_url: url
                    })}
                    folder="posts/after"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  onClick={() => setPostDialogOpen(false)}
                  variant="outline"
                  className="border-gray-700"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSavePost}
                  disabled={saving}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para configurações */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="bg-gray-900 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configurações do App</DialogTitle>
          </DialogHeader>
          
          {editingSettings && (
            <div className="space-y-4">
              <div>
                <Label>Imagem Hero</Label>
                <ImageUpload
                  currentImage={editingSettings.hero_image_url}
                  onImageUploaded={(url) => setEditingSettings({
                    ...editingSettings,
                    hero_image_url: url
                  })}
                  folder="hero"
                />
              </div>

              <div>
                <Label>Vídeo Hero (URL)</Label>
                <Input
                  value={editingSettings.hero_video_url || ''}
                  onChange={(e) => setEditingSettings({
                    ...editingSettings,
                    hero_video_url: e.target.value
                  })}
                  placeholder="https://exemplo.com/video.mp4"
                  className="bg-gray-800 border-gray-700"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Deixe vazio para usar apenas imagem
                </p>
              </div>

              <div>
                <Label>Logo do Login</Label>
                <ImageUpload
                  currentImage={editingSettings.login_logo_url}
                  onImageUploaded={(url) => setEditingSettings({
                    ...editingSettings,
                    login_logo_url: url
                  })}
                  folder="logos"
                />
              </div>

              <div>
                <Label>Título</Label>
                <Input
                  value={editingSettings.title || ''}
                  onChange={(e) => setEditingSettings({
                    ...editingSettings,
                    title: e.target.value
                  })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div>
                <Label>Subtítulo</Label>
                <Textarea
                  value={editingSettings.subtitle || ''}
                  onChange={(e) => setEditingSettings({
                    ...editingSettings,
                    subtitle: e.target.value
                  })}
                  className="bg-gray-800 border-gray-700"
                  rows={3}
                />
              </div>

              <div>
                <Label>Badge</Label>
                <Input
                  value={editingSettings.badge || ''}
                  onChange={(e) => setEditingSettings({
                    ...editingSettings,
                    badge: e.target.value
                  })}
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Texto do Botão Primário</Label>
                  <Input
                    value={editingSettings.primary_button_text || ''}
                    onChange={(e) => setEditingSettings({
                      ...editingSettings,
                      primary_button_text: e.target.value
                    })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div>
                  <Label>Texto do Botão Secundário</Label>
                  <Input
                    value={editingSettings.secondary_button_text || ''}
                    onChange={(e) => setEditingSettings({
                      ...editingSettings,
                      secondary_button_text: e.target.value
                    })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>

              <div>
                <Label>Cor do Botão Primário (Classes CSS)</Label>
                <Input
                  value={editingSettings.primary_button_color || ''}
                  onChange={(e) => setEditingSettings({
                    ...editingSettings,
                    primary_button_color: e.target.value
                  })}
                  placeholder="bg-gradient-to-r from-pink-500 to-purple-600"
                  className="bg-gray-800 border-gray-700"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  onClick={() => setSettingsDialogOpen(false)}
                  variant="outline"
                  className="border-gray-700"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
