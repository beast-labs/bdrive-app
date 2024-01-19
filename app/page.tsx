import Image from 'next/image'
import AuthForm from './components/auth-form'

export default function Home() {
  return (
    <section className="bg-gray-900 text-white flex">
            <div
                className="flex-col mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:h-screen lg:items-center md:flex"
            >
                <div className="flex flex-col mx-auto max-w-3xl text-center">
                <h1
                    className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl sm:text-5xl"
                >
                    Welcome to BDrive!
                </h1>

                <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                    A full-stack web application built using Next.js, TailwindCSS, and Supabase.
                    Login to get started.
                </p>

                <div id='login' className="mt-8 flex justify-center">
                    <AuthForm/>
                </div>
                </div>
            </div>
        </section>
  )
}