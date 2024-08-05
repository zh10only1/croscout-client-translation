"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Property,
  categoryList,
  defaultStates,
  defaultStatesForMap,
} from "@/constant";
import React, { useEffect, useState } from "react";
import { getPropertyById } from "@/lib/database/getProperties";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthContext } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import ImageUploader from "../../add-property/components/ImageUploader";
import styles from "../../add-property/components/addProperty.module.css";
import Loading from "@/components/ui/Loading/Loading";
import { getStoredToken } from "@/utils/tokenStorage";
import  { translateProperties } from "@/lib/database/getProperties";

type Inputs = {
  name: string;
  description: string;
  amenities: string;
  pricePerNight: number;
  location: string;
  state: string;
  propertyType: string;
  image: string;
  owner: string;
  ratings: number;
  guests: number;
};

// Interface of Properties Data
export interface IPropertyData {
  property: {
    name: string;
    description: string;
    amenities: string[];
    pricePerNight: number;
    location: string;
    state: string;
    propertyType: string;
    propertyImages: string[];
    owner: string;
    ratings: number;
    guests: number;
  };
}

type AmenitiesState = string[];

const EditProperties = ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [imagesArr, setImagesArr] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imagesArrError, setImagesArrError] = useState("");
  const [propertiesData, setPropertiesData] = useState<IPropertyData>();
  const [amenitiesError, setAmenitiesError] = useState(false);
  const [amenities, setAmenities] = useState<AmenitiesState>([]);
  const { user } = useAuthContext();
  const router = useRouter();
  const removeImage = (index: number) => {
    setImagesArr((prevImages) => prevImages.filter((_, i) => i !== index));
    console.log(imagesArr);
  };

  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    try {
      if (typeof id === "string") {
        const propertiesData = await getPropertyById(id);
        setPropertiesData(propertiesData);
        setImagesArr(propertiesData?.property.propertyImages);
        setAmenities([...propertiesData?.property.amenities]);
      }
    } catch (error) {
      console.error("Failed to fetch property data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    //* Check if user is authenticated
    if (!user) {
      toast.error("Login First");
      return;
    }

    //* Check if user has completed profile
    if (!user?.isCompletedProfile) {
      return toast.error(
        "At first complete your profile in the dashboard settings."
      );
    }

    //* Check if images are uploaded
    if (imagesArr.length < 1) {
      return setImagesArrError("Image is required!");
    }
    setImagesArrError("");

    //* Check if amenities are selected
    if (amenities.length === 0) {
      return setAmenitiesError(true);
    }
    setAmenitiesError(false);

    //* Construct the final object with the amenities array
    const finalData = {
      ...data,
      amenities: amenities,
      propertyImages: [...imagesArr],
      owner: user?._id,
    };

    // console.log(finalData);
    // console.log(process.env.NEXT_PUBLIC_SERVER_URL);
    try {
      const token = getStoredToken();
      if (!token) throw new Error("Token is required for get Favorites");
      //* Submit data to server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(finalData),
        }
      );

      // console.log(57, response);
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        router.push(`${lng}/dashboard/agent/manage-properties`);
      } else {
        //!Error
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Failed to submit property:", error);
    }
  };

  //* Define function to add amenity
  const handleAddAminity = () => {
    const amenityInput = document.getElementById(
      "amenities"
    ) as HTMLInputElement;
    const amenity = amenityInput.value;
    if (amenity.length <= 0) return;
    setAmenities([...amenities, amenity]);
    setAmenitiesError(false);
    amenityInput.value = "";
  };

  //* Render Loading component if data is still loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <main className="overflow-auto">
          <div className="mx-auto max-w-6xl space-y-8 lg:p-4 text-secondary-50">
            <div
              className="rounded-lg bg-primary-50 text-card-foreground shadow-lg"
              data-v0-t="card"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={`${styles.formInput} px-2 py-4 lg:p-12 space-y-4`}
              >
                <div className={` grid gap-4`}>
                  {/*//* Property Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="property-name">Property name</label>
                    <input
                      type="text"
                      id="property-name"
                      placeholder="Property name"
                      defaultValue={propertiesData?.property?.name || ""}
                      {...register("name", { required: true })}
                    />

                    {/*//! Error */}
                    {errors?.name && (
                      <p className="text-red-600 mt-1 lg:text-base text-sm">
                        Property name is required!
                      </p>
                    )}
                  </div>

                  {/*//* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      placeholder="Description"
                      defaultValue={propertiesData?.property?.description}
                      {...register("description", { required: true })}
                    ></textarea>

                    {/*//! Error */}
                    {errors?.description && (
                      <p className="text-red-600 mt-1 lg:text-base text-sm">
                        Description name is required!
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4">
                  {/*//* Amenities  */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="amenities">Amenities</label>
                    <p className="flex w-full rounded-md border-none outline-none text-sm lg:text-base text-secondary-50 placeholder:text-sm">
                      {amenities?.map((amenity, indx) => (
                        <span key={indx}> {amenity}, </span>
                      ))}
                    </p>
                    <div className="flex gap-4 relative">
                      <input
                        id="amenities"
                        className=""
                        placeholder="Input amenity and press the button"
                      />
                      <span
                        onClick={handleAddAminity}
                        className="absolute text-white bg-gradient-to-l from-cyan-400 to-cyan-500 py-3 rounded-r-md cursor-pointer  px-10 flex-center gap-x-2 right-0"
                      >
                        + Add Amenity
                      </span>
                    </div>
                    {amenitiesError && (
                      <p className="text-red-600 mt-1 lg:text-base text-sm">
                        Amenities is required!
                      </p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/*//* Price Per Night */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="pricePerNight">Price per night</label>
                      <input
                        type="number"
                        id="pricePerNight"
                        placeholder="PricePerNight"
                        min="1"
                        defaultValue={propertiesData?.property?.pricePerNight}
                        {...register("pricePerNight", { required: true })}
                      />

                      {/*//! Error */}
                      {errors?.pricePerNight && (
                        <p className="text-red-600 mt-1 lg:text-base text-sm">
                          Price is required!
                        </p>
                      )}
                    </div>

                    {/*//* Property Type */}
                    <div className={`flex flex-col gap-1.5 `}>
                      <label htmlFor="property-type">Property type</label>
                      <select
                        id="input-field"
                        className="form-select"
                        {...register("propertyType", { required: true })}
                        defaultValue={propertiesData?.property?.propertyType}
                      >
                        {/*//* <option value="" selected disabled>Select an option</option> */}
                        {categoryList.map((category, i) => (
                          <option key={i} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>

                      {/*//! Error */}
                      {errors?.propertyType && (
                        <p className="text-red-600 mt-1 lg:text-base text-sm">
                          Property type name is required!
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={`grid md:grid-cols-2 gap-4 ${styles.state}`}>
                    {/*//* Location */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="location">Location</label>
                      <select
                        id="input-field"
                        className="form-select"
                        defaultValue={propertiesData?.property?.location}
                        {...register("location", { required: true })}
                      >
                        <option value="" disabled defaultValue="Croatia">
                          Select an option
                        </option>
                        <option value="Croatia">Croatia</option>
                      </select>

                      {/*//! Error */}
                      {errors?.location && (
                        <p className="text-red-600 mt-1 lg:text-base text-sm">
                          Location is required!
                        </p>
                      )}
                    </div>

                    {/*//* State */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="state">State</label>
                      <select
                        id="state"
                        className="form-select"
                        defaultValue={propertiesData?.property?.state}
                        {...register("state", { required: true })}
                      >
                        <option value="" disabled>
                          Select an option
                        </option>
                        {defaultStatesForMap.map((state, indx) => (
                          <option key={indx} value={state.label}>
                            {state.label}
                          </option>
                        ))}
                      </select>

                      {/*//! Error */}
                      {errors?.state && (
                        <p className="text-red-600 mt-1 lg:text-base text-sm">
                          State name is required!
                        </p>
                      )}
                    </div>
                  </div>

                  {/*//* Guests */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="guests">Number of guests</label>
                    <input
                      type="number"
                      className=""
                      id="guests"
                      max={15}
                      min={1}
                      placeholder="Enter number"
                      defaultValue={propertiesData?.property?.guests}
                      onInput={(e) => {
                        const inputValue = +(e.target as HTMLInputElement)
                          .value;
                        if (inputValue > 15) {
                          (e.target as HTMLInputElement).value = "15";
                        }
                      }}
                      {...register("guests", { required: true, max: 15 })}
                    />

                    {/*//! Error */}
                    {errors?.guests && (
                      <p className="text-red-600 mt-1 lg:text-base text-sm">
                        Guest is required!
                      </p>
                    )}
                  </div>

                  {/* --------------Upload Images Area End----------------*/}
                  {(propertiesData?.property?.propertyImages?.length ?? 0) >
                    0 && (
                    <div className="flex gap-x-4 w-80">
                      {imagesArr.map((imageLink, index) => (
                        <button type="button" key={index} className="relative">
                          <Image
                            src={imageLink}
                            alt=""
                            className="rounded-sm h-full"
                            width={70}
                            height={70}
                          />

                          <div
                            className="absolute text-white top-0 right-0 bg-black rounded-full bg-opacity-70"
                            onClick={() => {
                              removeImage(index);
                            }}
                          >
                            <IoMdClose />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Image Uploader Component */}
                  <ImageUploader
                    lng={lng}
                    setImagesArr={setImagesArr}
                    defaultImages={propertiesData?.property.propertyImages}
                  />

                  {/*//! Error */}
                  {imagesArrError && (
                    <p className="text-red-500">{imagesArrError}</p>
                  )}
                  {/* --------------Upload Images Area End----------------*/}
                </div>

                {/* Save Button */}
                <div className="flex-center py-3">
                  <button
                    type="submit"
                    className="  bg-blue-500  rounded-md text-white lg:w-1/2 w-full px-5 py-3 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProperties;
