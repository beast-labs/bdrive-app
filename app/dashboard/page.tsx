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
  // console.log(session)


    return (
      <section className="flex-col text-white h-full w-full mx-auto">
            <div className="flex pt-4 items-center justify-center">
              <div className="flex flex-row items-center space-x-4 shadow-lg shadow-purple-700/50 rounded-full p-2  ">
                <h1
                    className="px-2 text-white text-3xl font-extrabold text-transparent sm:text-5xl"
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
                      <button className="button bg-red-600/80 text-white rounded-full px-3 py-2 hover:bg-red-600 transition ease-in-out duration-100 hover:text-semi-bold" type="submit">
                        Sign out
                      </button>
                </form>
              </div>    
            </div>
            <div className="flex flex-col w-full items-center justify-center mt-3">
              <div className="w-5/6 text-neutral-300 mt-5">
              <Table session={session}/>
              </div>              
                  
            </div>
            
        </section>    
    )
  }