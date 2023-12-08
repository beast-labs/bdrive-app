'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '../../supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
type Files = Database['public']['Tables']['files']['Row']


export default function Upload() {


    const supabase = createClientComponentClient<Database>()
    const [uploading, setUploading] = useState(false)
    const [fileSelected, setfileSelected] = useState(false)


    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      const button: HTMLButtonElement = event.currentTarget;
      if(!fileSelected){
        alert('no file is selected.')
      }
      //setfileSelected(true);
    };
    
    const uploadFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
        setUploading(true)

        if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.')
        }
        
        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${33}-${Math.random()}.${fileExt}`
        setfileSelected(true)
        //const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
        // onUpload(filePath)
        } catch (error) {
        alert('Error selecting file to upload!')
        } finally {
        setUploading(false)
        }
    }
  return(
    <div className='flex items-center justify-center space-x-4'>
        <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-white outline hover:bg-white/[0.1] p-3">
            <span>Select a file</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={uploadFile}/>
        </label>
        <button className="rounded-md bg-transparent font-semibold text-white outline hover:bg-white/[0.1] p-3"
        onClick={buttonHandler}>
            <span>Upload</span>
        </button>

    </div>
  )
}