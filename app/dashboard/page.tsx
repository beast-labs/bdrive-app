import Table from "../components/table";
import { Session, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
import { cookies } from 'next/headers'
import { useState } from "react";
import Upload from "../components/file-upload";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {

  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log(session)

  

    return (
      <section className="bg-gray-900 h-screen text-white">
            <div className="flex py-5 items-center justify-center">
              <div className="flex flex-row items-center space-x-4">
                <h1
                    className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                >
                    Dashboard
                </h1>
                <form action="/auth/signout" method="post">
                      <button className="button p-2 bg-red-600 rounded-md text-white" type="submit">
                        Sign out
                      </button>
                </form>
              </div>    
            </div>
            <div>

            </div>
            <div className="flex flex-col items-center justify-between">
              <div>
                 <Upload/>   
              </div> 
              <div className="w-full">
              <Table session={session}/> 
              </div>              
                  
            </div>
            
        </section>
    // <main className="flex min-h-screen outline flex-col items-center justify-between p-16">
    //   <div className="flex items-center outline justify-between p-16 ">
    //     Welcome to Dashboard Page {session ? session.user.email:''}!
    //   </div>
    //   <div className="flex items-center outline justify-between p-5">
    //   <form action="/auth/signout" method="post">
    //       <button className="button p-2 bg-red-600 rounded-md text-white" type="submit">
    //         Sign out
    //       </button>
    //     </form>
    //   </div>
      
    //   <div className="flex items-center outline justify-between min-w-full"> <Table/></div>
      
    // </main>
    
    
    )
  }