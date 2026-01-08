'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Star, Users, Zap, Globe, BookOpen, Code, Palette, Briefcase, ArrowRight, Sparkles, BrainCircuit, Lightbulb, Rocket, Menu, X, ChevronDown, Waves, Cpu, Bot, Network } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("student")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-1 h-1 bg-purple-400/30 rounded-full blur-sm"></div>
            </div>
          ))}
        </div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1), transparent 40%)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Prompt Pro</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {['Features', 'Modes', 'Pricing', 'Testimonials'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" className="hidden md:flex text-gray-300 hover:text-white border-2 border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                Get Started Free
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-white/10 animate-in slide-in-from-top duration-300">
              {['Features', 'Modes', 'Pricing', 'Testimonials'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Button variant="ghost" className="mt-2 text-gray-300 hover:text-white border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 w-full justify-start backdrop-blur-sm">
                Sign In
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-in fade-in slide-in-from-bottom duration-1000">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-purple-300 hover:border-purple-400/50 backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-1 animate-pulse" />
              Powered by Advanced Gemini AI
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block mb-2">Transform Your Ideas Into</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-300">
                Perfect Prompts
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The next-generation prompt platform that refines your raw ideas into polished, 
              optimized prompts using cutting-edge AI. Perfect for students, creators, developers, and teams.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-2 border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2 group">
                <Users className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Star className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Globe className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                <span>50+ Countries</span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl animate-float"></div>
          <div className="absolute top-40 right-10 w-16 h-16 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-2xl blur-xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl animate-float"></div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Everything You Need to Master Prompts
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful features designed to help you create, manage, and optimize prompts like never before
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BrainCircuit,
                title: "AI-Powered Refinement",
                description: "Advanced Gemini AI transforms your rough ideas into polished, optimized prompts",
                gradient: "from-purple-600/20 to-blue-600/20",
                iconGradient: "from-purple-400 to-blue-400"
              },
              {
                icon: Users,
                title: "Team Workspace",
                description: "Collaborate with your team, share prompts, and build a collective knowledge base",
                gradient: "from-blue-600/20 to-purple-600/20",
                iconGradient: "from-blue-400 to-purple-400"
              },
              {
                icon: BookOpen,
                title: "Student Mode",
                description: "Tailored prompts for academic writing, research, and educational projects",
                gradient: "from-green-600/20 to-blue-600/20",
                iconGradient: "from-green-400 to-blue-400"
              },
              {
                icon: Palette,
                title: "Creative Mode",
                description: "Perfect for storytelling, content creation, filmmaking, and design projects",
                gradient: "from-orange-600/20 to-pink-600/20",
                iconGradient: "from-orange-400 to-pink-400"
              },
              {
                icon: Code,
                title: "Developer Mode",
                description: "Optimized prompts for coding, debugging, system design, and technical tasks",
                gradient: "from-red-600/20 to-orange-600/20",
                iconGradient: "from-red-400 to-orange-400"
              },
              {
                icon: Briefcase,
                title: "Management Dashboard",
                description: "Complete control over your account, usage, history, and prompt library",
                gradient: "from-indigo-600/20 to-purple-600/20",
                iconGradient: "from-indigo-400 to-purple-400"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 animate-in fade-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-7 h-7 bg-gradient-to-r ${feature.iconGradient} bg-clip-text text-transparent`} />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modes Section */}
      <section id="modes" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Designed for Every User
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized modes that understand your unique needs and deliver perfect results
            </p>
          </div>

          <Tabs defaultValue="student" className="max-w-5xl mx-auto" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-white/10 backdrop-blur-xl border border-white/20 p-1 rounded-xl">
              {[
                { value: "student", icon: BookOpen, label: "Student" },
                { value: "creative", icon: Palette, label: "Creative" },
                { value: "developer", icon: Code, label: "Developer" },
                { value: "business", icon: Briefcase, label: "Business" }
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/25 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {[
              {
                value: "student",
                icon: BookOpen,
                title: "Student Mode",
                description: "Academic excellence made simple",
                gradient: "from-green-600/20 to-blue-600/20",
                iconGradient: "from-green-400 to-blue-400",
                perfectFor: ["Essay writing assistance", "Research paper prompts", "Study guide generation", "Assignment breakdown"],
                features: ["Academic language optimization", "Citation-ready prompts", "Subject-specific templates", "Plagiarism-aware suggestions"]
              },
              {
                value: "creative",
                icon: Palette,
                title: "Creative Mode",
                description: "Unleash your creative potential",
                gradient: "from-orange-600/20 to-pink-600/20",
                iconGradient: "from-orange-400 to-pink-400",
                perfectFor: ["Story and script writing", "Content creation", "Visual art concepts", "Marketing copy"],
                features: ["Creative language enhancement", "Style and tone adaptation", "Visual description prompts", "Narrative structure guidance"]
              },
              {
                value: "developer",
                icon: Code,
                title: "Developer Mode",
                description: "Code smarter, not harder",
                gradient: "from-red-600/20 to-orange-600/20",
                iconGradient: "from-red-400 to-orange-400",
                perfectFor: ["Code generation", "Debugging assistance", "System design", "Documentation writing"],
                features: ["Language-specific optimization", "Technical precision", "Best practice integration", "Architecture pattern prompts"]
              },
              {
                value: "business",
                icon: Briefcase,
                title: "Business Mode",
                description: "Professional prompts for business success",
                gradient: "from-indigo-600/20 to-purple-600/20",
                iconGradient: "from-indigo-400 to-purple-400",
                perfectFor: ["Business proposals", "Marketing strategies", "Financial analysis", "Project management"],
                features: ["Professional tone optimization", "Industry-specific terminology", "ROI-focused prompts", "Stakeholder communication"]
              }
            ].map((mode) => (
              <TabsContent key={mode.value} value={mode.value} className="mt-8">
                <Card className="bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-500">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${mode.gradient} rounded-xl flex items-center justify-center`}>
                        <mode.icon className={`w-6 h-6 bg-gradient-to-r ${mode.iconGradient} bg-clip-text text-transparent`} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl text-white">{mode.title}</CardTitle>
                        <CardDescription className="text-gray-400">{mode.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Perfect for:
                        </h4>
                        <ul className="space-y-2">
                          {mode.perfectFor.map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-blue-300 flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          Key Features:
                        </h4>
                        <ul className="space-y-2">
                          {mode.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-300">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Flexible pricing for global markets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="group bg-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 animate-in fade-in slide-in-from-bottom duration-1000">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-white">Starter</CardTitle>
                <CardDescription className="text-gray-400">Perfect for individuals</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-white">Free</div>
                  <p className="text-sm text-gray-400">Forever free</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "10 prompts per month",
                    "Basic modes",
                    "Email support"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/60 backdrop-blur-sm transition-all duration-300">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="group bg-gradient-to-b from-purple-600/10 to-blue-600/10 backdrop-blur-xl border-2 border-purple-500/40 hover:border-purple-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 relative animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: "100ms" }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-white">Pro</CardTitle>
                <CardDescription className="text-gray-400">For professionals and teams</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-white">
                    ₹299<span className="text-lg font-normal text-gray-400">/mo</span>
                  </div>
                  <p className="text-sm text-gray-400">India Market</p>
                  <div className="text-3xl font-bold text-white mt-2">
                    $9<span className="text-lg font-normal text-gray-400">/mo</span>
                  </div>
                  <p className="text-sm text-gray-400">International</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Unlimited prompts",
                    "All modes & features",
                    "Team workspace",
                    "Priority support",
                    "API access"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="group bg-white/5 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 animate-in fade-in slide-in-from-bottom duration-1000" style={{ animationDelay: "200ms" }}>
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-white">Enterprise</CardTitle>
                <CardDescription className="text-gray-400">For large organizations</CardDescription>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-white">Custom</div>
                  <p className="text-sm text-gray-400">Contact us</p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Everything in Pro",
                    "Custom integrations",
                    "Dedicated support",
                    "SLA guarantee",
                    "Custom training"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/60 backdrop-blur-sm transition-all duration-300">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom duration-1000">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Loved by Users Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See what our users have to say about their experience with Prompt Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                role: "Graduate Student",
                content: "Prompt Pro has revolutionized how I approach my academic writing. The AI-refined prompts save me hours of thinking and help me produce better work.",
                gradient: "from-purple-600/20 to-blue-600/20"
              },
              {
                name: "Alex Chen",
                role: "Software Engineer",
                content: "As a developer, I need precise technical prompts. Prompt Pro delivers exactly what I need, every time. The team workspace feature is a game-changer.",
                gradient: "from-blue-600/20 to-purple-600/20"
              },
              {
                name: "Sarah Johnson",
                role: "Content Creator",
                content: "The creative mode helps me brainstorm ideas for my content agency. It's like having a creative director available 24/7. Worth every penny!",
                gradient: "from-orange-600/20 to-pink-600/20"
              }
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`group bg-gradient-to-b ${testimonial.gradient} backdrop-blur-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 animate-in fade-in slide-in-from-bottom duration-1000`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-200 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Ideas?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join thousands of users who are already creating better prompts with Prompt Pro
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300">
                  Start Free Trial
                  <Rocket className="ml-2 w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl border-2 border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Prompt Pro</span>
              </div>
              <p className="text-sm text-gray-400">
                The intelligent prompt platform powered by AI, designed for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                {['Features', 'Modes', 'Pricing', 'API'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                {['Help Center', 'Documentation', 'Community', 'Status'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 Prompt Pro. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <Link key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .bg-300 {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  )
}