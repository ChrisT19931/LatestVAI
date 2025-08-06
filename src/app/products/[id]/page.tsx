'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import AddToCartButton from '../../../components/AddToCartButton';
import BuyNowButton from '../../../components/BuyNowButton';
import CountdownTimer from '../../../components/CountdownTimer';



// Define the product type
type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  category?: string;
  is_featured?: boolean;
  is_active?: boolean;
  productType: 'digital' | 'physical'; // Required by AddToCartButton
  [key: string]: any;
};
// Fallback products data
const fallbackProducts = {
  '1': {
    id: '1',
    name: 'AI Tools Mastery Guide 2025',
    description: 'Step by step how to create an online business in full with 30 lessons: 10x on LLMs (ChatGPT/Gemini/etc), 10x on Replit/Claude, 10x on Cursor/Trae - 90% of what you need to build an online business yourself.',
    price: 25.00,
    originalPrice: 50.00,
    image_url: '/images/products/ai-tools-mastery-guide.svg',
    category: 'courses',
    is_active: true,
    featured: false,
    product_type: 'digital',
    created_at: new Date().toISOString(),
    benefits: [
      '10x lessons on LLMs: ChatGPT, Gemini & AI tools for business building',
      '10x lessons on Replit & Claude for development and automation',
      '10x lessons on Cursor & Trae AI for advanced coding and implementation',
      'Complete step-by-step guide covering 90% of online business creation',
      'Comprehensive 30-lesson structure for complete business mastery',
      'Everything you need to build an online business yourself'
    ],
    details: {
      description: 'Master the complete process of building an online business with our comprehensive 30-lesson guide. This step-by-step course covers 90% of what you need to create, develop, and scale your online business using the most powerful AI tools available today.',
      features: [
        '10 comprehensive lessons on LLMs (ChatGPT, Gemini, etc.) for business strategy',
        '10 detailed lessons on Replit & Claude for development and automation',
        '10 advanced lessons on Cursor & Trae AI for coding and implementation',
        'Complete business creation methodology from start to finish',
        'Real-world examples and practical implementation guides',
        'Step-by-step tutorials for each AI tool and platform'
      ],
      includes: [
        'Complete 30-lesson structured course',
        'LLM mastery for business planning and strategy',
        'Replit & Claude development tutorials',
        'Cursor & Trae AI coding implementation guides',
        'Business creation templates and frameworks',
        'Practical exercises and real-world examples'
      ],
      lessons: 30,
      format: 'PDF Guide',
      language: 'English',
      level: 'Beginner to Advanced',
      downloadSize: '3.2 MB',
      completionTime: '2-3 weeks'
    }
  },
  '2': {
    id: '2',
    name: '30x AI Prompts',
    description: 'Full project structure split into 30x prompts, feed into ChatGPT. Save the project, adjust prompts best suited for your goals & get to work. This is the most cost effective option because it requires the most work from you to put everything together.',
    price: 10.00,
    originalPrice: 25.00,
    image_url: '/images/products/ai-prompts-arsenal.svg',
    category: 'tools',
    is_active: true,
    featured: true,
    product_type: 'digital',
    created_at: new Date().toISOString(),
    benefits: [
      '30x proven AI prompts for instant business planning',
      'Prompts structured for start-finish online business build',
      'Complete ecommerce, marketing & scaling strategies included',
      'No experience required, follow the steps, ask your project questions, this structure will set the foundation'
    ],
    details: {
      description: 'Full project structure split into 30x prompts, feed into ChatGPT. Save the project, adjust prompts best suited for your goals & get to work. This is the most cost effective option because it requires the most work from you to put everything together.',
      features: [
        '30x proven AI prompts for instant business planning',
        'Prompts structured for start-finish online business build',
        'Complete ecommerce, marketing & scaling strategies included',
        'No experience required, follow the steps, ask your project questions, this structure will set the foundation',
      ],
      includes: [
        'Full project structure split into 30x prompts',
        'Feed directly into ChatGPT for instant results',
        'Adjustable prompts suited for your specific goals',
        'Most cost effective option requiring your assembly work',
        'Complete foundation structure for business building'
      ],
      promptCount: 30,
      format: 'PDF',
      language: 'English',
      compatibility: 'ChatGPT, Claude, Gemini, and other AI tools',
      downloadSize: '1.2 MB'
    }
  },
  '3': {
    id: '3',
    name: 'Complete Business Deployment Coaching',
    description: 'The ultimate solution for entrepreneurs who want complete knowledge and guidance to deploy a custom-built website or online business from start to finish. Take full ownership of your front-end and back-end with the ability to edit and customize on the fly.',
    price: 500.00,
    image_url: '/images/products/ai-business-strategy-session.svg',
    category: 'services',
    is_active: true,
    featured: false,
    product_type: 'digital',
    created_at: new Date().toISOString(),
    benefits: [
      'Complete knowledge transfer for full business ownership',
      'Custom website/business deployment from start to finish',
      'Front-end and back-end mastery for total control',
      'Edit and customize your site on the fly without dependencies',
      'Personalized coaching tailored to your specific business',
      'Comprehensive implementation support and guidance',
      'Long-term independence and self-sufficiency'
    ],
    details: {
      description: 'Take complete control of your online business with our comprehensive coaching program. Learn everything you need to deploy, manage, and customize your own website or online store from start to finish. This personalized coaching experience provides all the knowledge and skills required for true business ownership and independence.',
      features: [
        'Personalized 1-on-1 coaching sessions',
        'Complete front-end and back-end development training',
        'Custom website/business deployment walkthrough',
        'Technical independence and self-sufficiency',
        'On-the-fly editing and customization capabilities',
        'Long-term business management strategies'
      ],
      includes: [
        'Multiple coaching sessions with screen recordings',
        'Comprehensive development and deployment guidance',
        'Complete technical knowledge transfer',
        'Custom implementation based on your business needs',
        'Detailed documentation and reference materials',
        'Session recording for future reference',
        'Follow-up email support for questions'
      ],
      duration: 'Multiple sessions',
      format: 'Screen-recorded Google Meet sessions',
      language: 'English',
      deliverables: 'Technical documentation, Implementation guides, Session recordings',
      followUp: 'Email support included',
      note: 'This package provides complete knowledge transfer for full business ownership and independence.'
    }
  }
};

