'use client'
import { Session, createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
import { useEffect, useState } from 'react';

type Todos = Database['public']['Tables']['todos']['Row']

export default function Table({ session }: { session: Session | null }){

    const user = session?.user
    const supabase = createClientComponentClient<Database>()
    const [todos, setTodos] = useState<Todos[]>([])

    const downloadTodo = async(file_name:string) => {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(file_name)
        console.log("Data : "+data)
        const url = URL.createObjectURL(data)
        console.log("File URL : "+url)
        const downloadLink = document.createElement('a')
        
        downloadLink.href = url
        document.body.appendChild(downloadLink);
        downloadLink?.click()
        downloadLink.download = file_name
        downloadLink.target = "_blank"
        document.body.removeChild(downloadLink)
        // await fs.writeFile("name", buffer);
        // const buffer = Buffer.from(await data.arrayBuffer());
        // console.log("File Buffer :"+buffer.toJSON())
        // await fs.writeFile("/", buffer);
        console.log(`File downloaded to`);
        if (error) {
          throw error
        }
      }catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    const deleteTodo  = async(file_id: number, file_name: string) => {
      try {
        //remove from storage bucket
        await supabase
        .storage
        .from('avatars')
        .remove([file_name])
        //remove from table
       await supabase
          .from('todos')
          .delete()
          .eq('id', file_id )
       
      } catch (error) {
        console.log('error', error)
      }
    }
    const listFiles = todos.map(file =>
        <tr className='hover:bg-gray-100/50 text-center' key={file.user_id}>
            <td>{file.file_name}</td>
            <td>{file.inserted_at}</td>
            <td>{file.file_size} KB</td>
            <td>
              <button onClick={e => deleteTodo(file.id, file.file_name)}> Delete</button>
              <form action={"/api/download/"+file.file_name} method="get" className='inline'>              
                <button id='download' type='submit'> Down</button>
              </form>
            </td>
            
        </tr>
      );

      useEffect(() => {
        const fetchTodos = async () => {
          const { data: todos, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: true })
    
          if (error) console.log('error', error)
          else {
            console.log("Todos: "+todos)
            setTodos(todos)
          }
        }
    
        fetchTodos()
        
      }, [supabase,todos])
      
    return(
        <div className="bg-transparent p-4 rounded-md inline-block flex w-full shadow">
            <table className="table-auto w-full items-center rounded-md outline">
                <thead className='border-b-2 border-neutral-300'>
                    <tr>
                    <th>File Name</th>
                    <th>Upload Date</th>
                    <th>Size</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listFiles}
                </tbody>
            </table>
        </div> 
    )
}
