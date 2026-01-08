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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FileText, 
  FolderOpen, 
  Search, 
  Plus, 
  Filter,
  Star,
  MoreHorizontal,
  Grid3X3,
  List,
  Heart,
  Copy,
  Edit,
  Trash2,
  Eye,
  Download
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Library() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMode, setSelectedMode] = useState("all")
  const [selectedFolder, setSelectedFolder] = useState("all")
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
    { id: 1, name: "Academic Research", count: 24, color: "bg-blue-100 text-blue-600" },
    { id: 2, name: "Development", count: 18, color: "bg-green-100 text-green-600" },
    { id: 3, name: "Marketing", count: 15, color: "bg-purple-100 text-purple-600" },
    { id: 4, name: "Creative Writing", count: 12, color: "bg-orange-100 text-orange-600" },
    { id: 5, name: "Business", count: 8, color: "bg-red-100 text-red-600" },
  ]

  const prompts = [
    {
      id: 1,
      title: "Research Paper Summary Generator",
      description: "Generate comprehensive summaries of academic research papers with proper citations",
      mode: "Academic",
      folder: "Academic Research",
      tags: ["research", "summary", "citations"],
      lastUsed: "2 hours ago",
      success: 95,
      favorite: true,
      uses: 45
    },
    {
      id: 2,
      title: "React Component Documentation",
      description: "Create detailed documentation for React components with props and examples",
      mode: "Developer",
      folder: "Development",
      tags: ["react", "documentation", "components"],
      lastUsed: "5 hours ago",
      success: 88,
      favorite: false,
      uses: 38
    },
    {
      id: 3,
      title: "Marketing Email Campaign",
      description: "Generate compelling marketing emails that drive conversions and engagement",
      mode: "Creative",
      folder: "Marketing",
      tags: ["email", "marketing", "conversion"],
      lastUsed: "1 day ago",
      success: 92,
      favorite: true,
      uses: 32
    },
    {
      id: 4,
      title: "API Error Debug Assistant",
      description: "Help debug API errors by analyzing logs and suggesting solutions",
      mode: "Developer",
      folder: "Development",
      tags: ["api", "debugging", "error-handling"],
      lastUsed: "2 days ago",
      success: 90,
      favorite: false,
      uses: 28
    },
    {
      id: 5,
      title: "Blog Post Outline Generator",
      description: "Create structured outlines for blog posts with engaging sections",
      mode: "Creative",
      folder: "Creative Writing",
      tags: ["blog", "outline", "content"],
      lastUsed: "3 days ago",
      success: 87,
      favorite: true,
      uses: 25
    },
    {
      id: 6,
      title: "Financial Analysis Report",
      description: "Generate comprehensive financial analysis reports with charts and insights",
      mode: "Business",
      folder: "Business",
      tags: ["finance", "analysis", "reporting"],
      lastUsed: "4 days ago",
      success: 93,
      favorite: false,
      uses: 22
    }
  ]

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMode = selectedMode === "all" || prompt.mode.toLowerCase() === selectedMode.toLowerCase()
    const matchesFolder = selectedFolder === "all" || prompt.folder === selectedFolder
    return matchesSearch && matchesMode && matchesFolder
  })

  const PromptCard = ({ prompt }: { prompt: any }) => (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{prompt.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {prompt.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1">
            {prompt.favorite && (
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{prompt.mode}</Badge>
          <Badge variant="outline">{prompt.folder}</Badge>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {prompt.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{prompt.lastUsed}</span>
          <div className="flex items-center gap-3">
            <span>{prompt.uses} uses</span>
            <span>{prompt.success}% success</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prompt Library</h1>
          <p className="text-muted-foreground">
            Organize and manage all your AI prompts in one place
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Prompt
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedMode} onValueChange={setSelectedMode}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modes</SelectItem>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="developer">Developer</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedFolder} onValueChange={setSelectedFolder}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Folders</SelectItem>
            {folders.map(folder => (
              <SelectItem key={folder.id} value={folder.name}>
                {folder.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Folders Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedFolder === "all" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedFolder("all")}
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                All Prompts
                <Badge variant="secondary" className="ml-auto">
                  {prompts.length}
                </Badge>
              </Button>
              {folders.map(folder => (
                <Button
                  key={folder.id}
                  variant={selectedFolder === folder.name ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder(folder.name)}
                >
                  <div className={`w-3 h-3 rounded-full mr-2 ${folder.color.split(' ')[0]}`} />
                  {folder.name}
                  <Badge variant="secondary" className="ml-auto">
                    {folder.count}
                  </Badge>
                </Button>
              ))}
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                New Folder
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Prompts Grid/List */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPrompts.length} of {prompts.length} prompts
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPrompts.map(prompt => (
                <Card key={prompt.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{prompt.title}</h3>
                          {prompt.favorite && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                          <Badge variant="secondary">{prompt.mode}</Badge>
                          <Badge variant="outline">{prompt.folder}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {prompt.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{prompt.lastUsed}</span>
                          <span>{prompt.uses} uses</span>
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
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredPrompts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Prompt
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
    </AppLayout>
  )
}