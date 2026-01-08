"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Users, 
  Plus, 
  Search, 
  Settings, 
  Crown,
  Shield,
  User,
  Mail,
  MoreHorizontal,
  Activity,
  FileText,
  TrendingUp,
  Calendar,
  MessageSquare,
  Star,
  Filter
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Teams() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState("marketing-team")

  const teams = [
    {
      id: "marketing-team",
      name: "Marketing Team",
      description: "Content creation and campaign management",
      members: 8,
      prompts: 45,
      avatar: "MT",
      role: "admin"
    },
    {
      id: "dev-team",
      name: "Development Team",
      description: "Code generation and technical documentation",
      members: 12,
      prompts: 78,
      avatar: "DT",
      role: "member"
    },
    {
      id: "research-team",
      name: "Research Team",
      description: "Academic papers and research summaries",
      members: 6,
      prompts: 32,
      avatar: "RT",
      role: "member"
    }
  ]

  const currentTeam = teams.find(t => t.id === selectedTeam) || teams[0]

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah@company.com",
      role: "admin",
      avatar: "SC",
      status: "active",
      lastActive: "2 hours ago",
      promptsCreated: 23,
      promptsUsed: 156
    },
    {
      id: 2,
      name: "Alex Kumar",
      email: "alex@company.com",
      role: "editor",
      avatar: "AK",
      status: "active",
      lastActive: "5 minutes ago",
      promptsCreated: 18,
      promptsUsed: 89
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      email: "maria@company.com",
      role: "editor",
      avatar: "MR",
      status: "active",
      lastActive: "1 hour ago",
      promptsCreated: 15,
      promptsUsed: 67
    },
    {
      id: 4,
      name: "John Doe",
      email: "john@company.com",
      role: "viewer",
      avatar: "JD",
      status: "away",
      lastActive: "2 days ago",
      promptsCreated: 8,
      promptsUsed: 34
    },
    {
      id: 5,
      name: "Emily Wilson",
      email: "emily@company.com",
      role: "editor",
      avatar: "EW",
      status: "active",
      lastActive: "30 minutes ago",
      promptsCreated: 12,
      promptsUsed: 78
    }
  ]

  const teamActivity = [
    {
      id: 1,
      user: "Sarah Chen",
      action: "created a new prompt",
      target: "Q4 Marketing Campaign",
      time: "10 minutes ago",
      type: "create"
    },
    {
      id: 2,
      user: "Alex Kumar",
      action: "commented on",
      target: "API Documentation Template",
      time: "1 hour ago",
      type: "comment"
    },
    {
      id: 3,
      user: "Maria Rodriguez",
      action: "shared",
      target: "Social Media Content Calendar",
      time: "3 hours ago",
      type: "share"
    },
    {
      id: 4,
      user: "Emily Wilson",
      action: "updated",
      target: "Email Newsletter Template",
      time: "5 hours ago",
      type: "update"
    }
  ]

  const sharedPrompts = [
    {
      id: 1,
      title: "Q4 Marketing Campaign",
      description: "Comprehensive marketing campaign prompts for Q4",
      createdBy: "Sarah Chen",
      lastUpdated: "2 hours ago",
      uses: 45,
      success: 92,
      verified: true
    },
    {
      id: 2,
      title: "API Documentation Template",
      description: "Standard template for API documentation",
      createdBy: "Alex Kumar",
      lastUpdated: "1 day ago",
      uses: 38,
      success: 88,
      verified: true
    },
    {
      id: 3,
      title: "Social Media Content Calendar",
      description: "Monthly social media content planning",
      createdBy: "Maria Rodriguez",
      lastUpdated: "3 days ago",
      uses: 28,
      success: 85,
      verified: false
    }
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="w-4 h-4 text-yellow-500" />
      case "editor":
        return <Shield className="w-4 h-4 text-blue-500" />
      default:
        return <User className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Team Workspace</h1>
          <p className="text-muted-foreground">
            Collaborate with your team on AI prompts
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Invite Members
        </Button>
      </div>

      {/* Team Selector */}
      <div className="grid gap-4 md:grid-cols-3">
        {teams.map((team) => (
          <Card 
            key={team.id} 
            className={`cursor-pointer transition-colors ${
              selectedTeam === team.id ? "border-primary" : ""
            }`}
            onClick={() => setSelectedTeam(team.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{team.avatar}</AvatarFallback>
                </Avatar>
                {team.role === "admin" && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <CardTitle className="text-lg">{team.name}</CardTitle>
              <CardDescription>{team.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{team.members}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>{team.prompts}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="prompts">Shared Prompts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    Manage {currentTeam.name} members and permissions
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search members..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/avatars/${member.id}.png`} />
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{member.name}</p>
                          {getRoleIcon(member.role)}
                          <Badge variant="secondary" className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Last active {member.lastActive}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{member.promptsCreated} created</p>
                      <p className="text-sm text-muted-foreground">{member.promptsUsed} used</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="w-4 h-4 mr-2" />
                          Change Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Remove from Team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shared Prompts Tab */}
        <TabsContent value="prompts" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Shared Prompts</CardTitle>
                  <CardDescription>
                    Prompts shared with {currentTeam.name}
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Share Prompt
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedPrompts.map((prompt) => (
                  <div key={prompt.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{prompt.title}</h3>
                        {prompt.verified && (
                          <Badge variant="default" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {prompt.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Created by {prompt.createdBy}</span>
                        <span>•</span>
                        <span>Updated {prompt.lastUpdated}</span>
                        <span>•</span>
                        <span>{prompt.uses} uses</span>
                        <span>•</span>
                        <span>{prompt.success}% success</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Prompt</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Verify Prompt</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>
                Recent activity from {currentTeam.name} members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>
                  Overall team metrics and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Prompts Created</span>
                    <span className="font-medium">156</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Team Collaboration Score</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Prompt Success Rate</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>
                  Members with the most contributions this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.slice(0, 4).map((member, index) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.promptsCreated} prompts
                          </p>
                        </div>
                      </div>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}