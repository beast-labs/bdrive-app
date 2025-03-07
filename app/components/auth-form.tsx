'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
import { motion } from 'framer-motion';

export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="animate-levitate w-4/5 mx-auto p-6 rounded-lg bg-white/20  backdrop-blur-md shadow-lg shadow-gray-500/50"
    >
      <h2 className='text-center text-2xl font-bold underline'>Login</h2>
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
      redirectTo="http://bdrive-app.vercel.app/auth/callback"
    />
    </motion.div>
    
  )
}