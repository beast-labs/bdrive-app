'use client'
import React, { useEffect, useState } from 'react'
import { Database } from '../../supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
type Files = Database['public']['Tables']['files']['Row']


export default function Upload() {


    const supabase = createClientComponentClient<Database>()

    const [uploading, setUploading] = useState(false)


    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        try {
        setUploading(true)

        if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${33}-${Math.random()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

        if (uploadError) {
            throw uploadError
        }

        // onUpload(filePath)
        } catch (error) {
        alert('Error uploading avatar!')
        } finally {
        setUploading(false)
        }
    }
  return(
    <div>
        {/* <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label> 
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />*/}
        <label className="relative cursor-pointer rounded-md bg-transparent font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:outline hover:bg-white/[0.1] p-3">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                </label>

    </div>
  )
}