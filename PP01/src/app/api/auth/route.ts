import { NextRequest, NextResponse } from 'next/server'

// Mock data for development
const mockUsers = [
  {
    id: "user1",
    email: "esk@gmail.com",
    name: "Esk User",
    avatar: "EU",
    role: "admin",
    plan: "pro",
    createdAt: "2023-12-01T10:00:00Z",
    lastLogin: "2023-12-10T15:30:00Z",
    password: "12345678"
  },
  {
    id: "user2",
    email: "john.doe@example.com",
    name: "John Doe",
    avatar: "JD",
    role: "user",
    plan: "free",
    createdAt: "2023-12-01T10:00:00Z",
    lastLogin: "2023-12-10T15:30:00Z",
    password: "password123"
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, name } = body

    if (action === 'login') {
      // Mock login implementation
      const user = mockUsers.find(u => u.email === email && u.password === password)
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        )
      }

      // Remove password from user object before sending
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({
        success: true,
        data: {
          user: userWithoutPassword,
          token: 'mock-jwt-token'
        }
      })

      // Supabase implementation
      /*
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 401 }
        )
      }

      return NextResponse.json({
        success: true,
        data: {
          user: data.user,
          token: data.session.access_token
        }
      })
      */
    }

    if (action === 'register') {
      // Mock registration implementation
      const existingUser = mockUsers.find(u => u.email === email)
      
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'User already exists' },
          { status: 400 }
        )
      }

      const newUser = {
        id: `user${mockUsers.length + 1}`,
        email,
        name: name || email.split('@')[0],
        avatar: (name || email.split('@')[0]).substring(0, 2).toUpperCase(),
        role: "user",
        plan: "free",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }

      mockUsers.push(newUser)

      return NextResponse.json({
        success: true,
        data: {
          user: newUser,
          token: 'mock-jwt-token'
        }
      })

      // Supabase implementation
      /*
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || email.split('@')[0]
          }
        }
      })

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 }
        )
      }

      // Create user profile
      if (data.user) {
        await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            name: name || email.split('@')[0],
            avatar: (name || email.split('@')[0]).substring(0, 2).toUpperCase(),
            role: 'user',
            plan: 'free'
          }])
      }

      return NextResponse.json({
        success: true,
        data: {
          user: data.user,
          token: data.session?.access_token
        }
      })
      */
    }

    if (action === 'logout') {
      // Mock logout implementation
      return NextResponse.json({
        success: true,
        message: 'Logged out successfully'
      })

      // Supabase implementation
      /*
      const { error } = await supabase.auth.signOut()

      if (error) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'Logged out successfully'
      })
      */
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock get current user implementation
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    // In a real app, you'd verify the JWT token
    if (token === 'mock-jwt-token') {
      return NextResponse.json({
        success: true,
        data: mockUsers[0]
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid token' },
      { status: 401 }
    )

    // Supabase implementation
    /*
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError) {
      return NextResponse.json(
        { success: false, error: profileError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: profile
    })
    */
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}