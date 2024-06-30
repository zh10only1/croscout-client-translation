"use client"


import { CldUploadWidget, CldUploadWidgetInfo } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { LuImagePlus } from 'react-icons/lu';

interface UploadResult {
    info?: string | CldUploadWidgetInfo | undefined;
}

interface ImageUploaderProps {
    setCurrentImage: React.Dispatch<React.SetStateAction<string>>;
}


export default function ImageUploader({ setCurrentImage }: ImageUploaderProps) {


    function handleUploadSuccess(result: UploadResult) {
        if (typeof result.info === 'object' && result.info !== null && 'secure_url' in result.info) {
            const imageUrl = result.info.secure_url;
            setCurrentImage(imageUrl);
        } else {
            console.error('Unexpected result format:', result);
        }
    }

    return (

        <div className=''>
            <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params"
                onSuccess={handleUploadSuccess}

            >
                {({ open }) => {
                    return (
                        <button type='button' className=' text-white bg-gradient-to-l from-green-400 to-green-500 py-3 rounded-md  px-10 flex-center gap-x-2  w-full border border-transparent hover:border-green-400 hover:from-transparent' onClick={() => open()}>
                            <span className='text-2xl'><LuImagePlus /></span>
                            <span>Upload New Image</span>
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}