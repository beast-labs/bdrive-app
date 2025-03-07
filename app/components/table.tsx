'use client'
import { Session, createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import { Database } from '../../supabase'
import { useEffect, useState } from 'react';
import { GoDownload, GoTrash } from "react-icons/go";
import { motion } from 'framer-motion';
import Toast from './toast';


type Todos = Database['public']['Tables']['todos']['Row']
type ToastState = {
  show: boolean;
  message: string;
  type: 'success' | 'error';
};

export default function Table({ session }: { session: Session | null }){

    const supabase = createClientComponentClient<Database>()
    // const [todos, setTodos] = useState<Todos[]>([])
    const [deleteFile, setdeleteFile] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [fileSelected, setfileSelected] = useState(false)
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState(0)
    const [file_obj, setFile] = useState<File>()
    const [todos, setTodos] = useState<Todos[]>([])
    const [fetching, setFetching] = useState(false)
    const user = session?.user
    const [toast, setToast] = useState<ToastState>({
      show: false,
      message: '',
      type: 'success',
    });
    
      const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ show: true, message, type });
      };
    
      const closeToast = () => {
        setToast({ show: false, message: '', type: 'success' });
      };

    const deleteTodo  = async(file_id: number, file_name: string) => {
      try {
        setdeleteFile(true)
        //remove from storage bucket
        await supabase
        .storage
        .from('file_bucket')
        .remove(['public/'+file_name])
        //remove from table
       await supabase
          .from('todos')
          .delete()
          .eq('id', file_id )
        
          setTodos(todos.filter((x) => x.id != file_id))
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
        <tr key={file.id} className='bg-blur-sm text-center text-zinc-400 transition ease-in-out hover:text-white hover:bg-purple-700/10 duration-500 border-b-2 border-neutral-100/30 hover:shadow-lg'>
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
        setFetching(true)
        const { data: todos, error } = await supabase
          .from('todos')
          .select('*')
          .order('id', { ascending: true })
  
        if (error) console.log('error', error)
        else {
          setFetching(false)
          setTodos(todos)
        }
      }
          
      fetchTodos()
    }, [supabase])
    
    const selectFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
          try {
          setUploading(false)
    
          if (!event.target.files || event.target.files.length === 0) {
              throw new Error('You must select an image to upload.')
          }
          
          const file_obj = event.target.files[0]
          const fileExt = file_obj.name.split('.').pop()
          const filePath = `${file_obj.name}`
          setFileSize(file_obj.size)
          setFileName(filePath)
          setFile(file_obj)
          
          if(file_obj.size > 2097152){
            alert("File is too big! Max File Size : 2 MB!");
    
          }
          else{
            setfileSelected(true)
            // const { error: uploadError } = await supabase.storage.from('file_bucket').upload('public/'+filePath, file_obj)
            // setUploading(false)
            // if (uploadError) {
            //   throw uploadError
            // }
          }
          
          } catch (error) {
          alert('Error selecting file to upload!')
          } finally {
          setUploading(false)
          }
      }
    
      const uploadFile = async (event: React.MouseEvent<HTMLButtonElement>) => {
            
            if(!fileSelected){
              alert('no file is selected.')
            }
            else if(fileSelected){
              if(fileSize > 2097152){
                alert("File is too big! Max File Size : 2 MB!")
              }
              else{
                setUploading(true)
                const { error: uploadError } = await supabase.storage.from('file_bucket').upload('public/'+fileName, file_obj)
                setUploading(false)
                if (uploadError) {
                  throw uploadError
                }
                addTodo("Hello")
                setfileSelected(false)
              }
              
            }
            
          };
          const addTodo = async (taskText: string) => {
            let task = taskText.trim()
            if (task.length) {
              let time = new Date().toLocaleTimeString()
              let date = new Date().toLocaleDateString()
              const { data: todo, error } = await supabase
                .from('todos')
                .insert({user_id: user?.id, file_name: fileName, file_size: fileSize , inserted_at:date+" "+time})
                .select()
                .single()
        
              if (error) {
                setfileSelected(false)
                console.log("Cannot Upload file to supabase :"+error.message)
      
              } else {
                setTodos([...todos, todo])
                console.log(todos)
              }
            }
          }

    return(
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=""
    >
        <div className="bg-gray-500/30 backdrop-blur-md rounded-xl h-full w-full p-4 rounded-md inline-block flex flex-col items-center justify-center">
          <div className='mb-3'>
          <input
              type="file"
              onChange={selectFile}
              className="file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:transition:ease hover:file:bg-gray-200"
            />
            <button className="rounded-full bg-white px-4 py-2 text-violet-700 hover:bg-gray-200 font-semibold text-sm"
              onClick={uploadFile}>
              <span>Upload</span>
            </button>          
          </div>
          {fetching ? <div className='flex items-center justify-center space-x-2 p-2 w-full text-center text-white font-semibold'>
                <p>Loading...</p>
                <span className="loader"></span>
              </div> : <></>}
          { deleteFile ? 
            <div className='w-full'>
              <table className="table-auto w-full items-center rounded-md">
              <thead className='border-b border-white bg-purple-300/20 text-purple-700 hover:shadow-gray-100'>
                  <tr>
                  <th className='text-purple-500 rounded-tl-lg'>File Name</th>
                  <th className='text-purple-500'>Upload Date</th>
                  <th className='text-purple-500'>Size</th>
                  <th className='text-purple-500 rounded-tr-lg'>Actions</th>
                  </tr>
              </thead>
              </table>
              <div className='flex justify-center space-x-2 p-2 w-full text-white'>
                <p>Deleting...</p>
                <span className="loader"></span>
              </div>
            </div>
          :
            <table className="table-auto overflow-auto items-center rounded-md w-full">
              <thead className='border-b border-white bg-purple-300/20 text-purple-700 hover:shadow-gray-100'>
                  <tr className='border-purple-900 border-5 font-bold'>
                  <th className='rounded-tl-md'>File Name</th>
                  <th className=''>Upload Date</th>
                  <th className=''>Size</th>
                  <th className='rounded-tr-md'>Actions</th>
                  </tr>
              </thead>
              <tbody className=''>
                { listFiles }
              </tbody>
            </table>
          }
          {(todos.length==0)? <p> Get started by uploading files.</p>:<> Keep Uploading...</>}
          <button
              onClick={() => showToast('Success! This is a toast message.', 'success')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Show Success Toast
          </button>
          {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
           
        </div>
      </motion.div> 
    )
}
