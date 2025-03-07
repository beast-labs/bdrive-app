import Image from 'next/image'
import AuthForm from './components/auth-form'
import LoginForm from './components/login-form'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="bg-gray-900 text-white flex min-h-screen animated-gradient">
            <div
                className="flex-col mx-auto max-w-screen px-4 py-16 lg:flex lg:items-center md:flex"
            >
                <div className="mx-auto text-center">
                        <h1
                        className="bg-clip-text font-extrabold text-3xl md:text-5xl sm:text-4xl rounded-xl"
                        >
                            Welcome to BDrive!
                        </h1>
                    </div>
                <div>
                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        A full-stack web application built using Next.js, TailwindCSS, and Supabase.
                        Login to get started.
                    </p>
                    <div className="flex items-center justify-center mt-6">
                        <AuthForm/>   
                    </div>
                </div>
            </div>
        </div>
  )
}