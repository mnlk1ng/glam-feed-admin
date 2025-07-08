-- Adicionar campo para logo do login nas configurações
ALTER TABLE public.app_settings 
ADD COLUMN login_logo_url TEXT;

-- Adicionar campo para vídeo hero
ALTER TABLE public.app_settings 
ADD COLUMN hero_video_url TEXT;

-- Atualizar configurações padrão com logo
UPDATE public.app_settings 
SET login_logo_url = 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=200&h=200&fit=crop&crop=face'
WHERE id IS NOT NULL;