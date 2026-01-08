"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppLayout } from "@/components/layout/app-layout"
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  Activity,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Zap,
  Clock,
  Star,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

export default function Analytics() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("usage")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
      return
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
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

  const stats = [
    {
      title: "Total Prompts Used",
      value: "1,247",
      change: "+23%",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
      description: "vs last month"
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+5.1%",
      trend: "up",
      icon: Target,
      color: "text-green-600",
      description: "average success rate"
    },
    {
      title: "Active Users",
      value: "48",
      change: "+12",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      description: "team members"
    },
    {
      title: "Avg. Response Time",
      value: "2.3s",
      change: "-0.5s",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
      description: "faster is better"
    }
  ]

  const modeUsage = [
    { mode: "Academic", usage: 342, percentage: 27.4, color: "bg-blue-500" },
    { mode: "Developer", usage: 456, percentage: 36.6, color: "bg-green-500" },
    { mode: "Creative", usage: 289, percentage: 23.2, color: "bg-purple-500" },
    { mode: "Business", usage: 160, percentage: 12.8, color: "bg-orange-500" }
  ]

  const topPrompts = [
    {
      title: "Research Paper Summary",
      usage: 156,
      success: 95,
      trend: "up",
      growth: "+12%"
    },
    {
      title: "React Component Docs",
      usage: 142,
      success: 88,
      trend: "up",
      growth: "+8%"
    },
    {
      title: "Marketing Email",
      usage: 128,
      success: 92,
      trend: "stable",
      growth: "0%"
    },
    {
      title: "API Debug Helper",
      usage: 98,
      success: 90,
      trend: "down",
      growth: "-3%"
    },
    {
      title: "Blog Post Outline",
      usage: 87,
      success: 87,
      trend: "up",
      growth: "+15%"
    }
  ]

  const teamPerformance = [
    {
      name: "Sarah Chen",
      promptsCreated: 45,
      promptsUsed: 234,
      successRate: 96,
      avatar: "SC"
    },
    {
      name: "Alex Kumar",
      promptsCreated: 38,
      promptsUsed: 189,
      successRate: 92,
      avatar: "AK"
    },
    {
      name: "Maria Rodriguez",
      promptsCreated: 32,
      promptsUsed: 156,
      successRate: 89,
      avatar: "MR"
    },
    {
      name: "John Doe",
      promptsCreated: 28,
      promptsUsed: 134,
      successRate: 85,
      avatar: "JD"
    }
  ]

  const weeklyActivity = [
    { day: "Mon", prompts: 45, users: 12 },
    { day: "Tue", prompts: 52, users: 15 },
    { day: "Wed", prompts: 48, users: 14 },
    { day: "Thu", prompts: 61, users: 18 },
    { day: "Fri", prompts: 58, users: 16 },
    { day: "Sat", prompts: 32, users: 8 },
    { day: "Sun", prompts: 28, users: 6 }
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your prompt performance and team insights
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

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
                {stat.change} {stat.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="prompts">Prompts</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Mode Usage Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Usage by Mode</CardTitle>
                <CardDescription>
                  Distribution of prompt usage across different modes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modeUsage.map((mode, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{mode.mode}</span>
                        <span className="text-sm text-muted-foreground">
                          {mode.usage} ({mode.percentage}%)
                        </span>
                      </div>
                      <Progress value={mode.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>
                  Prompt usage and active users over the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-7 gap-2">
                    {weeklyActivity.map((day, index) => (
                      <div key={index} className="text-center">
                        <div className="text-xs text-muted-foreground mb-2">
                          {day.day}
                        </div>
                        <div className="relative">
                          <div 
                            className="w-full bg-primary rounded-sm"
                            style={{ height: `${(day.prompts / 70) * 100}px` }}
                          />
                          <div className="text-xs mt-1">{day.prompts}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Total prompts: 324</span>
                    <span>Daily avg: 46</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Key performance indicators for your prompt usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">94.2%</div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-xs text-green-600">+5.1% from last month</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2.3s</div>
                  <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  <p className="text-xs text-green-600">-0.5s improvement</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <p className="text-sm text-muted-foreground">User Satisfaction</p>
                  <p className="text-xs text-green-600">+3% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prompts Tab */}
        <TabsContent value="prompts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Prompts</CardTitle>
              <CardDescription>
                Most used and successful prompts this period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPrompts.map((prompt, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{prompt.title}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{prompt.usage} uses</span>
                          <span>{prompt.success}% success</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-medium">{prompt.growth}</p>
                        <div className="flex items-center gap-1">
                          {prompt.trend === "up" && (
                            <TrendingUp className="w-3 h-3 text-green-500" />
                          )}
                          {prompt.trend === "down" && (
                            <TrendingDown className="w-3 h-3 text-red-500" />
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
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Individual team member contributions and success rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-medium">{member.avatar}</span>
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{member.promptsCreated} created</span>
                          <span>{member.promptsUsed} used</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{member.successRate}%</p>
                        <Badge variant="secondary">Success Rate</Badge>
                      </div>
                      <Progress value={member.successRate} className="w-20 h-2 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Patterns Tab */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Times</CardTitle>
                <CardDescription>
                  When your team is most active
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "9:00 AM - 12:00 PM", usage: 45, percentage: 35 },
                    { time: "12:00 PM - 3:00 PM", usage: 38, percentage: 30 },
                    { time: "3:00 PM - 6:00 PM", usage: 32, percentage: 25 },
                    { time: "6:00 PM - 9:00 PM", usage: 13, percentage: 10 }
                  ].map((period, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{period.time}</span>
                        <span className="text-sm text-muted-foreground">
                          {period.usage} prompts
                        </span>
                      </div>
                      <Progress value={period.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mode Preferences</CardTitle>
                <CardDescription>
                  Which modes are most popular among your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {modeUsage.map((mode, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${mode.color}`} />
                        <span className="font-medium">{mode.mode}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{mode.usage}</p>
                        <p className="text-xs text-muted-foreground">{mode.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </AppLayout>
  )
}