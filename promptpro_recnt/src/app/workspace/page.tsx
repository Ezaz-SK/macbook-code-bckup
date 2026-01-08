"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppLayout } from "@/components/layout/app-layout"
import { 
  FolderOpen, 
  Plus, 
  Search, 
  MoreHorizontal,
  FileText,
  Users,
  Clock,
  Star,
  Grid3X3,
  List,
  Share2,
  Edit,
  Trash2,
  Eye
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Workspace() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")

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

  const folders = [
    {
      id: 1,
      name: "Academic Research",
      description: "Research papers, summaries, and academic content",
      prompts: 24,
      shared: true,
      team: "Research Team",
      lastModified: "2 hours ago",
      color: "bg-blue-100 text-blue-600",
      icon: "📚"
    },
    {
      id: 2,
      name: "Development",
      description: "Code generation, documentation, and technical prompts",
      prompts: 18,
      shared: true,
      team: "Dev Team",
      lastModified: "5 hours ago",
      color: "bg-green-100 text-green-600",
      icon: "💻"
    },
    {
      id: 3,
      name: "Marketing",
      description: "Campaigns, copywriting, and promotional content",
      prompts: 15,
      shared: false,
      team: "Personal",
      lastModified: "1 day ago",
      color: "bg-purple-100 text-purple-600",
      icon: "📈"
    },
    {
      id: 4,
      name: "Creative Writing",
      description: "Stories, articles, and creative content",
      prompts: 12,
      shared: false,
      team: "Personal",
      lastModified: "3 days ago",
      color: "bg-orange-100 text-orange-600",
      icon: "✍️"
    },
    {
      id: 5,
      name: "Business",
      description: "Business plans, reports, and professional content",
      prompts: 8,
      shared: true,
      team: "Marketing Team",
      lastModified: "1 week ago",
      color: "bg-red-100 text-red-600",
      icon: "💼"
    }
  ]

  const recentPrompts = [
    {
      id: 1,
      title: "Research Paper Summary Generator",
      folder: "Academic Research",
      lastUsed: "2 hours ago",
      uses: 45,
      success: 95
    },
    {
      id: 2,
      title: "React Component Documentation",
      folder: "Development",
      lastUsed: "5 hours ago",
      uses: 38,
      success: 88
    },
    {
      id: 3,
      title: "Marketing Email Campaign",
      folder: "Marketing",
      lastUsed: "1 day ago",
      uses: 32,
      success: 92
    }
  ]

  const sharedWithMe = [
    {
      id: 1,
      title: "API Documentation Template",
      sharedBy: "Alex Kumar",
      team: "Dev Team",
      sharedAt: "3 hours ago",
      canEdit: true
    },
    {
      id: 2,
      title: "Social Media Content Calendar",
      sharedBy: "Maria Rodriguez",
      team: "Marketing Team",
      sharedAt: "1 day ago",
      canEdit: false
    }
  ]

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workspace</h1>
          <p className="text-muted-foreground">
            Organize your prompts in folders and collaborate with your team
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Folder
        </Button>
      </div>

      {/* Search and View Options */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="folders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="folders">My Folders</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
          <TabsTrigger value="team">Team Folders</TabsTrigger>
        </TabsList>

        {/* My Folders Tab */}
        <TabsContent value="folders" className="space-y-6">
          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFolders.map((folder) => (
                <Card key={folder.id} className="group hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${folder.color}`}>
                          {folder.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{folder.name}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {folder.description}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{folder.prompts} prompts</span>
                        </div>
                        {folder.shared && (
                          <Badge variant="secondary" className="text-xs">
                            <Users className="w-3 h-3 mr-1" />
                            Shared
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{folder.team}</span>
                        <span>{folder.lastModified}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFolders.map((folder) => (
                <Card key={folder.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${folder.color}`}>
                          {folder.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{folder.name}</h3>
                          <p className="text-sm text-muted-foreground">{folder.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                            <span>{folder.prompts} prompts</span>
                            <span>{folder.team}</span>
                            <span>{folder.lastModified}</span>
                            {folder.shared && (
                              <Badge variant="secondary" className="text-xs">
                                Shared
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Open</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Recent Tab */}
        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Prompts</CardTitle>
              <CardDescription>
                Your recently accessed prompts across all folders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPrompts.map((prompt) => (
                  <div key={prompt.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{prompt.title}</p>
                        <p className="text-sm text-muted-foreground">{prompt.folder}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{prompt.uses} uses</p>
                      <p className="text-xs text-muted-foreground">{prompt.lastUsed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shared with Me Tab */}
        <TabsContent value="shared" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shared with Me</CardTitle>
              <CardDescription>
                Prompts and folders shared by your team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sharedWithMe.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Share2 className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Shared by {item.sharedBy} • {item.team}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.canEdit ? "default" : "secondary"}>
                        {item.canEdit ? "Can edit" : "View only"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{item.sharedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Folders Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Folders</CardTitle>
              <CardDescription>
                Folders shared with your teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {folders.filter(f => f.shared).map((folder) => (
                  <div key={folder.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${folder.color}`}>
                        {folder.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{folder.name}</h3>
                        <p className="text-sm text-muted-foreground">{folder.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>{folder.prompts} prompts</span>
                          <span>{folder.team}</span>
                          <span>{folder.lastModified}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Open
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </AppLayout>
  )
}