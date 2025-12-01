import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prismaClient'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        await prisma.user.upsert({
          where: { id: user.id },
          update: {
            email: user.email!,
            name: user.user_metadata?.name || user.email!.split('@')[0],
            image: user.user_metadata?.avatar_url || null
          },
          create: {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || user.email!.split('@')[0],
            image: user.user_metadata?.avatar_url || null
          }
        })
      }
    }
  }

  return NextResponse.redirect(`${origin}`)
}