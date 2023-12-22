'use client'
import { Session, createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import { Database } from '../../supabase'
import { useEffect, useState } from 'react';

type Todos = Database['public']['Tables']['todos']['Row']

export default function Table({ session }: { session: Session | null }){

    const user = session?.user
    const supabase = createClientComponentClient<Database>()
    const [todos, setTodos] = useState<Todos[]>([])
    const listFiles = todos.map(file =>
        <tr className='hover:bg-gray-100/50 text-center' key={file.user_id}>
            <td>{file.file_name}</td>
            <td>{file.inserted_at}</td>
            <td>{file.file_size} KB</td>
            <td> <button> Delete</button></td>
            
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
