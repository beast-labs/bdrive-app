'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
// import { createClient } from '@supabase/supabase-js'

export default function AuthForm() {
  // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const supabase = createClientComponentClient<Database>()
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa,
        style: {
          button: {  color: 'black' },
          anchor: { color: 'white' },
          input: {color:'white'},
          //..
        }
      }}
      providers={['google']}
      redirectTo="https://bdrive-app-git-main-beast-labs.vercel.app/auth/callback"
    />
  )
}