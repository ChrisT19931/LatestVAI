'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSimpleAuth } from '@/contexts/SimpleAuthContext';
import { toast } from 'react-hot-toast';

interface PromptsContentProps {
  hasAccess?: boolean;
  isAdmin?: boolean;
}

export default function PromptsContent({ hasAccess = false, isAdmin = false }: PromptsContentProps) {
  const { user } = useSimpleAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Just set loading to false after component mounts
    setIsLoading(false);
  }, []);

  const handleDownload = () => {
    if (!hasAccess) {
      toast.error('Please log in to download');
      return;
    }

    setIsDownloading(true);
    
    // Create download link
    const link = document.createElement('a');
    link.href = '/downloads/ai-prompts-collection.pdf';
    link.download = 'AI-Prompts-Collection.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download started!');
    setTimeout(() => setIsDownloading(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-black py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-3xl font-bold text-white mb-4">AI Prompts Collection 2025</h1>
            <p className="text-gray-300 mb-8">
              Access our premium collection of AI prompts for maximum productivity and income.
            </p>
            
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-300 text-sm mb-2">🔒 Access Required</p>
              <p className="text-gray-300 text-sm">Please log in or purchase to access this content</p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link 
                href="/login" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link 
                href="/products/2" 
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Purchase
              </Link>
            </div>
            
            <div className="text-sm text-gray-400 mt-6">
              <Link href="/my-account" className="text-emerald-400 hover:text-emerald-300">
                ← Back to My Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Prompts Collection 2025</h1>
          <p className="text-xl text-gray-300">
            Premium AI prompts for content creation, business automation, and income generation
          </p>
        </div>

        {/* AI Prompts Collection */}
        <div className="space-y-8">
          
          {/* Business Planning Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              📊 Business Planning Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">AI-Powered Business Plan Generator</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive business plan for a [BUSINESS TYPE] in the [INDUSTRY] market. Include: executive summary, company description, market analysis with AI-derived insights, competitive landscape, organization structure, product/service offerings, marketing and sales strategy, financial projections for 3 years, and funding requirements. Focus on [UNIQUE VALUE PROPOSITION] as the key differentiator and incorporate AI tools for [SPECIFIC BUSINESS FUNCTIONS]."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Launch your business with AI-enhanced planning.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Market Research & Competitor Analysis</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Conduct a comprehensive market research analysis for [PRODUCT/SERVICE] in the [INDUSTRY]. Include: target demographic profiling with psychographic details, competitor benchmarking of top 5 players (strengths, weaknesses, pricing, positioning), market size and growth projections, emerging trends and technologies, regulatory considerations, and strategic recommendations. Utilize AI tools to gather and analyze data for actionable insights."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Data-driven market insights powered by AI.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Unique Value Proposition Creator</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a compelling unique value proposition for [BUSINESS/PRODUCT] targeting [CUSTOMER SEGMENT]. Analyze: customer pain points, existing market solutions, competitive advantages, emotional benefits, and rational benefits. Create 5 UVP variations with different emphasis (innovation, reliability, experience, results, value) and test messaging for each. Include a primary statement (under 20 words) and supporting points for marketing materials."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Differentiate your business with clarity and impact.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Business Model Canvas Generator</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a detailed Business Model Canvas for [BUSINESS CONCEPT] in the [INDUSTRY]. For each section: 1) Key Partners, 2) Key Activities, 3) Key Resources, 4) Value Propositions, 5) Customer Relationships, 6) Channels, 7) Customer Segments, 8) Cost Structure, and 9) Revenue Streams - provide comprehensive analysis with AI-optimized strategies. Include alternative approaches for each section and metrics to evaluate success."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Visualize your entire business model on one page.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">SWOT Analysis Framework</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Conduct a comprehensive SWOT analysis for [BUSINESS/PRODUCT] in the [INDUSTRY] market. For each category: 1) Strengths - internal advantages and unique assets, 2) Weaknesses - internal limitations and improvement areas, 3) Opportunities - external favorable factors and market openings, 4) Threats - external challenges and competitive pressures. Include AI-powered competitive intelligence and prioritized action items for each quadrant."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Strategic analysis for informed decision-making.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Financial Projection Template</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive 3-year financial projection model for a [BUSINESS TYPE] with [REVENUE MODEL]. Include: monthly projections for year 1, quarterly for years 2-3, with detailed income statement, cash flow statement, balance sheet, break-even analysis, key financial ratios, and sensitivity analysis. Incorporate [INDUSTRY BENCHMARKS] and provide AI-powered scenario planning (best case, expected case, worst case) with assumptions clearly documented."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Financial roadmap with AI-enhanced forecasting.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Target Customer Profile Builder</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop detailed buyer personas for [BUSINESS/PRODUCT] with AI-enhanced customer insights. Create 3-5 distinct personas including: demographic details, psychographic profiles, goals and motivations, pain points and challenges, buying behavior, decision criteria, objections, preferred communication channels, and day-in-the-life scenarios. Include AI-generated content preferences and digital touchpoint mapping for each persona."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Know your customers at a deeper level.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Business Name & Domain Generator</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Generate 20 creative and strategic business name options for a [BUSINESS TYPE] in the [INDUSTRY] that conveys [KEY BRAND ATTRIBUTES]. For each name: check domain availability (.com, .io, .co), social media handle availability, trademark concerns, international considerations, and memorability factors. Include naming rationale, brand story potential, and AI-powered consumer perception analysis for top 5 options."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Find the perfect name for your business venture.</p>
              </div>
            </div>
          </div>

          {/* Development & Deployment Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🚀 Development & Deployment Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Business Scaling Framework</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive business scaling framework for a [BUSINESS TYPE] currently at [CURRENT STAGE] with [REVENUE/TEAM SIZE]. Include: operational scalability assessment, growth bottleneck identification, organizational structure evolution, systems and processes documentation, key performance indicators by department, technology stack recommendations, hiring roadmap with role prioritization, and capital requirements projection. Provide implementation timeline with critical milestones and risk mitigation strategies."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Systematic approach to sustainable business growth.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Customer Retention Strategy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a comprehensive customer retention strategy for a [BUSINESS TYPE] with [CUSTOMER BASE SIZE]. Include: customer segmentation by value and behavior, churn prediction model framework, loyalty program structure, personalized communication strategy, proactive engagement touchpoints, win-back campaign approach, customer feedback collection system, and retention metrics dashboard. Provide AI-powered recommendations for identifying at-risk customers and personalization opportunities."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Keep your customers coming back with strategic retention.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Operational Efficiency Audit</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive operational efficiency audit framework for a [BUSINESS TYPE]. Include assessment methodologies for: workflow optimization, resource allocation, technology utilization, team productivity, cost structure analysis, vendor management, quality control processes, and customer experience impact. Provide a prioritization matrix for improvement opportunities based on impact/effort, implementation roadmap, and ROI calculation methodology with specific KPIs for measuring success."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Streamline operations and reduce costs while improving quality.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Data-Driven Decision Framework</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design a comprehensive data-driven decision-making framework for [BUSINESS TYPE] focusing on [KEY BUSINESS AREAS]. Include: essential metrics and KPIs by department, data collection and integration methodology, reporting dashboard structure, analysis techniques for different decision types, statistical significance guidelines, A/B testing protocol, predictive modeling approach, and decision documentation process. Provide implementation roadmap with technology recommendations and team training requirements."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Make better business decisions with data-backed insights.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">International Expansion Strategy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive international expansion strategy for a [BUSINESS TYPE] looking to enter [TARGET REGION/COUNTRY]. Include: market opportunity assessment, competitive landscape analysis, entry mode evaluation (direct export, licensing, joint venture, acquisition), localization requirements, regulatory compliance checklist, supply chain/distribution strategy, pricing model adaptation, marketing approach, team structure, and financial projections. Provide risk assessment and mitigation strategies."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Expand your business globally with a strategic approach.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Strategic Partnership Framework</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a strategic partnership framework for a [BUSINESS TYPE] looking to accelerate growth through collaborations. Include: partnership opportunity identification methodology, partner evaluation criteria, value proposition development, partnership structure options (referral, co-marketing, integration, reseller, etc.), negotiation strategy, contract essentials, implementation roadmap, performance measurement, and relationship management best practices. Provide specific partnership ideas with potential ROI calculations."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Leverage strategic partnerships for accelerated growth.</p>
              </div>
            </div>
          </div>

          {/* How to Use These Prompts */}
          <div className="bg-gray-900 rounded-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">How to Use These Prompts</h2>
            <div className="space-y-4 text-gray-300">
              <p>1. <span className="font-semibold text-green-400">Customize for Your Business</span> - Replace all placeholder text in [BRACKETS] with your specific business information.</p>
              <p>2. <span className="font-semibold text-green-400">Use with Any AI Tool</span> - These prompts work with ChatGPT, Claude, Gemini, or any other AI assistant.</p>
              <p>3. <span className="font-semibold text-green-400">Iterate for Better Results</span> - If the first response isn't perfect, refine your prompt and try again.</p>
              <p>4. <span className="font-semibold text-green-400">Save Your Favorites</span> - Create a library of customized prompts that work well for your business.</p>
              <p>5. <span className="font-semibold text-green-400">Combine Prompts</span> - Mix elements from different prompts to create custom solutions for complex needs.</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <a href="#top" className="text-green-400 hover:text-green-300 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Top
            </a>
            <a href="#" onClick={handleDownload} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF
            </a>
          </div>
          </div>

          {/* E-commerce Setup Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🛒 E-commerce Setup Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">E-commerce Platform Selection Guide</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive comparison of e-commerce platforms for a [BUSINESS TYPE] selling [PRODUCT CATEGORY] with [EXPECTED MONTHLY SALES VOLUME]. Compare Shopify, WooCommerce, BigCommerce, Magento, and Squarespace across: setup costs, monthly fees, transaction fees, ease of use, design flexibility, inventory management, payment gateways, shipping options, marketing tools, SEO capabilities, scalability, and customer support. Include AI integration possibilities for each platform."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Choose the right foundation for your online store.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Product Catalog Structure Creator</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design an optimal product catalog structure for an e-commerce store selling [PRODUCT CATEGORY]. Include: category hierarchy (with primary, secondary, and tertiary categories), attribute framework, filtering system, tagging strategy, cross-selling relationships, and URL structure. Optimize for both user experience and SEO. Provide implementation guidelines for [PLATFORM] and AI-powered product recommendation engine setup."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Organize your products for maximum discoverability.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Product Description Template</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive product description template for [PRODUCT CATEGORY] that converts browsers to buyers. Include: attention-grabbing headline formula, emotional benefit-focused opening, feature-to-benefit translation framework, sensory language examples, social proof integration, technical specifications format, SEO optimization guide with schema markup, and mobile-friendly formatting. Provide AI prompt examples to generate variations at scale."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Compelling product descriptions that sell.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Checkout Optimization Strategy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a comprehensive checkout optimization strategy for an e-commerce store selling [PRODUCT CATEGORY]. Include: ideal checkout steps sequence, form field optimization, guest checkout implementation, mobile-specific considerations, trust indicators placement, abandoned cart recovery tactics, payment method recommendations, order confirmation design, and post-purchase engagement. Provide AI-powered A/B testing recommendations for critical elements."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Reduce cart abandonment and increase conversions.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">E-commerce Email Marketing Sequence</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive e-commerce email marketing sequence for [STORE TYPE]. Include: welcome series (5 emails), abandoned cart series (3 emails), post-purchase series (4 emails), re-engagement series (3 emails), and promotional campaign template. For each email, provide subject line formulas, preview text, content structure, personalization strategies, and optimal send timing. Include AI-powered segmentation recommendations and A/B testing variables."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Automated email sequences that drive revenue.</p>
              </div>
            </div>
          </div>

          {/* Digital Marketing Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              📱 Digital Marketing Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Content Marketing Strategy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive 6-month content marketing strategy for [BUSINESS TYPE] targeting [AUDIENCE]. Include: content pillars aligned with business goals, content calendar with topics for blog posts, videos, podcasts, and social media, keyword strategy with primary and secondary terms, content distribution plan across owned/earned/paid channels, and success metrics. Incorporate AI content optimization recommendations and competitive content gap analysis."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Strategic content that drives business results.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Social Media Campaign Planner</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design a comprehensive social media campaign for [PRODUCT/SERVICE] launch targeting [AUDIENCE]. Include: campaign objectives and KPIs, platform-specific strategy (Instagram, Facebook, LinkedIn, Twitter, TikTok), content themes and formats, posting schedule, hashtag strategy, influencer collaboration approach, paid social recommendations with targeting parameters, and engagement response guidelines. Provide AI-powered content optimization suggestions for each platform."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Multi-platform social campaigns that convert.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">SEO Content Optimization</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create an SEO-optimized content brief for [TARGET KEYWORD] targeting [AUDIENCE]. Include: primary and secondary keywords with search volumes, search intent analysis, recommended content structure with H1-H6 hierarchy, word count recommendation, meta title and description templates, internal and external linking strategy, featured snippet optimization, schema markup recommendations, and AI-powered content gap analysis compared to top-ranking pages."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Rank higher in search results with optimized content.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Email Marketing Automation</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design an advanced email marketing automation system for [BUSINESS TYPE]. Map out trigger-based workflows for: lead nurturing, customer onboarding, cross-selling, re-engagement, and loyalty building. For each workflow, include: trigger events, segmentation criteria, email sequence content, timing intervals, personalization variables, A/B testing elements, and success metrics. Incorporate AI-powered send-time optimization and content personalization strategies."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Automated email journeys that nurture and convert.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">PPC Campaign Structure</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive Google Ads campaign structure for [BUSINESS TYPE] with a monthly budget of [AMOUNT]. Include: campaign types (Search, Display, Shopping, Video), campaign organization by product/service categories, ad group structure with 3-5 keywords per group, negative keyword lists, ad copy templates with USPs and CTAs, ad extension recommendations, bidding strategy, device targeting, and conversion tracking setup. Provide AI-powered budget allocation recommendations across campaigns."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Efficient paid search campaigns that maximize ROI.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Conversion Rate Optimization Plan</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a comprehensive conversion rate optimization (CRO) plan for [WEBSITE TYPE] focusing on [PRIMARY CONVERSION GOAL]. Include: user journey analysis with friction points, heatmap and session recording implementation, form optimization recommendations, call-to-action testing strategy, social proof placement, mobile-specific optimizations, page speed improvements, and A/B testing roadmap with hypothesis framework. Incorporate AI-powered personalization recommendations for key landing pages."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Turn more visitors into customers with data-driven optimization.</p>
              </div>
            </div>
          </div>

          {/* AI Business Integration Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🤖 AI Business Integration Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">AI Implementation Roadmap</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive AI implementation roadmap for a [BUSINESS TYPE] looking to enhance [BUSINESS FUNCTION]. Include: current state assessment, AI opportunity identification across operations, prioritization framework based on impact/effort, technology stack recommendations, data requirements and governance, implementation timeline with phases, resource requirements, ROI calculation methodology, and change management strategy. Focus on practical applications with measurable business outcomes."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Strategic AI adoption for business transformation.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">AI-Powered Customer Service</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design an AI-enhanced customer service system for [BUSINESS TYPE] handling [VOLUME] monthly inquiries. Include: chatbot conversation flows for common scenarios, AI-human handoff triggers, knowledge base structure and content requirements, sentiment analysis implementation, personalization framework, multilingual support approach, performance metrics, and continuous improvement process. Provide sample conversation scripts for key customer journeys with both AI and human touchpoints."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">24/7 intelligent customer support that scales.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">AI Content Generation System</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive AI content generation system for [BUSINESS TYPE] producing [CONTENT TYPES]. Include: content strategy alignment, prompt engineering templates for different content formats, brand voice training methodology, human-in-the-loop review workflow, content approval process, publishing integration, performance tracking, and quality assurance protocols. Provide specific prompt examples for high-priority content needs and guidelines for maintaining consistent quality and brand alignment."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Scale your content production with AI assistance.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">AI-Enhanced Product Development</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop an AI-enhanced product development framework for [PRODUCT CATEGORY] in the [INDUSTRY]. Include: AI-powered market research methodology, customer feedback analysis system, feature prioritization model, prototype testing approach, predictive performance modeling, competitive differentiation strategy, and continuous improvement cycle. Provide specific AI tool recommendations for each phase and implementation guidelines with expected outcomes and ROI calculations."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Accelerate innovation with AI-driven product development.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">AI Marketing Optimization</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create an AI-powered marketing optimization system for [BUSINESS TYPE] with [MARKETING CHANNELS]. Include: predictive customer segmentation model, dynamic content personalization framework, automated A/B testing protocol, cross-channel attribution modeling, budget allocation algorithm, campaign performance forecasting, and real-time optimization rules. Provide implementation roadmap with specific AI tools, data requirements, integration points, and expected performance improvements with measurement methodology."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Data-driven marketing decisions powered by AI.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">AI Business Process Automation</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design an AI-powered business process automation strategy for [DEPARTMENT] in a [BUSINESS TYPE]. Analyze current workflows and identify automation opportunities for: data entry/extraction, approval processes, reporting, customer communications, and decision-making. For each process, outline: AI technology selection, implementation approach, integration requirements, exception handling procedures, human oversight mechanisms, and ROI calculation. Include change management and training recommendations."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Streamline operations with intelligent automation.</p>
              </div>
            </div>
          </div>

          {/* SEO & Analytics Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              📊 SEO & Analytics Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">SEO Content Optimization</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Optimize this content for SEO targeting the keyword '[PRIMARY KEYWORD]'. Provide: optimized title tag, meta description, H1-H6 structure, keyword placement suggestions, internal linking opportunities, and related keywords to include. Ensure content remains natural and valuable to readers while improving search rankings."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Boost your search engine rankings effectively.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Keyword Research Strategy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a comprehensive keyword strategy for [BUSINESS/WEBSITE] in [INDUSTRY]. Identify: primary keywords, long-tail variations, competitor keywords, local SEO opportunities, and content gaps. Organize keywords by search intent (informational, commercial, transactional) and difficulty level."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Find profitable keywords your competitors miss.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Performance Analysis Report</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Analyze the performance data for [WEBSITE/CAMPAIGN] and create a comprehensive report. Include: traffic analysis, conversion rates, user behavior insights, top-performing content, areas for improvement, and actionable recommendations. Present findings in executive summary format with clear next steps."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Turn data into actionable business insights.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Local SEO Optimization</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a local SEO strategy for [BUSINESS NAME] in [CITY/REGION]. Include: Google My Business optimization, local keyword targeting, citation building strategy, review management plan, and local content creation ideas. Focus on improving visibility for '[SERVICE] near me' searches."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Dominate local search results in your area.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Competitor SEO Analysis</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Conduct a comprehensive SEO analysis of [COMPETITOR WEBSITE]. Analyze: their top-ranking keywords, content strategy, backlink profile, technical SEO implementation, and identify opportunities where we can outrank them. Provide actionable recommendations to gain competitive advantage."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Outrank your competition with strategic insights.</p>
              </div>
            </div>
          </div>

          {/* Sales & Conversion Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              💰 Sales & Conversion Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Sales Page Copy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Write a high-converting sales page for [PRODUCT/SERVICE] targeting [TARGET AUDIENCE]. Include: attention-grabbing headline, problem identification, solution presentation, benefits vs features, social proof, objection handling, urgency/scarcity elements, and multiple call-to-action buttons. Use proven copywriting formulas like AIDA or PAS."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Convert visitors into paying customers.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Lead Magnet Creation</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design a compelling lead magnet for [INDUSTRY/NICHE] that attracts [TARGET AUDIENCE]. Suggest: content format (ebook, checklist, template, etc.), title, key points to cover, opt-in page copy, and follow-up email sequence. Ensure it provides immediate value and positions you as an expert."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Build your email list with irresistible offers.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Objection Handling Scripts</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create objection handling scripts for [PRODUCT/SERVICE] sales conversations. Address common objections: price concerns, timing issues, competitor comparisons, trust/credibility questions, and feature limitations. Provide empathetic responses that acknowledge concerns while reinforcing value proposition."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Turn objections into sales opportunities.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Upsell & Cross-sell Sequences</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop upsell and cross-sell strategies for customers who purchased [MAIN PRODUCT]. Create: complementary product recommendations, bundle offers, upgrade paths, timing strategies, and persuasive copy for each offer. Focus on adding value while increasing average order value."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Maximize revenue from existing customers.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-400 mb-3">Testimonial Collection Strategy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a systematic approach to collect powerful testimonials for [BUSINESS/PRODUCT]. Include: timing for requests, email templates, interview questions, video testimonial scripts, incentive strategies, and ways to showcase testimonials across marketing channels for maximum impact."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Build trust with authentic customer stories.</p>
              </div>
            </div>
          </div>

          {/* E-commerce & Product Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🛒 E-commerce & Product Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">Product Launch Strategy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Plan a comprehensive product launch for [PRODUCT NAME] in [MARKET/INDUSTRY]. Include: pre-launch buzz creation, launch day activities, post-launch follow-up, influencer outreach strategy, PR approach, social media campaign, email marketing sequence, and success metrics to track."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Launch products with maximum impact and sales.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">Amazon Product Listing</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Optimize an Amazon product listing for [PRODUCT]. Create: compelling title with keywords, bullet points highlighting key benefits, detailed product description, backend search terms, and A+ content suggestions. Focus on conversion optimization and Amazon's algorithm requirements."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Rank higher and sell more on Amazon.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">Inventory Management System</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design an inventory management system for [BUSINESS TYPE] selling [PRODUCT CATEGORY]. Include: stock level monitoring, reorder point calculations, seasonal demand forecasting, supplier management, cost optimization strategies, and automated alerts for low stock situations."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Never run out of stock or overstock again.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">Customer Retention Program</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a customer retention program for [E-COMMERCE BUSINESS]. Include: loyalty point system, customer appreciation tiers, special benefits, birthday/anniversary campaigns, re-engagement sequences for inactive customers, and referral incentives. Focus on increasing lifetime value and repeat purchases."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Keep customers coming back for more.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">Pricing Strategy Analysis</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Analyze and optimize pricing strategy for [PRODUCT/SERVICE] in [MARKET]. Consider: competitor pricing, value perception, psychological pricing tactics, bundle pricing options, discount strategies, and price testing methodologies. Provide recommendations to maximize profitability while remaining competitive."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Price your products for maximum profit.</p>
              </div>
            </div>
          </div>

          {/* Development & Deployment Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              🚀 Development & Deployment Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">GitHub Repository Setup Guide</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive GitHub repository setup guide for [PROJECT NAME]. Include: repository initialization, branch protection rules, workflow automation with GitHub Actions, pull request templates, issue templates, README structure, contributing guidelines, and security best practices. Focus on establishing a professional and efficient development workflow."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Set up a professional GitHub repository for your project.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Vercel Deployment Configuration</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a detailed Vercel deployment configuration for [PROJECT TYPE]. Include: environment variable setup (for Supabase, Stripe, Email, and site configuration), build optimization settings, domain configuration, webhook setup, post-deployment verification steps, and troubleshooting common deployment issues. Focus on achieving a smooth and reliable deployment process."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Deploy your application seamlessly with Vercel.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Full-Stack Project Environment Setup</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a comprehensive environment setup guide for a [TECH STACK] project. Include: local development environment configuration, required services (database, authentication, payment processing, email), environment variable management, local testing procedures, and production environment preparation. Focus on creating a consistent and reliable development experience across the team."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Set up your development environment correctly from the start.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">CI/CD Pipeline Configuration</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design a CI/CD pipeline for [PROJECT TYPE] using [TOOLS/SERVICES]. Include: automated testing configuration, build process optimization, deployment strategies (blue-green, canary, etc.), rollback procedures, monitoring setup, and notification systems. Focus on creating a reliable and efficient pipeline that ensures code quality and minimizes deployment risks."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Automate your testing and deployment workflow.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Production Monitoring & Maintenance Plan</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a comprehensive monitoring and maintenance plan for [APPLICATION TYPE] in production. Include: performance monitoring tools, error tracking systems, database monitoring, security scanning, backup strategies, update procedures, and incident response protocols. Focus on ensuring high availability, performance, and security for your application."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Keep your application running smoothly in production.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Containerization Strategy</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a containerization strategy for [APPLICATION TYPE] using Docker. Include: base image selection, multi-stage build optimization, environment configuration, volume management, networking setup, security hardening, and container orchestration recommendations. Focus on creating lightweight, secure, and reproducible containers that streamline development and deployment workflows."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Containerize your application for consistent deployment across environments.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Kubernetes Deployment Configuration</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design a Kubernetes deployment configuration for [APPLICATION TYPE]. Include: namespace organization, deployment strategies, service definitions, ingress configuration, resource management (requests/limits), horizontal pod autoscaling, persistent storage setup, ConfigMaps and Secrets management, health checks, and pod disruption budgets. Focus on creating a resilient, scalable, and maintainable infrastructure."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Deploy and manage your containerized applications at scale.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">AI Application Security Framework</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop a comprehensive security framework for [AI APPLICATION TYPE]. Include: data protection measures, model security (against poisoning, inversion, and theft), prompt injection defenses, authentication and authorization controls, API security, monitoring for abnormal behavior, compliance requirements, and incident response procedures. Focus on addressing AI-specific vulnerabilities while maintaining standard application security best practices."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Secure your AI applications against emerging threats and vulnerabilities.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Serverless Architecture Design</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Design a serverless architecture for [APPLICATION TYPE] using [CLOUD PROVIDER]. Include: function organization strategy, event-driven workflow design, API Gateway configuration, authentication integration, database access patterns, local development setup, monitoring approach, and cost optimization techniques. Focus on creating a scalable, maintainable solution that minimizes operational overhead."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Build scalable applications without managing infrastructure.</p>
              </div>
            </div>
          </div>

          {/* Personal Branding & Networking Prompts */}
          <div className="bg-gray-900 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              👤 Personal Branding & Networking Prompts
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">LinkedIn Profile Optimization</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Optimize a LinkedIn profile for [PROFESSION/INDUSTRY]. Create: compelling headline, professional summary, experience descriptions with achievements, skills section optimization, and content strategy. Focus on attracting [TARGET AUDIENCE] and positioning as a thought leader in [EXPERTISE AREA]."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Build a powerful professional presence online.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Networking Email Templates</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create networking email templates for [INDUSTRY/PROFESSION]. Include: cold outreach to industry leaders, follow-up after events, collaboration proposals, mentorship requests, and thank you messages. Each template should be personalized, value-focused, and include clear next steps."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Build meaningful professional relationships.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Thought Leadership Content</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Develop thought leadership content strategy for [EXPERTISE AREA]. Create: industry trend analysis, opinion pieces on current events, case studies, how-to guides, and prediction articles. Include content calendar, distribution strategy, and engagement tactics to build authority and influence."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Establish yourself as an industry expert.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Speaking Engagement Pitch</h3>
                <div className="bg-gray-700 rounded p-4 mb-3">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a compelling speaker pitch for [TOPIC/EXPERTISE] targeting [EVENT TYPE/AUDIENCE]. Include: speaker bio, talk description, key takeaways for audience, unique angle/perspective, previous speaking experience, and testimonials. Make it easy for event organizers to say yes."
                  </p>
                </div>
                <p className="text-gray-400 text-sm">Land speaking opportunities to boost your brand.</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                 <h3 className="text-lg font-semibold text-green-400 mb-3">Personal Brand Story</h3>
                 <div className="bg-gray-700 rounded p-4 mb-3">
                   <p className="text-gray-300 font-mono text-sm">
                     "Craft a compelling personal brand story for [PROFESSIONAL BACKGROUND]. Include: origin story, key challenges overcome, unique skills/perspective, values and mission, notable achievements, and future vision. Make it authentic, memorable, and aligned with career goals."
                   </p>
                 </div>
                 <p className="text-gray-400 text-sm">Tell your story in a way that opens doors.</p>
               </div>

               <div className="bg-gray-800 rounded-lg p-6">
                 <h3 className="text-lg font-semibold text-green-400 mb-3">Media Kit Creation</h3>
                 <div className="bg-gray-700 rounded p-4 mb-3">
                   <p className="text-gray-300 font-mono text-sm">
                     "Create a comprehensive media kit for [PERSONAL BRAND/BUSINESS]. Include: professional bio (short and long versions), high-resolution photos, brand colors and fonts, key statistics and achievements, press coverage, speaking topics, contact information, and brand guidelines. Format for easy sharing with media and partners."
                   </p>
                 </div>
                 <p className="text-gray-400 text-sm">Professional media kit for press and partnerships.</p>
              </div>
            </div>
          </div>

        {/* Usage Tips */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">How to Use These Prompts</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Choose Your Category</h3>
                <p className="text-gray-300">Select prompts based on your current project or business need.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Customize for Your Brand</h3>
                <p className="text-gray-300">Adapt the prompts with your specific brand voice and requirements.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="text-white font-semibold mb-2">Generate & Refine</h3>
                <p className="text-gray-300">Use with your favorite AI tool and refine the output as needed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center">
          <div className="flex gap-4 justify-center">
            <Link 
              href="/my-account" 
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              ← Back to Account
            </Link>
            <Link 
              href="/downloads" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View All Downloads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}