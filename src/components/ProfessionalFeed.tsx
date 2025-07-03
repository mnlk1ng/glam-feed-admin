
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface ProfessionalFeedProps {
  posts: Post[];
}

const ProfessionalFeed = ({ posts }: ProfessionalFeedProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-pink-900/10">
      <div className="px-4 sm:px-6 lg:px-12 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Transformações Reais
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Inspire-se com resultados incríveis dos nossos tratamentos estéticos
            </p>
          </div>

          {/* Posts Feed */}
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
                  
                  {/* Before and After Images */}
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
