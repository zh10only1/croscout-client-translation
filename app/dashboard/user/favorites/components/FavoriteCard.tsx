"use client"

import Image from "next/image";
import { FavoriteItem } from "../page";
import ImageCarousel from "@/components/Home/Property/ImageCarousel";
import { useRouter } from "next/navigation";
import favoritesButton from "./favorite.module.css"
import { useAuthContext } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import { getUser } from "@/lib/database/authUser";
import { getStoredToken } from "@/utils/tokenStorage";

const FavoriteCard = ({ favorite, setRemove }: any) => {
    const { user, userRefetch, setUser } = useAuthContext();
    const {
        _id,
        pricePerNight,
        location,
        state,
        propertyType,
        propertyImages,
    } = favorite;
    const router = useRouter();

    const handleRemove = async () => {
        try {
            const token = getStoredToken();
            if (!token) throw new Error('Token is required for delete Favorites');


            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/favorites/${user?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ propertyId: _id }),
            });

            if (!response.ok) {
                throw new Error('Failed to remove favorite');
            }
            setRemove((prev: boolean) => !prev);

            toast.success('Favorite successfully removed');
            const { user: refetchUser } = await getUser({ token });
            setUser(refetchUser)

        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div
            className={'cursor-pointer relative border border-accent p-[5px] bg-secondary rounded-[8px] text-white '}
        >
            <div className="h-[15rem] w-full relative rounded-t-[4px] overflow-hidden">
                <ImageCarousel propertyId={_id} propertyImages={propertyImages} />
            </div>
            <div
                className="p-2 "
            >
                <div
                    className={"mt-5"}>

                    {/* Location and State */}
                    <h1 className="text-xl font-bold">
                        {`${location.substring(0, 10)}, ${state.substring(0, 13)}`}
                    </h1>


                    {/* Property Type */}
                    <p className="mt-[10px]">{propertyType}</p>


                    {/* Price and Ratings */}
                    <div className="flex justify-between mt-[10px]">
                        {/* Price */}
                        <div className="text-accent font-semibold">€ {pricePerNight} night</div>
                        <div className="flex items-center gap-1.5 border-b border-b-accent">
                            <div className="">
                                {/* <Image src={StartIcon} height={14} width={14} alt="img" /> */}
                            </div>
                            {/* Ratings */}
                            {/* <div className="font-semibold text-accent leading-[100%]">
                            {(
                                property.ratings.reduce((sum: any, rating: any) => sum + rating, 0) / property.ratings.length || 0
                            ).toFixed(1)}
                        </div> */}


                        </div>
                    </div>
                    <div className={`flex gap-3 mt-4 ${favoritesButton.favoritesButton}`}>

                        {/* View Details Button */}
                        <button onClick={() => router.push(`/property-details/${_id}`)} className='hover:bg-green-500  border border-green-500'>View Details</button>

                        {/* Remove Button */}
                        <button
                            onClick={handleRemove}
                            className='hover:bg-[#d33] border border-red-500'>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;