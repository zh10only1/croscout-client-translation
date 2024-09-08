"use client";

import PropertyCard from "@/components/Home/Property/PropertyCard";
import Loading from "@/components/ui/Loading/Loading";
import { getFavorites } from "@/lib/database/getFavorites";
import { useAuthContext } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import FavoriteCard from "./components/FavoriteCard";
import Link from "next/link";
import { goToSpecificSection } from "@/utils/goToSpecificSection";
import { useSearchContext } from "@/providers/SearchProvider";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useTranslation } from "@/app/i18n/client";
import { translateProperties } from "@/lib/database/getProperties";

export interface FavoriteItem {
  _id: string;
  name: string;
  description: string;
  amenities: string[];
  pricePerNight: number;
  location: string;
  state: string;
  propertyType: string;
  owner: string;
  guests: number;
  propertyImages: string[];
  ratings: any[]; // Assuming ratings is an array, replace 'any' with the appropriate type if known
  __v: number;
}

const Favorites = ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  const { t } = useTranslation(lng, "favorites");
  const { user } = useAuthContext();
  const { setIsFilterSection } = useSearchContext();
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?._id) {
        console.log("User ID is undefined, skipping fetch");
        return;
      }
      try {
        // console.log('Setting isLoading to true');
        setLoading(true);
        const data = await getFavorites(user?._id);

        if (data.success) {
            const translationResponse = await translateProperties(data.favoritList, lng, false);
                translationResponse.success ? setFavorites(translationResponse.translatedProperties || [])
                                            : setFavorites(data?.favoritList || []);
        } else {
          console.log(data);
        }
        // console.log('Setting isLoading to false');
        setLoading(false);
      } catch (error) {
        console.log("Error occurred, setting isLoading to false", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?._id, remove]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {favorites.length < 1 ? (
        <div className="empty-state text-center">
          <h1 className="text-2xl lg:text-4xl">{t("NO_FAVORITES_YET")}</h1>
          <p className="text-xl lg:text-2xl">
            {t("FIND_AND_ADD_PLACES")}
          </p>
          <Link
            className="border border-accent py-2 px-10 mt-5 rounded-lg hover:border-white duration-150 flex gap-x-2 items-center"
            href={"/"}
            onClick={() => setIsFilterSection(true)}
          >
            <span>{t("EXPLORE_SOME_PLACES")}</span>
            <FaArrowRightLong />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {favorites.map((favorite: FavoriteItem, index: number) => (
            // <Link
            //     href={`/property-details/${index + 1}`}
            //     key={index}
            //     className="col-span-4 md:col-span-1"
            // >
            <FavoriteCard
              setRemove={setRemove}
              key={index}
              favorite={favorite}
              lng={lng}
            />
            // </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
