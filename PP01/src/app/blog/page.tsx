"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AppLayout } from "@/components/layout/app-layout"
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Lightbulb,
  Target,
  Filter,
  Star
} from "lucide-react"

export default function Blog() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

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

  const categories = [
    { id: "all", name: "All Posts", icon: BookOpen },
    { id: "tutorials", name: "Tutorials", icon: Target },
    { id: "tips", name: "Tips & Tricks", icon: Lightbulb },
    { id: "case-studies", name: "Case Studies", icon: TrendingUp }
  ]

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with AI Prompt Engineering",
      excerpt: "Learn the fundamentals of crafting effective AI prompts that deliver consistent, high-quality results across different use cases.",
      author: "Sarah Chen",
      date: "Dec 10, 2023",
      readTime: "8 min read",
      category: "tutorials",
      featured: true,
      image: "/blog/prompt-engineering.jpg"
    },
    {
      id: 2,
      title: "10 Advanced Techniques for Better AI Responses",
      excerpt: "Discover professional strategies to enhance your AI interactions and get more precise, relevant, and creative outputs.",
      author: "Alex Kumar",
      date: "Dec 8, 2023",
      readTime: "12 min read",
      category: "tips",
      featured: false,
      image: "/blog/advanced-techniques.jpg"
    },
    {
      id: 3,
      title: "Case Study: How a Marketing Team Increased ROI by 300%",
      excerpt: "Real-world example of how Prompt Pro transformed a marketing team's workflow and dramatically improved campaign performance.",
      author: "Maria Rodriguez",
      date: "Dec 5, 2023",
      readTime: "15 min read",
      category: "case-studies",
      featured: true,
      image: "/blog/case-study.jpg"
    },
    {
      id: 4,
      title: "The Future of AI Collaboration in Teams",
      excerpt: "Explore how AI tools are reshaping team dynamics and creating new possibilities for collaborative work.",
      author: "John Doe",
      date: "Dec 3, 2023",
      readTime: "10 min read",
      category: "tutorials",
      featured: false,
      image: "/blog/future-collaboration.jpg"
    },
    {
      id: 5,
      title: "Optimizing Prompts for Academic Research",
      excerpt: "Specialized techniques for researchers and academics to get the most out of AI for literature reviews and paper writing.",
      author: "Dr. Emily Wilson",
      date: "Dec 1, 2023",
      readTime: "9 min read",
      category: "tips",
      featured: false,
      image: "/blog/academic-research.jpg"
    },
    {
      id: 6,
      title: "Building a Prompt Library for Your Development Team",
      excerpt: "Step-by-step guide to creating a comprehensive prompt library that standardizes your team's AI interactions.",
      author: "Michael Brown",
      date: "Nov 28, 2023",
      readTime: "11 min read",
      category: "tutorials",
      featured: false,
      image: "/blog/dev-team-library.jpg"
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <AppLayout>
      <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Blog & Resources</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn prompt engineering best practices, discover use cases, and stay updated with the latest AI trends.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      {selectedCategory === "all" && !searchQuery && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-bold">Featured Articles</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2">Featured</Badge>
                    <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {selectedCategory === "all" ? "All Articles" : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <p className="text-muted-foreground">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge className="absolute top-4 left-4">
                  {categories.find(c => c.id === post.category)?.name}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or browse a different category.
            </p>
            <Button onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter Signup */}
      <section className="bg-muted/50 rounded-lg p-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <p className="text-muted-foreground">
            Get the latest articles, tips, and updates on AI prompt engineering delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input placeholder="Enter your email" />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
    </AppLayout>
  )
}