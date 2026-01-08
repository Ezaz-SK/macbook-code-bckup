import { NextRequest, NextResponse } from 'next/server'

// Mock data for development
const mockTeams = [
  {
    id: "marketing-team",
    name: "Marketing Team",
    description: "Content creation and campaign management",
    members: 8,
    prompts: 45,
    avatar: "MT",
    role: "admin",
    createdBy: "user1",
    createdAt: "2023-12-01T10:00:00Z",
    updatedAt: "2023-12-10T15:30:00Z"
  },
  {
    id: "dev-team",
    name: "Development Team",
    description: "Code generation and technical documentation",
    members: 12,
    prompts: 78,
    avatar: "DT",
    role: "member",
    createdBy: "user2",
    createdAt: "2023-12-02T09:00:00Z",
    updatedAt: "2023-12-09T14:20:00Z"
  }
]

const mockTeamMembers = [
  {
    id: 1,
    teamId: "marketing-team",
    userId: "user1",
    name: "Sarah Chen",
    email: "sarah@company.com",
    role: "admin",
    avatar: "SC",
    status: "active",
    lastActive: "2 hours ago",
    promptsCreated: 23,
    promptsUsed: 156,
    joinedAt: "2023-12-01T10:00:00Z"
  },
  {
    id: 2,
    teamId: "marketing-team",
    userId: "user2",
    name: "Alex Kumar",
    email: "alex@company.com",
    role: "editor",
    avatar: "AK",
    status: "active",
    lastActive: "5 minutes ago",
    promptsCreated: 18,
    promptsUsed: 89,
    joinedAt: "2023-12-02T09:00:00Z"
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
    const userId = searchParams.get('userId')

    // Mock implementation
    let filteredTeams = mockTeams

    if (userId) {
      // Filter teams where user is a member
      filteredTeams = mockTeams.filter(team => 
        mockTeamMembers.some(member => member.userId === userId && member.teamId === team.id)
      )
    }

    return NextResponse.json({
      success: true,
      data: filteredTeams,
      total: filteredTeams.length
    })

    // Supabase implementation
    /*
    let query = supabase
      .from('teams')
      .select(`
        *,
        team_members!inner(
          user_id,
          role,
          joined_at
        )
      `)
      .order('created_at', { ascending: false })

    if (userId) {
      query = query.eq('team_members.user_id', userId)
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
    const { name, description, avatar } = body

    // Mock implementation
    const newTeam = {
      id: `team-${mockTeams.length + 1}`,
      name,
      description,
      avatar: avatar || name.substring(0, 2).toUpperCase(),
      members: 1,
      prompts: 0,
      role: "admin",
      createdBy: "user1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockTeams.push(newTeam)

    // Add creator as admin member
    mockTeamMembers.push({
      id: mockTeamMembers.length + 1,
      teamId: newTeam.id,
      userId: "user1",
      name: "Current User",
      email: "user@example.com",
      role: "admin",
      avatar: "CU",
      status: "active",
      lastActive: "Just now",
      promptsCreated: 0,
      promptsUsed: 0,
      joinedAt: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      data: newTeam
    })

    // Supabase implementation
    /*
    const { data, error } = await supabase
      .from('teams')
      .insert([{
        name,
        description,
        avatar: avatar || name.substring(0, 2).toUpperCase(),
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

    // Add creator as admin member
    await supabase
      .from('team_members')
      .insert([{
        team_id: data.id,
        user_id: 'user1',
        role: 'admin'
      }])

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