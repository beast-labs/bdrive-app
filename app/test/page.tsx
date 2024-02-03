import AuthForm from "../components/auth-form";

export default function Page() {
    return(

        <div className="bg-gray-900 text-white flex flex-col h-screen">
            <div id="title" className="mt-5 w-screen text-center">
                <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent"> 
                    Welcome to BDrive!
                </h1>
                <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                    A full-stack web application built using Next.js, TailwindCSS, and Supabase.
                    Login to get started.
                </p>
            </div>
            <div className="w-1/2 mx-auto mt-5">

                <AuthForm/>
            </div>
            
            
        </div>
    )
    
}