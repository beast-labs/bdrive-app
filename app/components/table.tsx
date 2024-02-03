'use client'
import { Session, createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
import { useEffect, useState } from 'react';
import { GoDownload, GoTrash } from "react-icons/go";

type Todos = Database['public']['Tables']['todos']['Row']

export default function Table({ session }: { session: Session | null }){

    const supabase = createClientComponentClient<Database>()
    const [todos, setTodos] = useState<Todos[]>([])
    const [deleteFile, setdeleteFile] = useState(false)

    const deleteTodo  = async(file_id: number, file_name: string) => {
      try {
        setdeleteFile(true)
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
      finally{
        setdeleteFile(false)
      }
    }

    function bytesToSize(bytes:number) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
   }
    const listFiles = todos.map(file =>
        <tr className='bg-blur-sm text-center text-zinc-400 transition ease hover:text-white hover:bg-purple-700/[0.1] duration-500 border-b-2 border-neutral-100/30' key={file.user_id}>
            <td>{file.file_name}</td>
            <td>{file.inserted_at}</td>
            <td className='w-1/6'>{bytesToSize(file.file_size?file.file_size:0)}</td>
            <td className='overflow-x w-1/4 sm:w-1/5 align-center justify-center'>
              <button className='rounded-md p-1 mt-1' onClick={e => deleteTodo(file.id, file.file_name)}> <GoTrash className='sm:w-6 sm:h-6'/></button>
              <form action={"/api/download/"+file.file_name} method="get" className='inline'>              
                <button id='download' type='submit' className='rounded-md p-1'> <GoDownload className='w-5 sm:w-6 sm:h-6'/></button>
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
        <div className="backdrop-blur-sm rounded-xl h-full w-full p-4 rounded-md inline-block flex flex-col justify-center">
          { deleteFile ? 
            <div className='w-full'>
              <table className="table-auto w-full items-center rounded-md">
              <thead className='border-b border-white bg-purple-300/20'>
                  <tr>
                  <th className='text-purple-500 rounded-tl-lg'>File Name</th>
                  <th className='text-purple-500'>Upload Date</th>
                  <th className='text-purple-500'>Size</th>
                  <th className='text-purple-500 rounded-tr-lg'>Actions</th>
                  </tr>
              </thead>
              </table>
              <div className='flex justify-center space-x-2 p-2 w-full'>
                <p>Deleting...</p>
                <span className="loader"></span>
              </div>
            </div>
          :
            <table className="table-auto overflow-auto w-full items-center rounded-md">
              <thead className='border-b border-white bg-purple-300/20'>
                  <tr>
                  <th className='text-purple-500 rounded-tl-lg'>File Name</th>
                  <th className='text-purple-500'>Upload Date</th>
                  <th className='text-purple-500'>Size</th>
                  <th className='text-purple-500 rounded-tr-lg'>Actions</th>
                  </tr>
              </thead>
              <tbody className=''>
                {listFiles}
              </tbody>
            </table>
          }
            
            
        </div> 
    )
}
