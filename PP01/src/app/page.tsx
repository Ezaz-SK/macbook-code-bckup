"use client"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  FileText, 
  FolderOpen, 
  Users, 
  TrendingUp, 
  Plus, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Star,
  Activity,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code,
  PenTool,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  const stats = [
    {
      title: "Total Prompts Created",
      value: "50K+",
      change: "Join thousands",
      trend: "up",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Active Teams",
      value: "1,200+",
      change: "Growing fast",
      trend: "up", 
      icon: FolderOpen,
      color: "text-green-600"
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "Industry leading",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "AI Models",
      value: "4+",
      change: "Multiple options",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ]

  const features = [
    {
      id: 1,
      title: "Research Paper Summary Generator",
      mode: "Academic",
      description: "Generate comprehensive summaries with proper citations",
      success: 95,
      icon: BookOpen
    },
    {
      id: 2,
      title: "React Component Documentation",
      mode: "Developer",
      description: "Create detailed documentation with examples",
      success: 88,
      icon: Code
    },
    {
      id: 3,
      title: "Marketing Email Campaign",
      mode: "Creative",
      description: "Generate compelling marketing emails",
      success: 92,
      icon: PenTool
    },
    {
      id: 4,
      title: "API Error Debug Assistant",
      mode: "Developer",
      description: "Help debug API errors with smart suggestions",
      success: 90,
      icon: Code
    }
  ]

  const useCases = [
    {
      user: "Sarah Chen",
      action: "created a new prompt",
      target: "Blog Post Outline Generator",
      time: "10 minutes ago",
      avatar: "SC"
    },
    {
      user: "Alex Kumar",
      action: "commented on",
      target: "Code Review Helper",
      time: "1 hour ago",
      avatar: "AK"
    },
    {
      user: "Maria Rodriguez",
      action: "shared",
      target: "Social Media Content Planner",
      time: "3 hours ago",
      avatar: "MR"
    },
    {
      user: "John Doe",
      action: "updated",
      target: "Meeting Notes Summarizer",
      time: "5 hours ago",
      avatar: "JD"
    }
  ]

  const topFeatures = [
    {
      title: "Research Paper Summary",
      description: "Academic excellence with citations",
      users: "5,000+",
      rating: 4.9,
      trend: "up"
    },
    {
      title: "React Component Docs",
      description: "Developer favorite for documentation",
      users: "3,500+",
      rating: 4.8,
      trend: "up"
    },
    {
      title: "Marketing Email",
      description: "High-converting email campaigns",
      users: "2,800+",
      rating: 4.7,
      trend: "stable"
    },
    {
      title: "API Debug Helper",
      description: "Smart debugging assistance",
      users: "2,200+",
      rating: 4.6,
      trend: "down"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-3 h-3 mr-1" />
          AI-Powered Prompt Management
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Your Central Hub for<br />AI Prompts
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The same way people use Google Docs for documents or Notion for notes — 
          Prompt Pro is your central hub for managing and collaborating on AI prompts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/auth/signup">
              Try 15 Free Prompts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8" asChild>
            <Link href="/auth/login">
              Sign In
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1 text-red-500" />
                )}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Showcase */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Powerful Features for Everyone</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're a student, developer, creative professional, or enterprise team
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Popular Prompts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Popular AI Prompts</CardTitle>
              <CardDescription>
                Try these proven prompts used by thousands of users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{feature.success}%</p>
                        <p className="text-xs text-muted-foreground">success</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.mode}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/auth/signup">
                  View All Templates
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Live Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Live Activity</CardTitle>
              <CardDescription>
                See what's happening on Prompt Pro right now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {useCases.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/auth/signup">
                  Join the Community
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Features & Quick Start */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Features */}
        <Card>
          <CardHeader>
            <CardTitle>Most Loved Features</CardTitle>
            <CardDescription>
              See what makes Prompt Pro the choice for professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{feature.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-medium">{feature.users}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs">{feature.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card>
          <CardHeader>
            <CardTitle>Get Started in Minutes</CardTitle>
            <CardDescription>
              Choose your use case and start creating amazing prompts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button variant="outline" className="justify-start h-auto p-4" asChild>
                <Link href="/auth/signup">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <div className="text-left">
                      <p className="font-medium">Start with Templates</p>
                      <p className="text-sm text-muted-foreground">
                        Use proven prompt templates
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4" asChild>
                <Link href="/auth/signup">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-5 h-5 text-blue-500" />
                    <div className="text-left">
                      <p className="font-medium">Create Custom Prompts</p>
                      <p className="text-sm text-muted-foreground">
                        Build prompts from scratch
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4" asChild>
                <Link href="/auth/signup">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-purple-500" />
                    <div className="text-left">
                      <p className="font-medium">Join a Team</p>
                      <p className="text-sm text-muted-foreground">
                        Collaborate with others
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4" asChild>
                <Link href="/pricing">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <div className="text-left">
                      <p className="font-medium">View Pricing</p>
                      <p className="text-sm text-muted-foreground">
                        Choose your plan
                      </p>
                    </div>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>
            See how Prompt Pro is transforming workflows worldwide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Platform Growth</span>
              <span className="text-sm text-muted-foreground">150% this year</span>
            </div>
            <Progress value={85} className="h-2" />
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">Academic</p>
                <p className="text-sm text-muted-foreground">15,000+ users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">Developer</p>
                <p className="text-sm text-muted-foreground">20,000+ users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">Creative</p>
                <p className="text-sm text-muted-foreground">12,000+ users</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <section className="text-center space-y-6 py-12 bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold">Ready to Transform Your AI Workflow?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of users who have already streamlined their AI prompt management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8" asChild>
            <Link href="/auth/signup">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8" asChild>
            <Link href="/pricing">
              View Pricing
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            15 free prompts
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Cancel anytime
          </div>
        </div>
      </section>
    </div>
  )
}