export default function ProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  const handleAddToCart = () => {
    if (product) {
      // This will be handled by the AddToCartButton component
      // but we need to provide a callback for the 3D component
      const event = new CustomEvent('addToCart', { detail: product });
      window.dispatchEvent(event);
    }
  };
  
  useEffect(() => {
    async function fetchProduct() {
      if (!params?.id) return;
      
      const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
      
      try {
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .eq('is_active', true)
          .single();
        
        if (!error && data) {
          // Ensure productType is set (required by AddToCartButton)
          setProduct({
            ...data,
            productType: ((data.product_type as 'digital' | 'physical') || 'digital') as 'digital' | 'physical'
          });
          setLoading(false);
          return;
        }
        
        // Fallback to hardcoded products if not found in database
        if (fallbackProducts[id as keyof typeof fallbackProducts]) {
          const fallbackProduct = fallbackProducts[id as keyof typeof fallbackProducts];
          setProduct({
            ...fallbackProduct,
            description: fallbackProduct.description || '',
            productType: ((fallbackProduct.product_type as 'digital' | 'physical') || 'digital') as 'digital' | 'physical'
          });
        } else {
          // Product not found
          router.push('/not-found');
        }
      } catch (e) {
        console.error('Error fetching product:', e);
        // Try fallback
        if (fallbackProducts[id as keyof typeof fallbackProducts]) {
          const fallbackProduct = fallbackProducts[id as keyof typeof fallbackProducts];
          setProduct({
            ...fallbackProduct,
            description: fallbackProduct.description || '',
            productType: ((fallbackProduct.product_type as 'digital' | 'physical') || 'digital') as 'digital' | 'physical'
          });
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [params?.id, router]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }
  
  // Add animation styles
  const animationStyles = `
    @keyframes book-flip {
      0%, 100% { transform: rotateY(0deg) scale(1); }
      25% { transform: rotateY(-15deg) scale(1.05); }
      50% { transform: rotateY(0deg) scale(1.1); }
      75% { transform: rotateY(15deg) scale(1.05); }
    }
    @keyframes page-turn {
      0%, 100% { transform: translateX(-100%) skewX(0deg); opacity: 0; }
      50% { transform: translateX(0%) skewX(-10deg); opacity: 0.3; }
    }
    @keyframes rocket-launch {
      0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
      25% { transform: translateY(-10px) rotate(-5deg) scale(1.05); }
      50% { transform: translateY(-20px) rotate(0deg) scale(1.1); }
      75% { transform: translateY(-10px) rotate(5deg) scale(1.05); }
    }
    @keyframes rocket-trail {
      0%, 100% { height: 20px; opacity: 0.8; }
      50% { height: 40px; opacity: 1; }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.5); }
    }
    @keyframes target-focus {
      0%, 100% { transform: scale(1) rotateZ(0deg); }
      25% { transform: scale(1.05) rotateZ(-2deg); }
      50% { transform: scale(1.1) rotateZ(0deg); }
      75% { transform: scale(1.05) rotateZ(2deg); }
    }
    @keyframes target-ring-1 {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
      50% { transform: scale(1.1) rotate(180deg); opacity: 0.4; }
    }
    @keyframes target-ring-2 {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
      50% { transform: scale(1.15) rotate(-180deg); opacity: 0.5; }
    }
    @keyframes target-ring-3 {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.4; }
      50% { transform: scale(1.2) rotate(180deg); opacity: 0.6; }
    }
    @keyframes coaching-arrow {
      0%, 100% { transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1); opacity: 0.8; }
      25% { transform: translateX(-50%) translateY(-50%) rotate(15deg) scale(1.1); opacity: 1; }
      50% { transform: translateX(-50%) translateY(-50%) rotate(0deg) scale(1.2); opacity: 1; }
      75% { transform: translateX(-50%) translateY(-50%) rotate(-15deg) scale(1.1); opacity: 1; }
    }
    @keyframes web-build {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
      25% { transform: translateY(-5px) scale(1.05); opacity: 0.9; }
      50% { transform: translateY(-10px) scale(1.1); opacity: 1; }
      75% { transform: translateY(-5px) scale(1.05); opacity: 0.9; }
    }
    @keyframes code-pulse {
      0%, 100% { box-shadow: 0 0 5px rgba(147, 51, 234, 0.5); }
      50% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.8); }
    }
    .animate-book-flip {
      animation: book-flip 4s ease-in-out infinite;
      transform-style: preserve-3d;
    }
    .animate-page-turn {
      animation: page-turn 6s ease-in-out infinite;
    }
    .animate-rocket-launch {
      animation: rocket-launch 4s ease-in-out infinite;
    }
    .animate-web-build {
      animation: web-build 4s ease-in-out infinite;
    }
    .animate-code-pulse {
      animation: code-pulse 3s ease-in-out infinite;
    }
    .animate-rocket-trail {
      animation: rocket-trail 2s ease-in-out infinite;
    }
    .animate-twinkle {
      animation: twinkle 3s ease-in-out infinite;
    }
    .animate-target-focus {
      animation: target-focus 4s ease-in-out infinite;
      transform-style: preserve-3d;
    }
    .animate-target-ring-1 {
      animation: target-ring-1 6s linear infinite;
    }
    .animate-target-ring-2 {
      animation: target-ring-2 8s linear infinite;
    }
    .animate-target-ring-3 {
      animation: target-ring-3 10s linear infinite;
    }
    .animate-coaching-arrow {
      animation: coaching-arrow 3s ease-in-out infinite;
    }
  `;
  
  // Dynamic color configuration based on product category
  const getProductColors = (productId: string, category?: string) => {
    if (productId === '2' || category === 'tools') {
      return {
        primary: 'emerald',
        secondary: 'green',
        accent: 'emerald-400',
        gradient: 'from-emerald-600 to-green-600',
        lightGradient: 'from-emerald-500/10 via-green-500/10 to-emerald-500/10',
        ambientColors: {
          color1: 'bg-emerald-400/20',
          color2: 'bg-green-400/20',
          color3: 'bg-emerald-400/10'
        }
      };
    } else if (productId === '1' || category === 'courses') {
      return {
        primary: 'blue',
        secondary: 'purple',
        accent: 'blue-400',
        gradient: 'from-blue-600 to-purple-600',
        lightGradient: 'from-blue-500/10 via-purple-500/10 to-blue-500/10',
        ambientColors: {
          color1: 'bg-blue-400/20',
          color2: 'bg-purple-400/20',
          color3: 'bg-blue-400/10'
        }
      };
    } else {
      return {
        primary: 'purple',
        secondary: 'pink',
        accent: 'purple-400',
        gradient: 'from-purple-600 to-pink-600',
        lightGradient: 'from-purple-500/10 via-pink-500/10 to-purple-500/10',
        ambientColors: {
          color1: 'bg-purple-400/20',
          color2: 'bg-pink-400/20',
          color3: 'bg-purple-400/10'
        }
      };
    }
  };

  const colors = getProductColors(product.id, product.category);

  return (
    <div className="bg-black min-h-screen py-12">
      <style dangerouslySetInnerHTML={{__html: animationStyles}} />
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Blurred Lesson Preview */}
          <div className="relative">
            {/* Ambient lighting effects */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.lightGradient} rounded-3xl blur-3xl animate-pulse`}></div>
            <div className={`absolute top-4 left-4 w-32 h-32 ${colors.ambientColors.color1} rounded-full blur-2xl animate-twinkle`}></div>
            <div className={`absolute bottom-4 right-4 w-24 h-24 ${colors.ambientColors.color2} rounded-full blur-2xl animate-twinkle`} style={{animationDelay: '1s'}}></div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 ${colors.ambientColors.color3} rounded-full blur-3xl animate-twinkle`} style={{animationDelay: '2s'}}></div>
            
            {/* Preview Container */}
            <div className="relative z-10 rounded-3xl bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-800/90 backdrop-blur-sm border border-gray-700/50 shadow-2xl overflow-hidden">
              {/* Preview Header */}
              <div className={`bg-gradient-to-r ${colors.gradient} p-4 text-center`}>
                <h3 className="text-white font-bold text-lg">
                  {product.id === '1' && '📖 Inside Preview'}
                  {product.id === '2' && '🎯 Prompts Preview'}
                  {product.id === '3' && '🎬 Program Preview'}
                </h3>
                <p className={`text-${colors.primary}-100 text-sm`}>{product.name}</p>
              </div>

              
              {/* Blurred Content Preview */}
              <div className="p-6 h-96 overflow-hidden relative">
                {/* AI Tools Mastery Guide Preview */}
                {product.id === '1' && (
                  <div className="filter blur-sm select-none pointer-events-none">
                    <h4 className="text-xl font-bold text-white mb-4">Lesson 1: ChatGPT Setup for Business Success</h4>
                    <div className="space-y-3 text-gray-300">
                      <p>Welcome to your journey of building a profitable online business using AI tools. In this comprehensive lesson, you'll learn how to set up ChatGPT for maximum business impact.</p>
                      <h5 className="font-semibold text-white">What You'll Learn:</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Setting up ChatGPT Plus vs Free - which is right for your business</li>
                        <li>Creating custom instructions for consistent business outputs</li>
                        <li>Essential prompt templates for content creation</li>
                        <li>Integrating ChatGPT into your daily workflow</li>
                        <li>Advanced features and plugins for business automation</li>
                      </ul>
                      <div className="mt-4 p-3 bg-blue-900/30 rounded-lg">
                        <h6 className="font-semibold text-blue-300">Pro Tip:</h6>
                        <p className="text-sm">Always start with clear, specific prompts. The quality of your output depends on the quality of your input.</p>
                      </div>
                      <h5 className="font-semibold text-white mt-4">Step-by-Step Implementation:</h5>
                      <div className="space-y-2 text-sm">
                        <p><strong>Step 1:</strong> Create your ChatGPT account and choose the right plan</p>
                        <p><strong>Step 2:</strong> Set up custom instructions for your business niche</p>
                        <p><strong>Step 3:</strong> Test and refine your prompt templates</p>
                        <p><strong>Step 4:</strong> Integrate with your existing tools and workflows</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* AI Prompts Arsenal Preview */}
                 {product.id === '2' && (
                   <div className="filter blur-sm select-none pointer-events-none">
                     <h4 className="text-xl font-bold text-white mb-4">Prompt #1: Blog Post Generator for Any Niche</h4>
                     <div className="space-y-3 text-gray-300">
                       <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                         <h5 className="font-semibold text-green-400 mb-2">📝 Copy-Paste Ready Prompt:</h5>
                         <p className="text-sm font-mono bg-gray-800/50 p-3 rounded border-l-4 border-green-400">
                           "Act as an expert content writer and SEO specialist. Create a comprehensive blog post about [TOPIC] for [TARGET AUDIENCE]. The blog post should be [WORD COUNT] words and include:
                         </p>
                       </div>
                       <h5 className="font-semibold text-white">What This Prompt Generates:</h5>
                       <ul className="list-disc list-inside space-y-1 text-sm">
                         <li>SEO-optimized blog posts for any niche or industry</li>
                         <li>Engaging headlines that capture reader attention</li>
                         <li>Well-structured content with proper subheadings</li>
                         <li>Actionable tips and practical advice</li>
                         <li>Compelling calls-to-action that drive conversions</li>
                       </ul>
                       <div className="mt-4 p-3 bg-green-900/30 rounded-lg">
                         <h6 className="font-semibold text-green-300">Usage Instructions:</h6>
                         <p className="text-sm">Replace [TOPIC], [TARGET AUDIENCE], and [WORD COUNT] with your specific requirements. Works with ChatGPT, Claude, Gemini, and other AI tools.</p>
                       </div>
                       <h5 className="font-semibold text-white mt-4">More Prompts Include:</h5>
                       <div className="space-y-1 text-sm">
                         <p><strong>Prompt #2:</strong> Social Media Content Calendar Creator</p>
                         <p><strong>Prompt #3:</strong> Email Newsletter Template Builder</p>
                         <p><strong>Prompt #4:</strong> YouTube Video Script Writer</p>
                         <p className="text-green-400">...and 26 more professional prompts!</p>
                       </div>
                     </div>
                   </div>
                 )}
                 
                 {/* AI Business Strategy Session Preview */}
                 {product.id === '3' && (
                   <div className="filter blur-sm select-none pointer-events-none">
                     <h4 className="text-xl font-bold text-white mb-4">Session Sample: "Building Your E-commerce Store"</h4>
                     <div className="space-y-3 text-gray-300">
                       <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
                         <h5 className="font-semibold text-orange-400 mb-2">🎬 Live Screen Recording Sample:</h5>
                         <p className="text-sm bg-gray-800/50 p-3 rounded border-l-4 border-orange-400">
                           "Welcome to your personalized coaching program! Over these sessions, we'll build your complete online business from scratch and transfer all the knowledge you need to maintain and customize it independently..."
                         </p>
                       </div>
                       <h5 className="font-semibold text-white">What You'll Experience:</h5>
                       <ul className="list-disc list-inside space-y-1 text-sm">
                         <li>Comprehensive knowledge transfer for complete ownership</li>
                         <li>Step-by-step guidance with detailed explanations</li>
                         <li>Front-end and back-end development mastery</li>
                         <li>Professional deployment and customization techniques</li>
                         <li>Interactive Q&A throughout multiple sessions</li>
                       </ul>
                       <div className="mt-4 p-3 bg-orange-900/30 rounded-lg">
                         <h6 className="font-semibold text-orange-300">Program Format:</h6>
                         <p className="text-sm">Multiple screen-recorded sessions with comprehensive technical documentation and implementation guides for complete business independence.</p>
                       </div>
                       <h5 className="font-semibold text-white mt-4">Program Outcomes:</h5>
                       <div className="space-y-1 text-sm">
                         <p><strong>✓ Complete Knowledge:</strong> Full technical understanding</p>
                         <p><strong>✓ Independence:</strong> Edit and customize on your own</p>
                         <p><strong>✓ Ownership:</strong> Total control of your online business</p>
                         <p className="text-orange-400">...the path to complete business self-sufficiency!</p>
                       </div>
                     </div>
                   </div>
                 )}
                 


                
                {/* Unlock overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-6">
                   <div className="text-center">
                     <div className={`bg-gradient-to-r ${colors.gradient} text-white px-6 py-3 rounded-full font-semibold shadow-lg`}>
                       {product.id === '1' && '🔓 Unlock All 30 Lessons'}
                       {product.id === '2' && '🔓 Unlock All 30 Prompts'}
                       {product.id === '3' && '🔓 Book Your Coaching Program'}
                     </div>

                     <p className="text-gray-300 text-sm mt-2">
                       {product.id === '1' ? 'Get instant access to the complete guide' : 
                        product.id === '2' ? 'Get instant access to all professional prompts' : 
                        product.id === '3' ? 'Get complete business deployment knowledge' :
                        ''}
                     </p>
                   </div>
                 </div>
              </div>
              
              {/* Interactive glow border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${colors.lightGradient.replace('/10', '/20')} opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4 glow-text">{product.name}</h1>
              <p className="text-xl text-gray-300 mb-6">{product.description}</p>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-white glow-text">A${product.price.toFixed(2)} AUD</span>
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full text-sm font-medium shadow-lg">
                  {product.category === 'services' ? 'Consultation' : 'Digital Download'}
                </span>
              </div>
            </div>

            {/* Complete Ebook Content */}
            {product.id === '1' && (
              <div className="space-y-8">
                {/* Table of Contents */}
                <div className="glass-panel rounded-lg p-6">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2 glow-text">
                    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    🔥 30 Lessons to Build Your AI-Powered Online Business
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">ChatGPT Business Mastery (Lessons 1-8)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">1.</span>
                          <span>ChatGPT Setup for Business Success</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">2.</span>
                          <span>Content Creation with ChatGPT</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">3.</span>
                          <span>ChatGPT for Customer Service Automation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">4.</span>
                          <span>Email Marketing with ChatGPT</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">5.</span>
                          <span>Social Media Strategy & Content</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">6.</span>
                          <span>Product Descriptions & Sales Copy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">7.</span>
                          <span>Blog Writing & SEO Optimization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">8.</span>
                          <span>ChatGPT Business Automation</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Gemini & Claude Integration (Lessons 9-16)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">9.</span>
                          <span>Gemini for Data Analysis & Insights</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">10.</span>
                          <span>Market Research with Gemini</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">11.</span>
                          <span>Claude for Advanced Writing Projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">12.</span>
                          <span>Research & Documentation with Claude</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">13.</span>
                          <span>Combining AI Tools for Maximum Impact</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">14.</span>
                          <span>AI-Powered Business Planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">15.</span>
                          <span>Competitive Analysis with AI</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">16.</span>
                          <span>AI Content Strategy Development</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Trae/Cursor Development (Lessons 17-24)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">17.</span>
                          <span>Introduction to Trae/Cursor for Business</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">18.</span>
                          <span>Building Landing Pages with AI</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">19.</span>
                          <span>E-commerce Store Development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">20.</span>
                          <span>Automated Code Generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">21.</span>
                          <span>API Integration & Automation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">22.</span>
                          <span>Database Management with AI</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">23.</span>
                          <span>Mobile App Development Basics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">24.</span>
                          <span>Deployment & Maintenance</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Business Launch & Scale (Lessons 25-30)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">25.</span>
                          <span>AI-Powered Marketing Campaigns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">26.</span>
                          <span>Customer Acquisition Strategies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">27.</span>
                          <span>Revenue Optimization with AI</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">28.</span>
                          <span>Scaling Your AI Business</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">29.</span>
                          <span>Building AI-Powered Teams</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">30.</span>
                          <span>Future-Proofing Your Business</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>


              </div>
            )}

            {/* AI Prompts Arsenal Content */}
            {product.id === '2' && (
              <div className="space-y-8">
                {/* Prompts Preview */}
                <div className="glass-panel rounded-lg p-6">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2 glow-text">
                    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    💯 30 Professional AI Prompts for Business Success
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Business Planning Prompts (1-8)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">1.</span>
                          <span>AI-Powered Business Plan Generator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">2.</span>
                          <span>Market Research & Competitor Analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">3.</span>
                          <span>Unique Value Proposition Creator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">4.</span>
                          <span>Business Model Canvas Generator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">5.</span>
                          <span>SWOT Analysis Framework</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">6.</span>
                          <span>Financial Projection Template</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">7.</span>
                          <span>Target Customer Profile Builder</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">8.</span>
                          <span>Business Name & Domain Generator</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">E-commerce Setup Prompts (9-16)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">9.</span>
                          <span>E-commerce Platform Selection Guide</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">10.</span>
                          <span>Product Catalog Structure Creator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">11.</span>
                          <span>Product Description Template</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">12.</span>
                          <span>E-commerce Policy Generator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">13.</span>
                          <span>Shipping & Fulfillment Strategy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">14.</span>
                          <span>Payment Gateway Comparison Tool</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">15.</span>
                          <span>Customer Service Script Builder</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">16.</span>
                          <span>E-commerce SEO Strategy Creator</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Marketing & Growth Prompts (17-24)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">17.</span>
                          <span>Content Marketing Strategy Blueprint</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">18.</span>
                          <span>Social Media Marketing Plan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">19.</span>
                          <span>Email Marketing Campaign Sequence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">20.</span>
                          <span>PPC Advertising Strategy Creator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">21.</span>
                          <span>Conversion Rate Optimization Plan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">22.</span>
                          <span>Customer Retention Program Builder</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">23.</span>
                          <span>Affiliate Marketing Strategy Creator</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">24.</span>
                          <span>Marketing Analytics Dashboard Designer</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Development & Deployment Prompts (25-30)</h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">25.</span>
                          <span>GitHub Repository Setup Guide</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">26.</span>
                          <span>Vercel Deployment Configuration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">27.</span>
                          <span>Full-Stack Project Environment Setup</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">28.</span>
                          <span>CI/CD Pipeline Configuration</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">29.</span>
                          <span>Production Monitoring & Maintenance Plan</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 font-bold">30.</span>
                          <span>Business Scaling Roadmap Creator</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Prompts Preview Sample */}
                <div className="glass-panel rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    Sample Prompt Preview
                  </h3>
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                    <div className="filter blur-sm select-none pointer-events-none">
                      <h4 className="text-green-400 font-bold mb-2">Prompt #1: Blog Post Generator for Any Niche</h4>
                      <div className="text-gray-300 text-sm space-y-2">
                        <p><strong>Prompt:</strong> "Act as an expert content writer and SEO specialist. Create a comprehensive blog post about [TOPIC] for [TARGET AUDIENCE]. The blog post should be [WORD COUNT] words and include:</p>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                          <li>An attention-grabbing headline</li>
                          <li>An engaging introduction that hooks the reader</li>
                          <li>5-7 main sections with subheadings</li>
                          <li>Actionable tips and practical advice</li>
                          <li>A compelling conclusion with a call-to-action</li>
                        </ul>
                        <p>Make sure to optimize for SEO with relevant keywords and maintain a [TONE] tone throughout..."</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4">
                      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                        🔓 Unlock All 30 Prompts
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Business Strategy Session Content */}
            {product.id === '3' && (
              <div className="space-y-8">
                {/* Session Overview */}
                <div className="glass-panel rounded-lg p-6">
                  <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2 glow-text">
                    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    🎯 Premium AI Business Strategy Session
                  </h3>
                  
                  {/* Session Structure */}
                  <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-400/30 mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="text-blue-400">⏱️</span>
                      60-Minute Session Breakdown
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-400/20">
                        <h5 className="font-semibold text-blue-300 mb-2">First 15 Minutes</h5>
                        <p className="text-sm text-gray-300">🎯 Understanding your goals and business ideas</p>
                      </div>
                      <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-400/20">
                        <h5 className="font-semibold text-purple-300 mb-2">Next 30 Minutes</h5>
                        <p className="text-sm text-gray-300">🖥️ Live demonstration with screen sharing</p>
                      </div>
                      <div className="bg-green-900/30 p-4 rounded-lg border border-green-400/20">
                        <h5 className="font-semibold text-green-300 mb-2">Final 15 Minutes</h5>
                        <p className="text-sm text-gray-300">❓ Q&A session and clarifications</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center space-x-4 transform transition-all duration-300">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
                      <span className="text-sm text-gray-100 font-medium">📹 60-minute Google Meet live presentation with shared screen</span>
                    </div>
                    <div className="flex items-center space-x-4 transform transition-all duration-300">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
                      <span className="text-sm text-gray-100 font-medium">📋 Detailed step-by-step report delivered after session</span>
                    </div>
                    <div className="flex items-center space-x-4 transform transition-all duration-300">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
                      <span className="text-sm text-gray-100 font-medium">💼 Complete knowledge transfer for full business ownership</span>
                    </div>
                    <div className="flex items-center space-x-4 transform transition-all duration-300">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
                      <span className="text-sm text-gray-100 font-medium">🌐 Custom website/business deployment from start to finish</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg p-6 border border-blue-400/30">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="text-blue-400">💎</span>
                      Premium Investment Package
                    </h4>
                    <div className="text-center mb-6">
                      <div className="text-lg text-gray-400 mb-1">Business Service</div>
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 drop-shadow-2xl mb-2">A$500</div>
                      <div className="text-sm text-blue-300 font-medium">💎 Business Investment</div>
                      <div className="text-sm text-green-400 font-medium">Value-Focused Pricing</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-400/20">
                        <h5 className="font-semibold text-blue-300 mb-2">Session Includes:</h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Live screen-shared presentation</li>
                          <li>• Real-time Q&A and consultation</li>
                          <li>• Personalized business assessment</li>
                          <li>• Custom strategy development</li>
                        </ul>
                      </div>
                      <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-400/20">
                        <h5 className="font-semibold text-purple-300 mb-2">Post-Session Benefits:</h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Comprehensive written report</li>
                          <li>• Step-by-step implementation guide</li>
                          <li>• Business deployment roadmap</li>
                          <li>• Ongoing support packages available</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* Countdown Timer - Only show for coaching product */}
            {product?.id === '3' && (
              <CountdownTimer variant="product" className="mb-6" />
            )}

            {/* CTA Button */}
            <div className="glass-panel rounded-lg p-6 text-center">
              <BuyNowButton product={product} />
              <p className="text-gray-300 text-sm mt-4">Secure checkout • Instant download</p>
              <div className="mt-4 pt-4 border-t border-gray-600">
                <AddToCartButton product={product} />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-700">
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="h-5 w-5 text-green-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="h-5 w-5 text-blue-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{product.category === 'services' ? 'Quick Booking' : 'Instant Download'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="h-5 w-5 text-purple-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Quality Products</span>
              </div>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
}