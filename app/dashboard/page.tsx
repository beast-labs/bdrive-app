import Table from "../components/table";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
import { cookies } from 'next/headers'
import Upload from "../components/file-upload";
import Image from "next/image";

export const dynamic = "force-dynamic";
// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {
  
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log(session)

  

    return (
      <section className="bg-gray-900 flex-col text-white h-full w-full mx-auto">
            <div className="flex py-4 items-center justify-center">
              <div className="flex flex-row items-center space-x-4 shadow-lg shadow-purple-700/50 rounded-full p-2 outline outline-1 outline-gray-700">
                <h1
                    className="px-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                >
                    Dashboard
                </h1>
                <Image
                  src={session?.user.user_metadata.avatar_url}
                  width={50}
                  height={50}
                  className="rounded-full place-self-end "
                  alt="User Avatar"
                />
                <form action="/auth/signout" method="post">
                      <button className="button p-3 bg-red-600 rounded-full text-white" type="submit">
                        Sign out
                      </button>
                </form>
              </div>    
            </div>
            <div className="flex flex-col items-center justify-between mt-3">
              <div>
                 <Upload session={session}/>   
              </div> 
              <div className="w-full h-full text-neutral-300">
              <Table session={session}/> 
              </div>              
                  
            </div>
            
        </section>    
    )
  }