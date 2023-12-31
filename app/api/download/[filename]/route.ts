import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

type GetParams = {
    params: {
      filename: string;
    };
  };
  
  // export an async GET function. This is a convention in NextJS
  export async function GET(req: NextRequest, { params }: GetParams) {

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // filename for the file that the user is trying to download
    const filename = params.filename;
  
    //download the file from supabase
    const { data, error } = await supabase.storage.from('avatars').download(filename)
    if (error){
      console.log("Error Downloading File "+filename+" \nError"+error)
    }
    else{
      console.log("Data : "+data)
        const url = URL.createObjectURL(data)
        console.log("File URL : "+url)

      // use fetch to get a response
      const response = await fetch(url);
    
      // return a new response but use 'content-disposition' to suggest saving the file to the user's computer
      return new NextResponse(response.body, {
        headers: {
          ...response.headers, // copy the previous headers
          "content-disposition": `attachment; filename="${filename}"`,
        },
      });
    }
        
  }