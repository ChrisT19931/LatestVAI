import Image from 'next/image';
'use client';

import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BuyNowButton from '@/components/BuyNowButton';
import StarBackground from '@/components/3d/StarBackground';
import TypewriterEffect from '@/components/TypewriterEffect';



async function getProducts() {
  // Try to fetch from Supabase first
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    
    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (e) {
    console.error('Error connecting to Supabase:', e);
  }
  
  // Fallback to mock data if Supabase fetch fails or returns empty
  return [
    {
      id: '2',
      name: 'AI Prompts Starter Pack',
      description: 'Your entry point to AI-powered business success. 30 ready-to-use prompts that jumpstart your online business journey with minimal learning curve and immediate implementation.',
      price: 10.00,
      originalPrice: 20.00,
      image_url: '/images/products/ai-prompts-arsenal.svg',
      category: 'tools',
      is_active: true,
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: '1',
      name: 'AI Business E-Book',
      description: 'The essential knowledge resource containing 90% of what you need to build a successful online business. Comprehensive strategies, frameworks, and implementation guides for the self-starter.',
      price: 25.00,
      originalPrice: 50.00,
      image_url: '/images/products/ai-tools-mastery-guide.svg',
      category: 'courses',
      is_active: true,
      featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Complete Business Deployment Coaching',
      description: 'The ultimate solution for those who want all information required to deploy a custom-built site from start to finish. Own your front-end/back-end and edit everything on the fly with expert guidance.',
      price: 500.00,
      originalPrice: 3000.00,
      image_url: '/images/products/ai-business-strategy-session.svg',
      category: 'services',
      is_active: true,
      featured: false,
      created_at: new Date().toISOString()
    }
  ];
}



