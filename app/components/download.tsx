import { Database } from "@/supabase";
import { SupabaseClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
export default async function Download({file_name,supabase} : {file_name :string, supabase : SupabaseClient}){

    const downloadTodo = async() => {
        // const supabase = createServerComponentClient<Database>({ cookies })
        const { data, error } = await supabase.storage.from('avatars').download(file_name)
        console.log("Downloaded File : "+data)
    }
    return(
        <button onClick={e => downloadTodo()}> Download</button>
    )


}
