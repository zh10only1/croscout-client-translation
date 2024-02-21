'use client'
import PropertyCard from "./PropertyCard";
import PrimaryButton from "@/components/ui/buttons/Button";
import { Property } from "@/constant";
import { useSearchContext } from "@/providers/SearchProvider";
import ClearSearchButton from "@/components/ui/buttons/ClearSearchButton";
import { getAllProperty } from "@/lib/database/getProperties";
import Loading from "@/components/ui/Loading/Loading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { removeSearchQuery } from "@/utils/searchQuery";

const PropertyList = () => {
    const [properties, setProperties] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { isSearchBtnClicked, setIsSearchBtnClicked, setActiveCat, setLocation, setLocationObject, setAdultsCount, setChildrenCount } = useSearchContext();

    const searchParams = useSearchParams();
    const queryString = `?${searchParams.toString()}`;
    const locationQuery = searchParams.get("location");
    const guestQuery = searchParams.get("guest");
    const categoryQuery = searchParams.get("category");

    const searchKey = locationQuery || guestQuery || categoryQuery;


    useEffect(() => {
        const getProperty = async () => {
            try {
                setIsLoading(true)
                const data = await getAllProperty(queryString);
                setProperties(data || []);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false)
                console.log(error);
            }
        };
        getProperty();
    }, [queryString]);

    if (isLoading) {
        return <Loading></Loading>
    }

    if (properties.length < 1) {
        return <div className="flex flex-col lg:pb-60 lg:pt-20 pt-10 pb-20 items-center">
            <h1 className="text-4xl font-bold text-white">Not Matched</h1>
            <ClearSearchButton onClick={() => {
                setIsSearchBtnClicked(false);
                // clearSearchInputValue();
                setActiveCat('');
                setLocation('');
                setLocationObject(undefined);
                removeSearchQuery();
                setChildrenCount(0);
                setAdultsCount(0);
            }} />
        </div>
    }



    // console.log(catergoryInputValue);

    return (
        <>
            {/* Clear Search Button */}
            {
                ((searchKey) && properties.length > 0)
                && <div className="mb-5"><ClearSearchButton
                    onClick={() => {
                        setIsSearchBtnClicked(false);
                        // setFilteredProperty([]);
                        setActiveCat('');
                        setLocation('');
                        setLocationObject(undefined)
                        removeSearchQuery();
                        setChildrenCount(0);
                        setAdultsCount(0);
                    }}
                /></div>
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {properties?.map((property: Property, index: number) => (
                    // <Link
                    //     href={`/property-details/${index + 1}`}
                    //     key={index}
                    //     className="col-span-4 md:col-span-1"
                    // >
                    <PropertyCard key={index} property={property} />
                    // </Link>
                ))}
            </div>
            <div className="my-10">
                <PrimaryButton className="px-5 lg:px-10">Show More</PrimaryButton>
            </div>
        </>
    );
};

export default PropertyList;