export default async function ProductsPage() {
  const products = await getProducts();
  
  return (
    <div className="relative min-h-screen py-16 overflow-hidden bg-gradient-to-br from-slate-950 via-gray-950 to-black">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <StarBackground />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-full text-xs font-semibold text-purple-300 mb-4 border border-purple-500/30 shadow-lg shadow-purple-500/10">
            AI-Powered Business Solutions
          </span>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 to-purple-500 drop-shadow-2xl">
            AI Business Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light max-w-4xl mx-auto leading-relaxed">
            Choose your path to AI-powered business success
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full animate-pulse"></div>
          <p className="text-blue-400 font-medium mt-4 text-lg">
            Discover how AI tools can enhance your business efficiency and innovation
          </p>
        </div>
        
        {/* Enhanced Three-Tier Layout with Advanced Effects */}
        <style jsx>{`
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
            50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3); }
          }
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes premium-glow {
            0%, 100% { 
              box-shadow: 0 0 30px rgba(147, 51, 234, 0.3), 0 0 60px rgba(147, 51, 234, 0.1);
            }
            50% { 
              box-shadow: 0 0 50px rgba(147, 51, 234, 0.5), 0 0 100px rgba(147, 51, 234, 0.2);
            }
          }
          @keyframes premium-float {
            0%, 100% { transform: translateY(0px) scale(1); }
            25% { transform: translateY(-10px) scale(1.02); }
            50% { transform: translateY(-5px) scale(1.01); }
            75% { transform: translateY(-15px) scale(1.03); }
          }
          .card-glow { animation: glow-pulse 3s ease-in-out infinite; }
          .premium-glow { animation: premium-glow 3s ease-in-out infinite; }
          .premium-float { animation: premium-float 4s ease-in-out infinite; }
          .shimmer-effect {
            position: relative;
            overflow: hidden;
          }
          .shimmer-effect::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer 2s infinite;
            z-index: 1;
          }
        `}</style>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product: any, index: number) => {
              const cardConfigs = [
                {
                  bg: 'from-slate-900/90 via-emerald-900/30 to-gray-900/90',
                  accent: 'emerald',
                  accentHex: '#10b981',
                  shadow: 'emerald-500/25',
                  border: 'emerald-500/30',
                  glow: 'emerald-400/15',
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                  tier: 'STARTER',
                  tierColor: 'from-emerald-500 to-emerald-600',
                  scale: 'hover:scale-105',
                  popular: false
                },
                {
                  bg: 'from-slate-900/95 via-blue-900/40 to-gray-900/95',
                  accent: 'blue',
                  accentHex: '#3b82f6',
                  shadow: 'blue-500/30',
                  border: 'blue-500/40',
                  glow: 'blue-400/20',
                  icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
                  tier: 'PROFESSIONAL',
                  tierColor: 'from-blue-500 to-blue-600',
                  scale: 'hover:scale-110',
                  popular: true
                },
                {
                  bg: 'from-slate-900/95 via-purple-900/40 to-gray-900/95',
                  accent: 'purple',
                  accentHex: '#8b5cf6',
                  shadow: 'purple-500/30',
                  border: 'purple-500/40',
                  glow: 'purple-400/20',
                  icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
                  tier: 'PREMIUM',
                  tierColor: 'from-purple-500 to-purple-600',
                  scale: 'hover:scale-105',
                  popular: false
                }
              ];
              const config = cardConfigs[index % 3];
              const isPopular = config.popular;
              
              return (
                <div key={product.id} className={`group relative bg-gradient-to-br ${config.bg} backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-${config.shadow} transition-all duration-700 transform hover:-translate-y-6 ${config.scale} overflow-hidden border-2 ${isPopular ? `border-${config.accent}-400/60 premium-glow premium-float` : `border-${config.border} card-glow`} ${isPopular ? 'ring-2 ring-blue-400/20' : ''} shimmer-effect`}>
                  {/* Enhanced glow effects */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-${config.accent}-500/20 via-transparent to-${config.accent}-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse`}></div>
                  
                  {/* Enhanced floating elements */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className={`absolute top-4 right-4 w-3 h-3 bg-${config.accent}-400/60 rounded-full animate-ping`} style={{animationDelay: '0.5s'}}></div>
                    <div className={`absolute bottom-6 left-6 w-2 h-2 bg-${config.accent}-300/40 rounded-full animate-pulse`} style={{animationDelay: '1s'}}></div>
                    <div className={`absolute top-1/2 right-8 w-1 h-1 bg-${config.accent}-200/60 rounded-full animate-ping`} style={{animationDelay: '1.5s'}}></div>
                    <div className={`absolute bottom-1/3 left-4 w-1.5 h-1.5 bg-${config.accent}-400/30 rounded-full animate-pulse`} style={{animationDelay: '2s'}}></div>
                  </div>
                  
                  {/* Enhanced Tier Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className={`bg-gradient-to-r ${config.tierColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse group-hover:animate-bounce transition-all duration-300 group-hover:scale-110`} style={{animationDuration: '2s'}}>
                      {config.tier}
                      <div className={`absolute inset-0 bg-gradient-to-r ${config.tierColor.replace('to-', 'to-').replace('from-', 'from-').replace('-500', '-400').replace('-600', '-500')} rounded-full opacity-0 group-hover:opacity-50 animate-ping`}></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Popular Badge */}
                  {isPopular && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce" style={{animationDuration: '1s'}}>
                        POPULAR
                      </div>
                    </div>
                  )}
                  
                  {/* Enhanced Hero Section */}
                  <div className={`h-48 bg-gradient-to-br from-slate-900 to-gray-900 relative overflow-hidden flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-slate-800 group-hover:to-gray-800 transition-all duration-500`}>
                    <div className="relative transform group-hover:scale-110 transition-all duration-500">
                      <svg className={`w-20 h-20 text-${config.accent}-400 opacity-60 group-hover:opacity-100 group-hover:text-${config.accent}-300 transition-all duration-500 group-hover:drop-shadow-lg`} fill="currentColor" viewBox="0 0 24 24">
                        <path d={config.icon}/>
                      </svg>
                      <div className={`absolute inset-0 bg-${config.accent}-400/20 rounded-full blur-xl group-hover:bg-${config.accent}-400/40 group-hover:animate-pulse transition-all duration-500`}></div>
                      {/* Orbiting particles */}
                      <div className={`absolute -top-2 -right-2 w-1 h-1 bg-${config.accent}-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300`} style={{animationDelay: '0.2s'}}></div>
                      <div className={`absolute -bottom-2 -left-2 w-1 h-1 bg-${config.accent}-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300`} style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/50 transition-all duration-500"></div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-8">
                    <h3 className="text-3xl font-black mb-3 text-white drop-shadow-lg">
                      <TypewriterEffect 
                        text={product.name.includes('30x AI Prompts') ? '30x AI Prompts' : product.name} 
                        className="text-3xl font-black text-white drop-shadow-lg" 
                        speed={80} 
                      />
                    </h3>
                    <p className="text-gray-200 mb-6 leading-relaxed text-base font-medium">
                      <TypewriterEffect 
                        text={product.name.includes('30x AI Prompts') 
                          ? "Full project structure split into 30x prompts, feed into ChatGPT. Save the project, adjust prompts best suited for your goals & get to work. This is the most cost effective option because it requires the most work from you to put everything together." 
                          : "AI business strategies can help level the playing field in today's competitive market."} 
                        className="text-gray-200 leading-relaxed text-base font-medium" 
                        speed={30} 
                        startDelay={1000}
                      />
                    </p>
                    <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                      <TypewriterEffect 
                        text={product.description} 
                        className="text-gray-300 leading-relaxed text-sm" 
                        speed={25} 
                        startDelay={2000}
                      />
                    </p>
                    
                    {/* Product Benefits - Only for 30x AI Prompts */}
                    {product.name.includes('30x AI Prompts') && (
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center space-x-3 transform group-hover:translate-x-2 transition-all duration-300" style={{transitionDelay: '0.1s'}}>
                          <div className={`w-2.5 h-2.5 bg-${config.accent}-400 rounded-full shadow-lg group-hover:shadow-${config.accent}-400/50 group-hover:animate-pulse group-hover:scale-110 transition-all duration-300`}></div>
                          <span className="text-xs text-gray-200 font-medium group-hover:text-white transition-colors duration-300">✨ Ready-to-use AI prompts for immediate business results</span>
                        </div>
                        <div className="flex items-center space-x-3 transform group-hover:translate-x-2 transition-all duration-300" style={{transitionDelay: '0.2s'}}>
                          <div className={`w-2.5 h-2.5 bg-${config.accent}-400 rounded-full animate-pulse shadow-lg group-hover:shadow-${config.accent}-400/50 group-hover:scale-110 transition-all duration-300`}></div>
                          <span className="text-xs text-gray-200 font-medium group-hover:text-white transition-colors duration-300">🎯 Step-by-step framework from idea to profitable business</span>
                        </div>
                        <div className="flex items-center space-x-3 transform group-hover:translate-x-2 transition-all duration-300" style={{transitionDelay: '0.3s'}}>
                          <div className={`w-2.5 h-2.5 bg-${config.accent}-400 rounded-full animate-pulse shadow-lg group-hover:shadow-${config.accent}-400/50 group-hover:scale-110 transition-all duration-300`}></div>
                          <span className="text-xs text-gray-200 font-medium group-hover:text-white transition-colors duration-300">💼 Full business blueprint: ecommerce, marketing & growth tactics</span>
                        </div>
                        <div className="flex items-center space-x-3 transform group-hover:translate-x-2 transition-all duration-300" style={{transitionDelay: '0.4s'}}>
                          <div className={`w-2.5 h-2.5 bg-${config.accent}-400 rounded-full animate-pulse shadow-lg group-hover:shadow-${config.accent}-400/50 group-hover:scale-110 transition-all duration-300`}></div>
                          <span className="text-xs text-gray-200 font-medium group-hover:text-white transition-colors duration-300">🚀 Beginner-friendly: just follow prompts, ask questions & build</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Enhanced Pricing Section */}
                    <div className="text-center mb-6">
                      <div className="text-5xl font-black text-white drop-shadow-lg mb-2">A${product.price.toFixed(2)}</div>
                      {product.originalPrice && (
                        <div className="text-lg text-gray-500 line-through mb-1">
                          A${product.originalPrice.toFixed(2)}
                        </div>
                      )}
                      <div className="text-sm text-gray-300 font-medium">One-time payment</div>
                    </div>
                    
                    {/* Enhanced Action Buttons */}
                    <Link href={`/products/${product.id}`} className={`w-full block text-center py-4 rounded-xl font-bold transition-all duration-500 hover:scale-110 shadow-lg bg-gradient-to-r ${config.tierColor} hover:${config.tierColor.replace('to-', 'hover:to-').replace('from-', 'hover:from-').replace('-500', '-400').replace('-600', '-500')} text-white border border-${config.accent}-500/30 hover:shadow-${config.accent}-500/40 hover:shadow-2xl transform hover:-translate-y-1 relative overflow-hidden group/btn`}>
                      <span className="relative z-10">Start Learning</span>
                      <div className={`absolute inset-0 bg-gradient-to-r from-${config.accent}-400 to-${config.accent}-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300`}></div>
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-white">No products found</h3>
            <p className="text-gray-200 mt-2">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}