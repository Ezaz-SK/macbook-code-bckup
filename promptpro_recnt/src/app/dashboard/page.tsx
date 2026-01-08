"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Calendar,
  Eye,
  Settings
} from "lucide-react"
import Link from "next/link"
import { AuthLayout } from "@/components/layout/auth-layout"
import { AppLayout } from "@/components/layout/app-layout"

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [userStats, setUserStats] = useState({
    totalPrompts: 0,
    foldersCreated: 0,
    teamMembers: 0,
    successRate: 0
  })

  const [recentPrompts, setRecentPrompts] = useState([])
  const [teamActivity, setTeamActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
      return
    }
  }, [isAuthenticated, isLoading, router])

  // Mock user data - in real app, this would come from API
  const mockUserData = {
    totalPrompts: 24,
    foldersCreated: 5,
    teamMembers: 3,
    successRate: 89,
    plan: "pro",
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com"
  }

  const mockRecentPrompts = [
    {
      id: 1,
      title: "Research Paper Summary Generator",
      mode: "Academic",
      lastUsed: "2 hours ago",
      success: 95,
      favorite: true
    },
    {
      id: 2,
      title: "React Component Documentation",
      mode: "Developer",
      lastUsed: "5 hours ago",
      success: 88,
      favorite: false
    },
    {
      id: 3,
      title: "Marketing Email Campaign",
      mode: "Creative",
      lastUsed: "1 day ago",
      success: 92,
      favorite: true
    },
    {
      id: 4,
      title: "API Error Debug Assistant",
      mode: "Developer",
      lastUsed: "2 days ago",
      success: 90,
      favorite: false
    }
  ]

  const mockTeamActivity = [
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
    }
  ]

  useEffect(() => {
    if (isAuthenticated && user) {
      // Simulate loading user data
      setTimeout(() => {
        setUserStats(mockUserData)
        setRecentPrompts(mockRecentPrompts)
        setTeamActivity(mockTeamActivity)
        setLoading(false)
      }, 1000)
    }
  }, [isAuthenticated, user])

  const stats = [
    {
      title: "My Prompts",
      value: userStats.totalPrompts.toString(),
      change: "+3 this week",
      trend: "up",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "My Folders",
      value: userStats.foldersCreated.toString(),
      change: "+1 this week",
      trend: "up", 
      icon: FolderOpen,
      color: "text-green-600"
    },
    {
      title: "Team Members",
      value: userStats.teamMembers.toString(),
      change: "Active now",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "My Success Rate",
      value: `${userStats.successRate}%`,
      change: "+2% this week",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ]

  const topPerformingPrompts = [
    {
      title: "Research Paper Summary",
      usage: 12,
      success: 95,
      trend: "up"
    },
    {
      title: "React Component Docs",
      usage: 8,
      success: 88,
      trend: "up"
    },
    {
      title: "Marketing Email",
      usage: 6,
      success: 92,
      trend: "stable"
    },
    {
      title: "API Debug Helper",
      usage: 4,
      success: 90,
      trend: "down"
    }
  ]

  if (isLoading || loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </AppLayout>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {mockUserData.name}!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your prompts today.
            </p>
            <Badge variant="secondary" className="mt-2">
              {mockUserData.plan === "pro" ? "Pro Plan" : "Free Plan"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/editor">
                <Plus className="w-4 h-4 mr-2" />
                New Prompt
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/settings">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>

        {/* User Stats Grid */}
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

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Prompts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Recent Prompts</CardTitle>
                  <CardDescription>
                    Your most recently used and saved prompts
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/library">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPrompts.map((prompt) => (
                  <div key={prompt.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{prompt.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="text-xs">
                            {prompt.mode}
                          </Badge>
                          <span>•</span>
                          <span>{prompt.lastUsed}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{prompt.success}%</p>
                        <p className="text-xs text-muted-foreground">success</p>
                      </div>
                      {prompt.favorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {recentPrompts.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No prompts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first prompt to get started
                  </p>
                  <Button asChild>
                    <Link href="/editor">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Prompt
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Team Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>
                Recent updates from your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamActivity.map((activity, index) => (
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
              {teamActivity.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No team activity</h3>
                  <p className="text-muted-foreground mb-4">
                    Invite team members to collaborate
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/teams">
                      <Plus className="w-4 h-4 mr-2" />
                      Invite Members
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Prompts & Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Your Top Performing Prompts */}
          <Card>
            <CardHeader>
              <CardTitle>Your Top Prompts</CardTitle>
              <CardDescription>
                Your most successful prompts this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingPrompts.map((prompt, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{prompt.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {prompt.usage} uses
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{prompt.success}%</p>
                        <div className="flex items-center gap-1">
                          {prompt.trend === "up" && (
                            <ArrowUpRight className="w-3 h-3 text-green-500" />
                          )}
                          {prompt.trend === "down" && (
                            <ArrowDownRight className="w-3 h-3 text-red-500" />
                          )}
                          {prompt.trend === "stable" && (
                            <Activity className="w-3 h-3 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Get started with these common tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start h-auto p-4" asChild>
                  <Link href="/editor">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <div className="text-left">
                        <p className="font-medium">Create from Template</p>
                        <p className="text-sm text-muted-foreground">
                          Start with a proven prompt template
                        </p>
                      </div>
                    </div>
                  </Link>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto p-4" asChild>
                  <Link href="/library">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="w-5 h-5 text-blue-500" />
                      <div className="text-left">
                        <p className="font-medium">Browse Your Library</p>
                        <p className="text-sm text-muted-foreground">
                          Explore your saved prompts
                        </p>
                      </div>
                    </div>
                  </Link>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto p-4" asChild>
                  <Link href="/teams">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-500" />
                      <div className="text-left">
                        <p className="font-medium">Manage Team</p>
                        <p className="text-sm text-muted-foreground">
                          Invite and manage team members
                        </p>
                      </div>
                    </div>
                  </Link>
                </Button>
                
                <Button variant="outline" className="justify-start h-auto p-4" asChild>
                  <Link href="/analytics">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <div className="text-left">
                        <p className="font-medium">View Your Analytics</p>
                        <p className="text-sm text-muted-foreground">
                          Track your prompt performance
                        </p>
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Usage Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Monthly Usage</CardTitle>
            <CardDescription>
              Your prompt usage and performance trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Prompts Used This Month</span>
                <span className="text-sm text-muted-foreground">
                  {userStats.totalPrompts} / {mockUserData.plan === "pro" ? "∞" : "15"}
                </span>
              </div>
              <Progress 
                value={mockUserData.plan === "pro" ? 30 : (userStats.totalPrompts / 15) * 100} 
                className="h-2" 
              />
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">Academic</p>
                  <p className="text-sm text-muted-foreground">8 prompts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">Developer</p>
                  <p className="text-sm text-muted-foreground">10 prompts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">Creative</p>
                  <p className="text-sm text-muted-foreground">6 prompts</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}