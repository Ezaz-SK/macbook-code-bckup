"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AppLayout } from "@/components/layout/app-layout"
import { 
  Sparkles, 
  Copy, 
  Save, 
  Share2, 
  Download, 
  RefreshCw,
  Zap,
  BookOpen,
  Code,
  PenTool,
  Briefcase,
  TrendingUp,
  Lightbulb,
  Settings,
  History,
  Star,
  ChevronRight
} from "lucide-react"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Editor() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [originalPrompt, setOriginalPrompt] = useState("Help me write a research paper about climate change")
  const [refinedPrompt, setRefinedPrompt] = useState("")
  const [selectedMode, setSelectedMode] = useState("academic")
  const [isProcessing, setIsProcessing] = useState(false)
  const [promptTitle, setPromptTitle] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("")

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

  const modes = [
    { id: "academic", name: "Academic", icon: BookOpen, description: "Research papers, citations, educational content" },
    { id: "developer", name: "Developer", icon: Code, description: "Code generation, debugging, technical docs" },
    { id: "creative", name: "Creative", icon: PenTool, description: "Marketing copy, content creation, storytelling" },
    { id: "business", name: "Business", icon: Briefcase, description: "Business plans, reports, professional content" }
  ]

  const suggestions = [
    { icon: Lightbulb, text: "Add specific context about your research focus" },
    { icon: TrendingUp, text: "Include desired tone and audience" },
    { icon: Settings, text: "Specify output format and length" },
    { icon: History, text: "Mention any sources or references to include" }
  ]

  const handleRefine = async () => {
    setIsProcessing(true)
    // Simulate API call to Gemini
    setTimeout(() => {
      const refined = `Generate a comprehensive research paper on climate change that includes:

1. Executive summary with key findings
2. Introduction to climate change and its causes
3. Analysis of environmental impacts
4. Economic implications and costs
5. Social and health consequences
6. Current mitigation strategies
7. Future projections and scenarios
8. Policy recommendations
9. Conclusion with actionable insights

Please include recent scientific data, cite reputable sources (IPCC, NASA, NOAA), and maintain an academic tone suitable for university-level research. The paper should be approximately 2000-2500 words and follow standard academic formatting with proper citations.`
      setRefinedPrompt(refined)
      setIsProcessing(false)
    }, 2000)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSave = () => {
    // Save prompt logic here
    console.log("Saving prompt...")
  }

  return (
    <AppLayout>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prompt Editor</h1>
          <p className="text-muted-foreground">
            Create and refine AI prompts with intelligent suggestions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" />
            Version History
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Prompt
          </Button>
        </div>
      </div>

      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Prompt Mode</CardTitle>
          <CardDescription>
            Choose the mode that best fits your use case
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {modes.map((mode) => (
              <Button
                key={mode.id}
                variant={selectedMode === mode.id ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-start"
                onClick={() => setSelectedMode(mode.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <mode.icon className="w-4 h-4" />
                  <span className="font-medium">{mode.name}</span>
                </div>
                <p className="text-xs text-left text-muted-foreground">
                  {mode.description}
                </p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editor Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Original Prompt */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Original Prompt</CardTitle>
                <CardDescription>
                  Your raw input prompt
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopy(originalPrompt)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Prompt Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="Enter a title for your prompt"
                  value={promptTitle}
                  onChange={(e) => setPromptTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="original">Your Prompt</Label>
                <Textarea
                  id="original"
                  placeholder="Enter your prompt here..."
                  value={originalPrompt}
                  onChange={(e) => setOriginalPrompt(e.target.value)}
                  className="min-h-32"
                />
              </div>
              <Button 
                onClick={handleRefine} 
                disabled={!originalPrompt.trim() || isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Refine with AI
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Refined Prompt */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Refined Prompt</CardTitle>
                <CardDescription>
                  AI-enhanced version of your prompt
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCopy(refinedPrompt)}
                  disabled={!refinedPrompt}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Export as TXT
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Export as Markdown
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Export as PDF
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="The refined prompt will appear here..."
                value={refinedPrompt}
                onChange={(e) => setRefinedPrompt(e.target.value)}
                className="min-h-32"
              />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Suggestions */}
      {refinedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>
              Tips to improve your prompt even further
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <suggestion.icon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm">{suggestion.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Options */}
      {refinedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle>Save to Workspace</CardTitle>
            <CardDescription>
              Organize your prompt for future use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="folder">Folder</Label>
                <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic Research</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="creative">Creative Writing</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="research, climate, academic"
                />
              </div>
              <div className="flex items-end">
                <Button className="w-full" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Prompt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <Zap className="w-5 h-5 mr-3 text-yellow-500" />
              <div className="text-left">
                <p className="font-medium">Templates</p>
                <p className="text-sm text-muted-foreground">Browse templates</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <History className="w-5 h-5 mr-3 text-blue-500" />
              <div className="text-left">
                <p className="font-medium">Recent</p>
                <p className="text-sm text-muted-foreground">View history</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <Star className="w-5 h-5 mr-3 text-purple-500" />
              <div className="text-left">
                <p className="font-medium">Favorites</p>
                <p className="text-sm text-muted-foreground">Saved prompts</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
            
            <Button variant="outline" className="justify-start h-auto p-4">
              <Share2 className="w-5 h-5 mr-3 text-green-500" />
              <div className="text-left">
                <p className="font-medium">Share</p>
                <p className="text-sm text-muted-foreground">Collaborate</p>
              </div>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </AppLayout>
  )
}