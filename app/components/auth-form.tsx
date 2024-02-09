'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa,
        style: {
          button: {  color: 'black' },
          anchor: { color: 'white' },
          input: {color:'white'},
          label: {color:'white'}
        }
      }}
      providers={['google']}
      redirectTo='https://bdrive-app.vercel.app/auth/callback'
    />
  )
}