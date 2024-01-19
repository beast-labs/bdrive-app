'use client'
import React, { useState } from 'react'
import { Database } from '../../supabase'
import {  Session,createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { prototype } from 'events'
import { error } from 'console'
type Files = Database['public']['Tables']['files']['Row']
type Todos = Database['public']['Tables']['todos']['Row']

export default function Upload({ session }: { session: Session | null }) {

    const supabase = createClientComponentClient<Database>()
    const [uploading, setUploading] = useState(false)
    const [fileSelected, setfileSelected] = useState(false)
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState(0)
    const [todos, setTodos] = useState<Todos[]>([])

    const user = session?.user

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const button: HTMLButtonElement = event.currentTarget;
      if(!fileSelected){
        alert('no file is selected.')
      }
      else if(fileSelected){
        if(fileSize > 2097152){
          alert("File is too big! Max File Size : 2 MB!")
        }
        else{
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
          .insert({user_id: user.id, file_name: fileName, file_size: fileSize , inserted_at:date+" "+time})
          .select()
          .single()
  
        if (error) {
          console.log(error.message)
        } else {
          setTodos([...todos, todo])
          console.log(todo)
        }
      }
    }
    
    const uploadFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
        setUploading(true)

        if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.')
        }
        
        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${file.name}`
        setFileSize(file.size)
        setFileName(filePath)
        
        if(file.size > 2097152){
          alert("File is too big! Max File Size : 2 MB!");

        }
        else{
          setfileSelected(true)
          const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
          setUploading(false)
          if (uploadError) {
            throw uploadError
          }
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
        <div><p>Uploading...</p></div>
        ) 
      :(
        <div className='flex items-center justify-center space-x-4'>
          <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-white outline hover:bg-white/[0.1] p-3">
              <span>Select a file</span>
              <input id="file-upload" 
                name="file-upload" 
                type="file"
                accept=".png, .jpg, .jpeg" 
                className="sr-only" 
                onChange={uploadFile}
              />
            </label>
            <button className="rounded-md bg-transparent font-semibold text-white outline hover:bg-white/[0.1] p-3"
              onClick={buttonHandler}>
              <span>Upload</span>
            </button>
          </div>
      )}
    </div>
    
  )
}