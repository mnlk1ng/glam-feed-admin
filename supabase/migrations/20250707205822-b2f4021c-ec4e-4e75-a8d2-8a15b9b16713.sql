
-- Criar bucket para imagens do app
INSERT INTO storage.buckets (id, name, public) 
VALUES ('app-images', 'app-images', true);

-- Criar políticas para o bucket de imagens
CREATE POLICY "Usuários autenticados podem ver imagens"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'app-images');

CREATE POLICY "Usuários autenticados podem fazer upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'app-images');

CREATE POLICY "Usuários autenticados podem atualizar"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'app-images');

CREATE POLICY "Usuários autenticados podem deletar"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'app-images');

-- Criar tabela para gerenciar serviços no banco
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'Ativo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela de serviços
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Políticas para serviços (apenas usuários autenticados podem gerenciar)
CREATE POLICY "Usuários autenticados podem ver serviços"
ON public.services FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem criar serviços"
ON public.services FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar serviços"
ON public.services FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem deletar serviços"
ON public.services FOR DELETE
TO authenticated
USING (true);

-- Criar tabela para posts/transformações
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT,
  results TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  author TEXT DEFAULT 'Priscila Zillo',
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=150&h=150&fit=crop&crop=face',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela de posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Políticas para posts
CREATE POLICY "Usuários autenticados podem ver posts"
ON public.posts FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem criar posts"
ON public.posts FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar posts"
ON public.posts FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem deletar posts"
ON public.posts FOR DELETE
TO authenticated
USING (true);

-- Criar tabela para configurações do app
CREATE TABLE public.app_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_image_url TEXT,
  title TEXT DEFAULT 'PRISCILA ZILLO',
  subtitle TEXT DEFAULT 'Transforme sua beleza e autoestima com tratamentos estéticos personalizados.',
  badge TEXT DEFAULT 'EXPERT EM ESTÉTICA',
  primary_button_text TEXT DEFAULT '✨ Agendar Consulta',
  secondary_button_text TEXT DEFAULT '🔥 Ver Transformações',
  primary_button_color TEXT DEFAULT 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela de configurações
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para configurações
CREATE POLICY "Usuários autenticados podem ver configurações"
ON public.app_settings FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem atualizar configurações"
ON public.app_settings FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Usuários autenticados podem inserir configurações"
ON public.app_settings FOR INSERT
TO authenticated
WITH CHECK (true);

-- Inserir configurações padrão
INSERT INTO public.app_settings (
  hero_image_url,
  title,
  subtitle,
  badge,
  primary_button_text,
  secondary_button_text,
  primary_button_color
) VALUES (
  'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=1200&h=800&fit=crop&crop=face',
  'PRISCILA ZILLO',
  'Transforme sua beleza e autoestima com tratamentos estéticos personalizados. Realce sua beleza natural com técnicas avançadas e cuidado especializado.',
  'EXPERT EM ESTÉTICA',
  '✨ Agendar Consulta',
  '🔥 Ver Transformações',
  'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
);

-- Inserir alguns serviços padrão
INSERT INTO public.services (title, category, price, description, url, image_url, status) VALUES
('HARMONIZAÇÃO FACIAL', 'Facial', 'R$ 800', 'Realce sua beleza natural com preenchimentos e contornos faciais', 'https://calendly.com/harmonizacao', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&h=600&fit=crop&crop=face', 'Ativo'),
('LIMPEZA DE PELE PROFUNDA', 'Skincare', 'R$ 150', 'Tratamento completo para renovação e purificação da pele', 'https://agendamento.com/limpeza', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop&crop=face', 'Ativo'),
('MASSAGEM RELAXANTE', 'Bem-estar', 'R$ 200', 'Momento de relaxamento e bem-estar para corpo e mente', 'https://booking.com/massagem', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop', 'Ativo'),
('CONSULTORIA PERSONALIZADA', 'Consultoria', 'R$ 350', 'Análise completa e plano de cuidados personalizado', 'https://consultoria.example.com', 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&h=600&fit=crop', 'Ativo');

-- Inserir alguns posts padrão
INSERT INTO public.posts (title, description, category, results, before_image_url, after_image_url) VALUES
('Harmonização Facial Completa', 'Transformação incrível com preenchimento labial e contorno facial. A cliente ganhou autoestima e confiança para conquistar seus sonhos! ✨', 'Harmonização Facial', 'Autoestima renovada', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=500&fit=crop&crop=face', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop&crop=face'),
('Limpeza de Pele Profunda', 'Resultado surpreendente! Pele completamente renovada e radiante. Tratamento personalizado que transformou a textura e luminosidade da pele.', 'Skincare', 'Pele renovada', 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&h=500&fit=crop&crop=face', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=500&fit=crop&crop=face');
