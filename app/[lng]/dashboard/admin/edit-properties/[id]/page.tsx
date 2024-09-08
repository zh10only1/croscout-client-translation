"use client";
import { useParams, useRouter } from "next/navigation";
import { categoryList, defaultStates } from "@/constant";
import React, { useEffect, useState } from "react";
import { getPropertyById } from "@/lib/database/getProperties";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthContext } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import ImageUploader from "@/app/[lng]/dashboard/agent/add-property/components/ImageUploader";
import styles from "@/app/[lng]/dashboard/agent/add-property/components/addProperty.module.css";
import Loading from "@/components/ui/Loading/Loading";
import { getStoredToken } from "@/utils/tokenStorage";
import { useTranslation } from "@/app/i18n/client";

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
  const { t } = useTranslation(lng, "editProperties")

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
    if (!user) {
      toast.error(t("LOGIN_FIRST"));
      return;
    }
    if (!user?.isCompletedProfile) {
      return toast.error(t("COMPLETE_PROFILE"));
    }
    if (imagesArr.length < 1) {
      return setImagesArrError(t("IMAGE_REQUIRED"));
    }
    setImagesArrError("");
    if (amenities.length === 0) {
      return setAmenitiesError(true);
    }
    setAmenitiesError(false);
    
    const finalData = {
      ...data,
      amenities: amenities,
      propertyImages: [...imagesArr],
      owner: user?._id,
    };

    try {
      const token = getStoredToken();
      if (!token) throw new Error("Token is required for get Favorites");

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

      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        router.push(`/${lng}/dashboard/admin/all-properties`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Failed to submit property:", error);
    }
  };

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
                  {/* Property Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="property-name">{t("PROPERTY_NAME")}</label>
                    <input
                      type="text"
                      id="property-name"
                      placeholder={t("PROPERTY_NAME")}
                      defaultValue={propertiesData?.property?.name || ""}
                      {...register("name", { required: true })}
                    />

                    {/*//! Error */}
                    {errors?.name && (
                      <p className="text-red-600 mt-1 lg:text-base text-sm">
                        {t("PROPERTY_NAME_REQUIRED")}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="description">{t("DESCRIPTION")}</label>
                    <textarea
                      id="description"
                      placeholder={t("DESCRIPTION")}
                      defaultValue={propertiesData?.property?.description}
                      {...register("description", { required: true })}
                    ></textarea>

                    {/*//! Error */}
                    {errors?.description && (
                      <p className="text-red-600 mt-1 lg:text-base text-sm">
                        {t("DESCRIPTION_REQUIRED")}
                      </p>
                    )}
                  </div>
                </div>
                {/* <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-100 h-[1px] w-full"></div> */}
                <div className="grid gap-4">
                  {/*Amenities  */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="amenities">{t("AMENITIES")}</label>
                    <p className="flex w-full rounded-md border-none outline-none text-sm lg:text-base text-secondary-50 placeholder:text-sm">
                      {amenities?.map((amenity, indx) => (
                        <span key={indx}> {amenity}, </span>
                      ))}
                    </p>
                    <div className="flex gap-4 relative">
                      <input
                        id="amenities"
                        className=""
                        placeholder={t("INPUT_AMENITY")}
                      />
                      <span
                        onClick={handleAddAminity}
                        className="absolute text-white bg-gradient-to-l from-cyan-400 to-cyan-500 py-3 rounded-r-md cursor-pointer  px-10 flex-center gap-x-2 right-0"
                      >
                        + {t("ADD_AMENITY")}
                      </span>
                    </div>
                    {amenitiesError && (
                      <p className="text-red-600 mt-1 lg:text-base text-sm">
                        {t("AMENITIES_REQUIRED")}
                      </p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Price Per Night */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="pricePerNight">{t("PRICE_PER_NIGHT")}</label>
                      <input
                        type="number"
                        id="pricePerNight"
                        placeholder={t("PRICE_PER_NIGHT")}
                        min="1"
                        defaultValue={propertiesData?.property?.pricePerNight}
                        {...register("pricePerNight", { required: true })}
                      />

                      {/*//! Error */}
                      {errors?.pricePerNight && (
                        <p className="text-red-600 mt-1 lg:text-base text-sm">
                          {t("PRICE_REQUIRED")}
                        </p>
                      )}
                    </div>

                    {/* Property Type */}
                    <div className={`flex flex-col gap-1.5 `}>
                      <label htmlFor="property-type">{t("PROPERTY_TYPE")}</label>
                      <select
                        id="input-field"
                        className="form-select"
                        {...register("propertyType", { required: true })}
                        defaultValue={propertiesData?.property?.propertyType}
                      >
                        {/* <option value="" selected disabled>Select an option</option> */}
                        {categoryList.map((category, i) => (
                          <option key={i} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>

                      {/*//! Error */}
                      {errors?.propertyType && (
                        <p className="text-red-600 mt-1 lg:text-base text-sm">
                          {t("PROPERTY_TYPE_REQUIRED")}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={`grid md:grid-cols-2 gap-4 ${styles.state}`}>
                    {/* Location */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="location">{t("LOCATION")}</label>
                      <select
                        id="input-field"
                        className="form-select"
                        defaultValue={propertiesData?.property?.location}
                        {...register("location", { required: true })}
                      >
                        <option value="" disabled defaultValue="Croatia">
                        {t("SELECT_OPTION")}
                        </option>
                        <option value="Croatia">Croatia</option>
                      </select>

                      {/*//! Error */}
                      {errors?.location && (
                        <p className="text-red-600 mt-1 lg:text-base text-sm">
                          {t("LOCATION_REQUIRED")}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="state">{t("STATE")}</label>
                      <select
                        id="state"
                        className="form-select"
                        defaultValue={propertiesData?.property?.state}
                        {...register("state", { required: true })}
                      >
                        <option value="" disabled>
                          {t("SELECT_OPTION")}
                        </option>
                        {defaultStates.map((state, indx) => (
                          <option key={indx} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>

                      {/*//! Error */}
                      {errors?.state && (
                        <p className="text-red-600 mt-1 lg:text-base text-sm">
                          {t("STATE_REQUIRED")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="guests">{t("GUESTS_NUMBER")}</label>
                    <input
                      type="number"
                      className=""
                      id="guests"
                      max={15}
                      min={1}
                      placeholder={t("ENTER_NUMBER")}
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
                        {t("GUESTS_REQUIRED")}
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
                    {t("SAVE")}
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
