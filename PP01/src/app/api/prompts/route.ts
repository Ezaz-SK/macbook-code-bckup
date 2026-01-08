import { NextRequest, NextResponse } from 'next/server'

// Mock data for development
const mockPrompts = [
  {
    id: 1,
    title: "Research Paper Summary Generator",
    description: "Generate comprehensive summaries of academic research papers with proper citations",
    content: "Generate a comprehensive research paper summary...",
    mode: "academic",
    folder: "Academic Research",
    tags: ["research", "summary", "citations"],
    lastUsed: "2 hours ago",
    success: 95,
    favorite: true,
    uses: 45,
    createdBy: "user1",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-10T15:30:00Z"
  },
  {
    id: 2,
    title: "React Component Documentation",
    description: "Create detailed documentation for React components with props and examples",
    content: "Create detailed documentation for React components...",
    mode: "developer",
    folder: "Development",
    tags: ["react", "documentation", "components"],
    lastUsed: "5 hours ago",
    success: 88,
    favorite: false,
    uses: 38,
    createdBy: "user1",
    createdAt: "2023-12-02T09:00:00Z",
    updatedAt: "2023-12-09T14:20:00Z"
  }
]

// Supabase implementation (commented out for now)
/*
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
*/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode')
    const folder = searchParams.get('folder')
    const search = searchParams.get('search')

    // Mock implementation
    let filteredPrompts = mockPrompts

    if (mode && mode !== 'all') {
      filteredPrompts = filteredPrompts.filter(p => p.mode === mode)
    }

    if (folder && folder !== 'all') {
      filteredPrompts = filteredPrompts.filter(p => p.folder === folder)
    }

    if (search) {
      filteredPrompts = filteredPrompts.filter(p => 
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredPrompts,
      total: filteredPrompts.length
    })

    // Supabase implementation
    /*
    let query = supabase
      .from('prompts')
      .select('*')
      .order('updated_at', { ascending: false })

    if (mode && mode !== 'all') {
      query = query.eq('mode', mode)
    }

    if (folder && folder !== 'all') {
      query = query.eq('folder', folder)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data,
      total: data?.length || 0
    })
    */
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, content, mode, folder, tags, favorite } = body

    // Mock implementation
    const newPrompt = {
      id: mockPrompts.length + 1,
      title,
      description,
      content,
      mode,
      folder,
      tags: tags || [],
      favorite: favorite || false,
      uses: 0,
      success: 0,
      lastUsed: null,
      createdBy: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockPrompts.push(newPrompt)

    return NextResponse.json({
      success: true,
      data: newPrompt
    })

    // Supabase implementation
    /*
    const { data, error } = await supabase
      .from('prompts')
      .insert([{
        title,
        description,
        content,
        mode,
        folder,
        tags,
        favorite: favorite || false,
        created_by: 'user1' // Get from auth context
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data
    })
    */
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}