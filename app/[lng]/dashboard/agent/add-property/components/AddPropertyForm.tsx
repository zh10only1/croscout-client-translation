"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./addProperty.module.css"
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { categoryList, defaultStates, defaultStatesForMap } from "@/constant";
import Image from "next/image";
import { IoIosCloseCircle, IoMdClose } from "react-icons/io";
import { useAuthContext } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { ImSpinner } from "react-icons/im";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { getStoredToken } from "@/utils/tokenStorage";

type Inputs = {
    name: string
    description: string
    amenities: string
    pricePerNight: number
    location: string
    state: string
    propertyType: string
    image: string
    owner: string
    ratings: number
    guests: number
}

type AmenitiesState = string[];

const AddPropertyForm = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<Inputs>();
    const [imagesArr, setImagesArr] = useState<string[]>([]);
    const [imagesArrError, setImagesArrError] = useState('');
    const [amenitiesError, setAmenitiesError] = useState(false);
    const [amenities, setAmenities] = useState<AmenitiesState>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const router = useRouter();

    const removeImage = (index: number) => {
        setImagesArr(prevImages => prevImages.filter((_, i) => i !== index));
        console.log(imagesArr);
    };

    // Define onSubmit function to handle form submission
    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        //* Check if user is logged in
        if (!user) {
            toast.error("Login First");
            return;
        }

        //* Check if user has completed their profile
        if (!user.isCompletedProfile) {
            setIsLoading(false);
            return toast.error("At first complete your profile in the dashboard settings.");
        }

        //* Check if images are uploaded
        if (imagesArr.length < 1) {
            return setImagesArrError('Image is required!');
        }
        setImagesArrError('');

        //* Check if amenities are selected
        if (amenities.length === 0) {
            return setAmenitiesError(true);
        }
        setAmenitiesError(false);

        //* Construct the final object with the amenities array and other data
        const finalData = {
            ...data,
            amenities: amenities,
            propertyImages: [...imagesArr],
            owner: user?._id
        };

        try {

            const token = getStoredToken();
            if (!token) throw new Error('Token is required for get Favorites');

            setIsLoading(true);
            // Send a POST request to the server with the property data
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(finalData),
            });

            // Parse the response
            const result = await response.json();

            if (result.success) {
                toast.success(result.message, { duration: 5000 });
                router.push('manage-properties');
            } else {
                //* If there's an error, show error message
                toast.error(result.error);
            }
            setIsLoading(false);
        } catch (error) {

            //! Handle any errors that occur during the submission process
            setIsLoading(false);
            console.error('Failed to submit property:', error);
        }
        setIsLoading(false);
    };

    // Function to handle addition of an amenity
    const handleAddAminity = () => {
        //* Get the input element for amenity
        const amenityInput = document.getElementById("amenities") as HTMLInputElement;
        const amenity = amenityInput.value;

        //* Check if the input is not empty
        if (amenity.length <= 0) return;
        // Add the amenity to the amenities array
        setAmenities([...amenities, amenity]);
        setAmenitiesError(false);

        // Clear the input field
        amenityInput.value = "";
    };


    if (!user?.isCompletedProfile) {
        return <div className="empty-state text-center">
            <h1 className="text-2xl font-bold">First complete your profile. After that you can add property</h1>
            <Link className="border border-accent py-2 px-10 mt-5 rounded-lg hover:border-white duration-150 flex gap-x-2 items-center" href={'/dashboard/agent/profile'}><span>Go to Profile</span><FaArrowRightLong /></Link>
        </div>
    }

    return (
        <div>
            <main className="overflow-auto">
                <div className="mx-auto max-w-6xl space-y-8 lg:p-4 text-secondary-50">
                    <div className="rounded-lg bg-primary-50 text-card-foreground shadow-lg" data-v0-t="card">
                        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.formInput} px-2 py-4 lg:p-12 space-y-4`}>
                            <div className={` grid gap-4`}>

                                {/* Property Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="property-name"
                                    >
                                        Property name
                                    </label>
                                    <input
                                        type="text"
                                        id="property-name"
                                        placeholder="Property name"
                                        {...register("name", { required: true })}
                                    />

                                    {/*//! Error */}
                                    {errors?.name && <p className="text-red-600 mt-1 lg:text-base text-sm">Property name is required!</p>}
                                </div>


                                {/* Description */}
                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="description"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        placeholder="Description"
                                        {...register("description", { required: true })}
                                    ></textarea>

                                    {/*//! Error */}
                                    {errors?.description && <p className="text-red-600 mt-1 lg:text-base text-sm">Description name is required!</p>}
                                </div>
                            </div>
                            {/* <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-100 h-[1px] w-full"></div> */}
                            <div className="grid gap-4">

                                {/*Amenities  */}
                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="amenities"
                                    >
                                        Amenities
                                    </label>
                                    <p className="flex w-full rounded-md border-none outline-none text-sm lg:text-base text-secondary-50 placeholder:text-sm">
                                        {

                                            amenities?.map((amenity, indx) => <span key={indx}> {amenity}, </span>)
                                        }
                                    </p>
                                    <div className="flex gap-4 relative">
                                        <input
                                            id="amenities"
                                            className=""
                                            placeholder="Input amenity and press the button"
                                        />
                                        <span onClick={handleAddAminity} className="absolute text-white bg-gradient-to-l from-cyan-400 to-cyan-500 py-2.5 lg:py-3 px-2 rounded-r-md cursor-pointer  md:px-10 flex-center gap-x-2 right-0">+ Add Amenity</span>
                                    </div>
                                    {amenitiesError && <p className="text-red-600 mt-1 lg:text-base text-sm">Amenities is required!</p>}

                                </div>

                                <div className="grid md:grid-cols-2 gap-4">

                                    {/*//* Price Per Night */}
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="pricePerNight"
                                        >
                                            Price per night
                                        </label>
                                        <input
                                            type="number"
                                            id="pricePerNight"
                                            placeholder="PricePerNight"
                                            min="1"
                                            {...register("pricePerNight", { required: true })}
                                        />

                                        {/*//! Error */}
                                        {errors?.pricePerNight && <p className="text-red-600 mt-1 lg:text-base text-sm">Price is required!</p>}
                                    </div>

                                    {/*//* Property Type */}
                                    <div className={`flex flex-col gap-1.5 `}>
                                        <label
                                            htmlFor="property-type"
                                        >
                                            Property type
                                        </label>
                                        <select id="input-field" defaultValue="" className="form-select"
                                            {...register("propertyType", { required: true })}
                                        >
                                            <option value="" disabled>Select an option</option>
                                            {
                                                categoryList.map((category, i) => <option
                                                    key={i} value={category.name}>
                                                    {category.name}
                                                </option>)
                                            }
                                        </select>

                                        {/*//! Error */}
                                        {errors?.propertyType && <p className="text-red-600 mt-1 lg:text-base text-sm">Property type name is required!</p>}
                                    </div>
                                </div>

                                <div className={`grid md:grid-cols-2 gap-4 ${styles.state}`}>

                                    {/* Location */}
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="location"
                                        >
                                            Location
                                        </label>
                                        <select id="input-field" className="form-select"
                                            {...register("location", { required: true })}
                                        >
                                            <option value="" disabled defaultValue="Croatia">Select an option</option>
                                            {/* <option value="Bangladesh">Bangladesh</option> */}
                                            {/* <option value="Germany">Germany</option> */}
                                            <option value="Croatia" >Croatia</option>
                                        </select>


                                        {/*//! Error */}
                                        {errors?.location && <p className="text-red-600 mt-1 lg:text-base text-sm">Location is required!</p>}
                                    </div>

                                    {/* State */}
                                    <div className="flex flex-col gap-1.5">
                                        <label
                                            htmlFor="state"
                                        >
                                            State
                                        </label>
                                        <select
                                            id="state"
                                            className="form-select"
                                            {...register("state", { required: true })}
                                        >
                                            <option value="" disabled>Select an option</option>
                                            {
                                                defaultStatesForMap?.map((state, indx) => <option key={indx} value={state.label}>{state.label}</option>
                                                )
                                            }
                                        </select>

                                        {/*//! Error */}
                                        {errors?.state && <p className="text-red-600 mt-1 lg:text-base text-sm">State name is required!</p>}
                                    </div>
                                </div>


                                {/* Guests */}
                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="guests"
                                    >
                                        Number of guests
                                    </label>
                                    <input
                                        type="number"
                                        className=""
                                        id="guests"
                                        max={15}
                                        min={1}
                                        placeholder="Enter number"
                                        onInput={(e) => {
                                            const inputValue = +(e.target as HTMLInputElement).value;
                                            if (inputValue > 15) {
                                                (e.target as HTMLInputElement).value = '15';
                                            }
                                        }}
                                        {...register("guests", { required: true, max: 15 })}
                                    />
                                    {/*//! Error */}
                                    {errors?.guests && <p className="text-red-600 mt-1 lg:text-base text-sm">Guest is required!</p>}
                                </div>

                                {/*//* --------------Upload Images Area End----------------*/}
                                {
                                    imagesArr.length > 0 &&
                                    <div className="flex gap-x-4 w-80">
                                        {
                                            imagesArr.map((imageLink, index) => <button
                                                type="button"

                                                className="relative"
                                            >
                                                <Image src={imageLink} alt="" className="rounded-sm h-full" width={70} height={70} />

                                                <div
                                                    className="absolute text-white top-0 right-0 bg-black rounded-full bg-opacity-70"
                                                    onClick={() => {
                                                        removeImage(index);
                                                    }}>
                                                    <IoMdClose />
                                                </div>
                                            </button>

                                            )
                                        }
                                    </div>
                                }
                                {/*//* Image Uploader Component */}
                                <ImageUploader
                                    setImagesArr={setImagesArr}
                                />

                                {/*//! Error */}
                                {
                                    imagesArrError && <p className="">{imagesArrError}</p>
                                }
                                {/* --------------Upload Images Area End----------------*/}


                                {/* <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="images"
                                    >
                                        Property images
                                    </label>
                                    <input
                                        className="p-0"
                                        type="file"
                                        id="images"
                                        placeholder="Images"
                                        {...register("image", { required: true })}
                                    />
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Upload your images here</div>

                                    {errors?.image && <p className="text-red-600 mt-1 lg:text-base text-sm">Property images is requeart!</p>}
                                </div> */}
                            </div>

                            {/* Save Button */}
                            <div className="flex-center py-3">
                                <button type="submit" className="  bg-blue-500 flex items-center justify-center rounded-md text-white lg:w-1/2 w-full px-5 py-3 cursor-pointer">
                                    {
                                        isLoading ?
                                            <ImSpinner className="animate-spin text-[26px]"></ImSpinner>
                                            :
                                            "Save"
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AddPropertyForm;
