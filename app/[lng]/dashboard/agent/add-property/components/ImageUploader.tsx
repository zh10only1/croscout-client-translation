"use client"

//? Import necessary libraries and modules
import { CldUploadWidget, CldUploadWidgetInfo } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { LuImagePlus } from 'react-icons/lu';
import { useTranslation } from '@/app/i18n/client';

//* Define the UploadResult interface
interface UploadResult {
    info?: string | CldUploadWidgetInfo | undefined;
}

//* Define the ImageUploaderProps interface
interface ImageUploaderProps {
    setImagesArr: React.Dispatch<React.SetStateAction<string[]>>; // Prop to set the array of image URLs
    defaultImages?: string[]; // Prop to provide default images (optional)
    lng: string;
}

//* Define the ImageUploader functional component
export default function ImageUploader({ setImagesArr, defaultImages, lng }: ImageUploaderProps) {
    const { t } = useTranslation(lng, 'profile');

    //* Define state to manage the images
    const [images, setImages] = useState(defaultImages || []);

    //* Function to handle successful image upload
    function handleUploadSuccess(result: UploadResult) {
        if (typeof result.info === 'object' && result.info !== null && 'secure_url' in result.info) {

            //* Extract the image URL from the result
            const imageUrl = result.info.secure_url;
            // console.log('Uploaded image URL:', imageUrl);

            //* Update the images array using setImagesArr
            setImagesArr((prevImagesArr) => [...prevImagesArr, imageUrl]);
        } else {
            console.error('Unexpected result format:', result);
        }
    }

    return (
        <div className=''>

            {/*//* Cloudinary Upload Widget */}
            <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={handleUploadSuccess}>
                {({ open }) => {
                    return (
                        //* Button to open the upload widget
                        <button type='button' className='text-white bg-gradient-to-l from-cyan-400 to-cyan-500 py-3 rounded-md px-10 flex-center gap-x-2 w-full' onClick={() => open()}>
                            <span className='text-2xl'><LuImagePlus /></span>
                            <span>{t("UPLOAD_NEW_IMAGE")}</span>
                        </button>
                    );
                }}
            </CldUploadWidget>
        </div>
    );
}
