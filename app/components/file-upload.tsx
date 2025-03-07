'use client'
import React, { useState } from 'react'
import { Database } from '../../supabase'
import {  Session,createClientComponentClient } from '@supabase/auth-helpers-nextjs'
type Files = Database['public']['Tables']['files']['Row']
type Todos = Database['public']['Tables']['todos']['Row']

export default function Upload({ session }: { session: Session | null }) {

    const supabase = createClientComponentClient<Database>()
    const [uploading, setUploading] = useState(false)
    const [fileSelected, setfileSelected] = useState(false)
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState(0)
    const [todos, setTodos] = useState<Todos[]>([])
    const [file_obj, setFile] = React.useState<File>()

    const user = session?.user

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
    
    // const uploadFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    //     try {
    //     setUploading(true)

    //     if (!event.target.files || event.target.files.length === 0) {
    //         throw new Error('You must select an image to upload.')
    //     }
        
    //     const file = event.target.files[0]
    //     const fileExt = file.name.split('.').pop()
    //     const filePath = `${file.name}`
    //     setFileSize(file.size)
    //     setFileName(filePath)
        
    //     if(file.size > 2097152){
    //       alert("File is too big! Max File Size : 2 MB!");

    //     }
    //     else{
    //       setfileSelected(true)
    //       // const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
    //       setUploading(false)
    //       // if (uploadError) {
    //       //   throw uploadError
    //       // }
    //     }
        
    //     } catch (error) {
    //     alert('Error selecting file to upload!')
    //     setfileSelected(false)
    //     } finally {
    //     setUploading(false)
    //     }
    // }
  
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

  return(
    <div>
      {uploading? (
        <div className='flex justify-center items-center space-x-2'>
          <p>Uploading...</p>
          <span className="loader"></span>
        </div>
        ) 
      :(
        <div className=''>
        <div className='flex items-center justify-center space-x-4'>
          {/* <label className="relative cursor-pointer rounded-full font-semibold text-white outline hover:bg-purple-600 transition ease duration-300 p-3">
              <span>Select a file</span>
              <input id="file-upload" 
                name="file-upload" 
                type="file"
                // accept=".png, .jpg, .jpeg" 
                className="sr-only" 
                // onChange={uploadFile}
                onChange={selectFile}
              />
            </label> */}
            <input
              type="file"
              onChange={selectFile}
            />
            <button className="rounded-full bg-transparent font-semibold text-white outline p-3"
              onClick={uploadFile}>
              <span>Upload</span>
            </button>
          </div>
          {/* <div className='text-center mt-2'>
            {fileSelected ? <p> File Selected : {fileName}</p>:<p> No File Selected</p>}
          </div> */}
          </div>
      )}
    </div>
    
  )
}