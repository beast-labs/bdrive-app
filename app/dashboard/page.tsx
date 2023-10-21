import Table from "../components/table";
import { Session, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
import { cookies } from 'next/headers'

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function Page() {

  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  console.log(session)
  
    return (
    <main className="flex min-h-screen outline flex-col items-center justify-between p-16">
      <div className="flex items-center outline justify-between p-16 "> Welcome to Dashboard Page!</div>
      <div className="flex items-center outline justify-between p-5">
      <form action="/auth/signout" method="post">
          <button className="button p-2 bg-red-600 rounded-md text-white" type="submit">
            Sign out
          </button>
        </form>
      </div>
      
      <div className="flex items-center outline justify-between min-w-full"> <Table/></div>
      
    </main>
    
    
    )
  }