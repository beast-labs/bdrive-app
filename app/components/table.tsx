'use client'
import { Session, createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
import { useEffect, useState } from 'react';

type Todos = Database['public']['Tables']['todos']['Row']

export default function Table({ session }: { session: Session | null }){

    const supabase = createClientComponentClient<Database>()
    const [todos, setTodos] = useState<Todos[]>([])

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

    function bytesToSize(bytes:number) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
   }
    const listFiles = todos.map(file =>
        <tr className='hover:bg-gray-100/50 text-center' key={file.user_id}>
            <td>{file.file_name}</td>
            <td>{file.inserted_at}</td>
            <td>{bytesToSize(file.file_size?file.file_size:0)}</td>
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
            setTodos(todos)
          }
        }
    
        fetchTodos()
        
      }, [supabase,todos])
      
    return(
        <div className="bg-transparent p-4 rounded-md inline-block flex w-full shadow justify-center">
            <table className="table-auto w-4/5 items-center rounded-md outline">
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
