
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface Service {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  url: string;
  image_url: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  results: string;
  before_image_url: string;
  after_image_url: string;
  author: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface AppSettings {
  id: string;
  hero_image_url: string;
  hero_video_url: string;
  login_logo_url: string;
  title: string;
  subtitle: string;
  badge: string;
  primary_button_text: string;
  secondary_button_text: string;
  primary_button_color: string;
  created_at: string;
  updated_at: string;
}

export const useSupabaseData = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  // Upload de imagem para o Supabase Storage
  const uploadImage = async (file: File, folder: string = 'general'): Promise<string | null> => {
    if (!user) {
      toast.error('Você precisa estar logado para fazer upload');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('app-images')
        .upload(fileName, file);

      if (error) {
        console.error('Erro no upload:', error);
        toast.error('Erro ao fazer upload da imagem');
        return null;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('app-images')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao fazer upload da imagem');
      return null;
    }
  };

  // Carregar dados do Supabase
  const loadData = async () => {
    // Permitir carregar configurações mesmo sem usuário logado
    const loadPublicData = !user;

    try {
      setLoading(true);

      // Carregar serviços (sempre)
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (servicesError) {
        console.error('Erro ao carregar serviços:', servicesError);
        if (user) toast.error('Erro ao carregar serviços');
      } else {
        setServices(servicesData || []);
      }

      // Carregar posts (sempre)
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Erro ao carregar posts:', postsError);
        if (user) toast.error('Erro ao carregar posts');
      } else {
        setPosts(postsData || []);
      }

      // Carregar configurações (sempre)
      const { data: settingsData, error: settingsError } = await supabase
        .from('app_settings')
        .select('*')
        .limit(1)
        .single();

      if (settingsError) {
        console.error('Erro ao carregar configurações:', settingsError);
        if (user) toast.error('Erro ao carregar configurações');
      } else {
        setAppSettings(settingsData);
      }
    } catch (error) {
      console.error('Erro geral ao carregar dados:', error);
      if (user) toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  // Salvar serviço
  const saveService = async (service: Partial<Service>): Promise<boolean> => {
    if (!user) {
      toast.error('Você precisa estar logado');
      return false;
    }

    try {
      if (service.id) {
        // Atualizar serviço existente
        const { error } = await supabase
          .from('services')
          .update({
            title: service.title,
            category: service.category,
            price: service.price,
            description: service.description,
            url: service.url,
            image_url: service.image_url,
            status: service.status,
            updated_at: new Date().toISOString()
          })
          .eq('id', service.id);

        if (error) {
          console.error('Erro ao atualizar serviço:', error);
          toast.error('Erro ao atualizar serviço');
          return false;
        }
      } else {
        // Criar novo serviço
        const { error } = await supabase
          .from('services')
          .insert({
            title: service.title,
            category: service.category,
            price: service.price,
            description: service.description,
            url: service.url,
            image_url: service.image_url,
            status: service.status || 'Ativo'
          });

        if (error) {
          console.error('Erro ao criar serviço:', error);
          toast.error('Erro ao criar serviço');
          return false;
        }
      }

      toast.success('Serviço salvo com sucesso!');
      await loadData();
      return true;
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      toast.error('Erro ao salvar serviço');
      return false;
    }
  };

  // Deletar serviço
  const deleteService = async (id: string): Promise<boolean> => {
    if (!user) {
      toast.error('Você precisa estar logado');
      return false;
    }

    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar serviço:', error);
        toast.error('Erro ao deletar serviço');
        return false;
      }

      toast.success('Serviço deletado com sucesso!');
      await loadData();
      return true;
    } catch (error) {
      console.error('Erro ao deletar serviço:', error);
      toast.error('Erro ao deletar serviço');
      return false;
    }
  };

  // Salvar post
  const savePost = async (post: Partial<Post>): Promise<boolean> => {
    if (!user) {
      toast.error('Você precisa estar logado');
      return false;
    }

    try {
      if (post.id) {
        // Atualizar post existente
        const { error } = await supabase
          .from('posts')
          .update({
            title: post.title,
            description: post.description,
            category: post.category,
            results: post.results,
            before_image_url: post.before_image_url,
            after_image_url: post.after_image_url,
            updated_at: new Date().toISOString()
          })
          .eq('id', post.id);

        if (error) {
          console.error('Erro ao atualizar post:', error);
          toast.error('Erro ao atualizar post');
          return false;
        }
      } else {
        // Criar novo post
        const { error } = await supabase
          .from('posts')
          .insert({
            title: post.title,
            description: post.description,
            category: post.category,
            results: post.results,
            before_image_url: post.before_image_url,
            after_image_url: post.after_image_url,
            author: post.author || 'Priscila Zillo'
          });

        if (error) {
          console.error('Erro ao criar post:', error);
          toast.error('Erro ao criar post');
          return false;
        }
      }

      toast.success('Post salvo com sucesso!');
      await loadData();
      return true;
    } catch (error) {
      console.error('Erro ao salvar post:', error);
      toast.error('Erro ao salvar post');
      return false;
    }
  };

  // Deletar post
  const deletePost = async (id: string): Promise<boolean> => {
    if (!user) {
      toast.error('Você precisa estar logado');
      return false;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar post:', error);
        toast.error('Erro ao deletar post');
        return false;
      }

      toast.success('Post deletado com sucesso!');
      await loadData();
      return true;
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      toast.error('Erro ao deletar post');
      return false;
    }
  };

  // Salvar configurações
  const saveAppSettings = async (settings: Partial<AppSettings>): Promise<boolean> => {
    if (!user) {
      toast.error('Você precisa estar logado');
      return false;
    }

    try {
      if (appSettings?.id) {
        // Atualizar configurações existentes
        const { error } = await supabase
          .from('app_settings')
          .update({
            hero_image_url: settings.hero_image_url,
            hero_video_url: settings.hero_video_url,
            login_logo_url: settings.login_logo_url,
            title: settings.title,
            subtitle: settings.subtitle,
            badge: settings.badge,
            primary_button_text: settings.primary_button_text,
            secondary_button_text: settings.secondary_button_text,
            primary_button_color: settings.primary_button_color,
            updated_at: new Date().toISOString()
          })
          .eq('id', appSettings.id);

        if (error) {
          console.error('Erro ao atualizar configurações:', error);
          toast.error('Erro ao atualizar configurações');
          return false;
        }
      } else {
        // Criar novas configurações
        const { error } = await supabase
          .from('app_settings')
          .insert({
            hero_image_url: settings.hero_image_url,
            hero_video_url: settings.hero_video_url,
            login_logo_url: settings.login_logo_url,
            title: settings.title,
            subtitle: settings.subtitle,
            badge: settings.badge,
            primary_button_text: settings.primary_button_text,
            secondary_button_text: settings.secondary_button_text,
            primary_button_color: settings.primary_button_color
          });

        if (error) {
          console.error('Erro ao criar configurações:', error);
          toast.error('Erro ao criar configurações');
          return false;
        }
      }

      toast.success('Configurações salvas com sucesso!');
      await loadData();
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast.error('Erro ao salvar configurações');
      return false;
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  return {
    services,
    posts,
    appSettings,
    loading,
    uploadImage,
    saveService,
    deleteService,
    savePost,
    deletePost,
    saveAppSettings,
    loadData
  };
};
