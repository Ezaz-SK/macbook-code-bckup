import { NextRequest, NextResponse } from 'next/server'

// Mock data for development
const mockAnalytics = {
  overview: {
    totalPrompts: 1247,
    successRate: 94.2,
    activeUsers: 48,
    avgResponseTime: 2.3,
    monthlyGrowth: 23,
    weeklyActivity: [
      { day: "Mon", prompts: 45, users: 12 },
      { day: "Tue", prompts: 52, users: 15 },
      { day: "Wed", prompts: 48, users: 14 },
      { day: "Thu", prompts: 61, users: 18 },
      { day: "Fri", prompts: 58, users: 16 },
      { day: "Sat", prompts: 32, users: 8 },
      { day: "Sun", prompts: 28, users: 6 }
    ]
  },
  modeUsage: [
    { mode: "Academic", usage: 342, percentage: 27.4 },
    { mode: "Developer", usage: 456, percentage: 36.6 },
    { mode: "Creative", usage: 289, percentage: 23.2 },
    { mode: "Business", usage: 160, percentage: 12.8 }
  ],
  topPrompts: [
    {
      id: 1,
      title: "Research Paper Summary",
      usage: 156,
      success: 95,
      trend: "up",
      growth: "+12%"
    },
    {
      id: 2,
      title: "React Component Docs",
      usage: 142,
      success: 88,
      trend: "up",
      growth: "+8%"
    }
  ],
  teamPerformance: [
    {
      userId: "user1",
      name: "Sarah Chen",
      promptsCreated: 45,
      promptsUsed: 234,
      successRate: 96,
      avatar: "SC"
    },
    {
      userId: "user2",
      name: "Alex Kumar",
      promptsCreated: 38,
      promptsUsed: 189,
      successRate: 92,
      avatar: "AK"
    }
  ]
}

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
    const type = searchParams.get('type')
    const timeRange = searchParams.get('timeRange') || '30d'
    const teamId = searchParams.get('teamId')

    // Mock implementation
    if (type === 'overview') {
      return NextResponse.json({
        success: true,
        data: mockAnalytics.overview
      })
    }

    if (type === 'mode-usage') {
      return NextResponse.json({
        success: true,
        data: mockAnalytics.modeUsage
      })
    }

    if (type === 'top-prompts') {
      return NextResponse.json({
        success: true,
        data: mockAnalytics.topPrompts
      })
    }

    if (type === 'team-performance') {
      let teamData = mockAnalytics.teamPerformance
      
      if (teamId) {
        // Filter by team if specified
        teamData = teamData.filter(member => 
          mockTeamMembers.some(m => m.userId === member.userId && m.teamId === teamId)
        )
      }
      
      return NextResponse.json({
        success: true,
        data: teamData
      })
    }

    // Return all analytics data
    return NextResponse.json({
      success: true,
      data: mockAnalytics
    })

    // Supabase implementation
    /*
    let data = {}

    if (type === 'overview' || !type) {
      // Get overview stats
      const { data: prompts, error: promptsError } = await supabase
        .from('prompts')
        .select('success_rate, created_at')
        .gte('created_at', getDateRange(timeRange))

      const { data: users, error: usersError } = await supabase
        .from('users')
        .select('last_active')
        .gte('last_active', getDateRange(timeRange))

      if (!promptsError && !usersError) {
        data.overview = {
          totalPrompts: prompts?.length || 0,
          successRate: calculateAverageSuccessRate(prompts),
          activeUsers: users?.length || 0,
          avgResponseTime: 2.3, // Would come from actual response time data
          monthlyGrowth: calculateGrowthRate(prompts)
        }
      }
    }

    if (type === 'mode-usage' || !type) {
      // Get mode usage statistics
      const { data: modeData, error: modeError } = await supabase
        .from('prompts')
        .select('mode')
        .gte('created_at', getDateRange(timeRange))

      if (!modeError) {
        data.modeUsage = calculateModeUsage(modeData)
      }
    }

    if (type === 'top-prompts' || !type) {
      // Get top performing prompts
      const { data: topPrompts, error: topError } = await supabase
        .from('prompts')
        .select('*')
        .gte('created_at', getDateRange(timeRange))
        .order('uses', { ascending: false })
        .limit(10)

      if (!topError) {
        data.topPrompts = topPrompts
      }
    }

    if (type === 'team-performance' || !type) {
      // Get team performance data
      let query = supabase
        .from('users')
        .select(`
          *,
          prompts!left(count),
          prompt_usages!left(count)
        `)

      if (teamId) {
        query = query.in('id', 
          supabase.from('team_members')
            .select('user_id')
            .eq('team_id', teamId)
        )
      }

      const { data: teamData, error: teamError } = await query

      if (!teamError) {
        data.teamPerformance = teamData?.map(user => ({
          userId: user.id,
          name: user.name,
          promptsCreated: user.prompts?.length || 0,
          promptsUsed: user.prompt_usages?.length || 0,
          successRate: calculateUserSuccessRate(user.id),
          avatar: user.avatar
        }))
      }
    }

    return NextResponse.json({
      success: true,
      data: type ? data[type] : data
    })
    */
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper functions for Supabase implementation
/*
function getDateRange(timeRange: string) {
  const now = new Date()
  const days = parseInt(timeRange.replace('d', '')) || 30
  const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000))
  return startDate.toISOString()
}

function calculateAverageSuccessRate(prompts: any[]) {
  if (!prompts.length) return 0
  const total = prompts.reduce((sum, prompt) => sum + (prompt.success_rate || 0), 0)
  return Math.round(total / prompts.length)
}

function calculateGrowthRate(prompts: any[]) {
  // Calculate growth rate compared to previous period
  return 23 // Mock value
}

function calculateModeUsage(prompts: any[]) {
  const modeCounts = prompts.reduce((acc, prompt) => {
    acc[prompt.mode] = (acc[prompt.mode] || 0) + 1
    return acc
  }, {})

  const total = prompts.length
  return Object.entries(modeCounts).map(([mode, count]) => ({
    mode,
    usage: count as number,
    percentage: Math.round((count / total) * 100)
  }))
}

function calculateUserSuccessRate(userId: string) {
  // Calculate individual user success rate
  return 90 // Mock value
}
*/