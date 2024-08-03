"use client";

import Image from "next/image";
import userImg from "@/public/noavatar.png";
import { useAuthContext } from "@/providers/AuthProvider";
import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import { SubmitHandler, useForm } from "react-hook-form";
import { getStoredToken } from "@/utils/tokenStorage";
import { updateUserInfo } from "@/lib/database/authUser";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import Swal from "sweetalert2";
import { sendVerificationEmail } from "@/lib/database/verifyEmail";
import { useTranslation } from "@/app/i18n/client";

type IPersonalInfo = {
  name: string;
  email: string;
  telephoneOrPhone: string;
  street: string;
  houseOrBuildingNum: string;
  postcode: string;
  city: string;
  state: string;
  role: string;
  taxNumber: string;
};

type IPasswordInfo = {
  oldPassword: string;
  newPassword: string;
};

const createFormInstance = <T extends Record<string, unknown>>() => {
  return useForm<T>();
};

const ProfilePage = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, "profile");

  const [currentImage, setCurrentImage] = useState("");
  const [isAgent, setIsAgent] = useState(false);

  const { user, setUser, setIsUpdateProfile } = useAuthContext();
  const [isShow, setIsShow] = useState(false);

  const [isInfoLoading, setInfoIsLoading] = useState(false);
  const [isPassLoading, setPassIsLoading] = useState(false);
  const [isImageChangeLoading, setImageChangeLoading] = useState(false);

  const personalInfoForm = createFormInstance<IPersonalInfo>();
  const passwordForm = createFormInstance<IPasswordInfo>();

  const {
    formState: { errors },
  } = personalInfoForm;

  const handleShowPassword = () => {
    setIsShow(!isShow);
  };

  const switchAgentToggle = () => {
    if (!isAgent) {
      setIsAgent(true);
      personalInfoForm.setValue("role", "agent");
      personalInfoForm.register("taxNumber", { required: true });
    } else {
      setIsAgent(false);
      personalInfoForm.setValue("role", "user");
      personalInfoForm.unregister("taxNumber");
    }
  };

  const handleDeleteImage = async () => {
    Swal.fire({
      title: t("DELETE_IMAGE_TITLE"),
      text: t("DELETE_IMAGE_TEXT"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      background: "#182237",
      color: "#F9ECE4",
      cancelButtonColor: "#3085d6",
      cancelButtonText: t("CANCEL_BUTTON"),
      confirmButtonText: t("CONFIRM_BUTTON"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        setImageChangeLoading(true);
        const token = getStoredToken();
        const allData = {
          name: user?.name,
          image: "",
          role: user?.role,
          taxNumber: user?.taxNumber,
          telephoneOrPhone: user?.telephoneOrPhone,
          street: user?.street,
          houseOrBuildingNum: user?.houseOrBuildingNum,
          postcode: user?.postcode,
          city: user?.city,
          state: user?.state,
          isCompletedProfile: user?.isCompletedProfile,
        };

        const reqData: any = { allData, token, id: user?._id };

        if (user && user._id) {
          const dbResponse = await updateUserInfo(reqData);
          if (dbResponse.success) {
            setImageChangeLoading(false);
            setIsUpdateProfile((prev) => !prev);

            return toast.success(dbResponse?.message);
          } else {
            setImageChangeLoading(false);
            return toast.error(dbResponse?.error);
          }
        } else {
          setImageChangeLoading(false);
          console.error("User ID is not available");
        }
        setImageChangeLoading(false);
      }
    });
  };

  const handleImageCancel = async () => {
    setCurrentImage("");
  };

  const handleImageChange = async () => {
    setImageChangeLoading(true);
    const token = getStoredToken();

    const allData = {
      name: user?.name,
      image: currentImage,
      role: user?.role,
      taxNumber: user?.taxNumber,
      telephoneOrPhone: user?.telephoneOrPhone,
      street: user?.street,
      houseOrBuildingNum: user?.houseOrBuildingNum,
      postcode: user?.postcode,
      city: user?.city,
      state: user?.state,
      isCompletedProfile: user?.isCompletedProfile,
    };

    const reqData: any = { allData, token, id: user?._id };

    if (user && user._id) {
      const dbResponse = await updateUserInfo(reqData);
      if (dbResponse.success) {
        setImageChangeLoading(false);
        setIsUpdateProfile((prev) => !prev);

        return toast.success(dbResponse?.message);
      } else {
        setImageChangeLoading(false);
        return toast.error(dbResponse?.error);
      }
    } else {
      setImageChangeLoading(false);
      console.error("User ID is not available");
    }
    setImageChangeLoading(false);
  };

  const handlePersonalInfoSave: SubmitHandler<IPersonalInfo> = async (data) => {
    setInfoIsLoading(true);
    const token = getStoredToken();

    const allData = {
      name: data.name,
      image: user?.image,
      role: data.role,
      taxNumber: data.taxNumber,
      telephoneOrPhone: data.telephoneOrPhone,
      street: data.street,
      houseOrBuildingNum: data.houseOrBuildingNum,
      postcode: data.postcode,
      city: data.city,
      state: data.state,
      isCompletedProfile: true,
    };

    const reqData: any = { allData, token, id: user?._id };

    if (user && user._id) {
      const dbResponse = await updateUserInfo(reqData);
      if (dbResponse.success) {
        setInfoIsLoading(false);
        setIsUpdateProfile((prev) => !prev);

        return toast.success(dbResponse?.message);
      } else {
        setInfoIsLoading(false);
        return toast.error(dbResponse?.error);
      }
    } else {
      setInfoIsLoading(false);
      console.error("User ID is not available");
    }
    setInfoIsLoading(false);
  };

  const isEmailVerified = user?.isEmailVerified;

  const handleVerifyMessage = async () => {
    const dbResponse = await sendVerificationEmail();
    if (dbResponse?.success) {
      toast.success(dbResponse?.message);
    } else {
      toast.error(t("VERIFICATION_EMAIL_NOT_SENT"));
    }
  };

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Image
            className="w-52 h-52 object-cover rounded-full"
            alt={t("USER_IMAGE")}
            width={208}
            height={208}
            src={currentImage || user?.image || userImg}
          />
          <div className="flex justify-start items-center flex-col gap-3">
            <ImageUploader lng={lng} setCurrentImage={setCurrentImage} />
            {currentImage && (
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleImageChange}
                  className="bg-green-500 hover:bg-transparent border border-transparent hover:border-red-500 text-white font-semibold px-2 py-2 rounded w-full flex justify-center"
                >
                  {isImageChangeLoading ? (
                    <ImSpinner9 className="animate-spin text-[26px]"></ImSpinner9>
                  ) : (
                    t("SAVE")
                  )}
                </button>
                <button
                  onClick={handleImageCancel}
                  className="bg-red-500 hover:bg-transparent border border-transparent hover:border-red-500 text-white font-semibold px-2 py-2 rounded w-full"
                >
                  {t("CANCEL")}
                </button>
              </div>
            )}
            <button
              onClick={handleDeleteImage}
              className="bg-red-500 hover:bg-transparent border border-transparent hover:border-red-500 text-white font-semibold px-2 py-2 rounded w-full"
            >
              {t("REMOVE_PICTURE")}
            </button>
          </div>
        </div>
        <div className="">
          <form
            onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSave)}
            className="mx-auto max-w-3xl space-y-3 my-6"
          >
            <h4 className="text-white-50 text-xl">
              {t("UPDATE_PERSONAL_INFO")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <label className="text-white-50" htmlFor="firstName">
                  {t("NAME")}
                </label>
                <input
                  {...personalInfoForm.register("name", { required: true })}
                  className="rounded w-full"
                  type="text"
                  defaultValue={user?.name}
                  name="name"
                  id="name"
                  placeholder={
                    errors.name ? t("PLEASE_ENTER_YOUR_NAME") : t("YOUR_NAME")
                  }
                />
              </div>
              <div className="flex flex-col gap-3 relative">
                <label className="text-white-50" htmlFor="email">
                  {t("EMAIL")}
                </label>
                <input
                  {...personalInfoForm.register("email", { required: true })}
                  className="rounded w-full"
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={user?.email}
                  readOnly
                  placeholder={
                    errors.email
                      ? t("PLEASE_ENTER_YOUR_EMAIL")
                      : t("YOUR_EMAIL")
                  }
                />
                {isEmailVerified ? (
                  <span className="text-sm absolute bottom-2 text-green-500 rounded py-0.5 px-2 right-2 font-semibold">
                    {t("VERIFIED_CHECKMARK")}
                  </span>
                ) : (
                  <span
                    onClick={handleVerifyMessage}
                    className="text-sm absolute bottom-2 bg-red-500 hover:bg-red-600 duration-150 font-semibold text-white rounded py-0.5 px-2 right-2 cursor-pointer"
                  >
                    {t("VERIFY")}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white-50" htmlFor="telephoneOrPhone">
                  {t("TELEPHONE_PHONE")}
                </label>
                <input
                  {...personalInfoForm.register("telephoneOrPhone", {
                    required: true,
                  })}
                  className="rounded w-full"
                  type="number"
                  name="telephoneOrPhone"
                  id="telephoneOrPhone"
                  defaultValue={user?.telephoneOrPhone}
                  placeholder={
                    errors.telephoneOrPhone
                      ? t("PLEASE_ENTER_YOUR_TELEPHONE_PHONE")
                      : t("YOUR_TELEPHONE_PHONE")
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white-50" htmlFor="street">
                  {t("STREET")}
                </label>
                <input
                  {...personalInfoForm.register("street", { required: true })}
                  className="rounded w-full"
                  type="text"
                  name="street"
                  id="street"
                  defaultValue={user?.street}
                  placeholder={
                    errors.street
                      ? t("PLEASE_ENTER_YOUR_STREET")
                      : t("YOUR_STREET")
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white-50" htmlFor="houseOrBuildingNum">
                  {t("HOUSE_BUILDING_NUMBER")}
                </label>
                <input
                  {...personalInfoForm.register("houseOrBuildingNum", {
                    required: true,
                  })}
                  className="rounded w-full"
                  type="text"
                  name="houseOrBuildingNum"
                  id="houseOrBuildingNum"
                  defaultValue={user?.houseOrBuildingNum}
                  placeholder={
                    errors.houseOrBuildingNum
                      ? t("PLEASE_ENTER_YOUR_HOUSE_BUILDING_NUMBER")
                      : t("YOUR_HOUSE_BUILDING_NUMBER")
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white-50" htmlFor="postcode">
                  {t("POSTCODE")}
                </label>
                <input
                  {...personalInfoForm.register("postcode", { required: true })}
                  className="rounded w-full"
                  type="text"
                  name="postcode"
                  id="postcode"
                  defaultValue={user?.postcode}
                  placeholder={
                    errors.postcode
                      ? t("PLEASE_ENTER_YOUR_POSTCODE")
                      : t("YOUR_POSTCODE")
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white-50" htmlFor="city">
                  {t("CITY")}
                </label>
                <input
                  {...personalInfoForm.register("city", { required: true })}
                  className="rounded w-full"
                  type="text"
                  name="city"
                  id="city"
                  defaultValue={user?.city}
                  placeholder={
                    errors.city ? t("PLEASE_ENTER_YOUR_CITY") : t("YOUR_CITY")
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white-50" htmlFor="state">
                  {t("STATE")}
                </label>
                <input
                  {...personalInfoForm.register("state", { required: true })}
                  className="rounded w-full"
                  type="text"
                  name="state"
                  id="state"
                  defaultValue={user?.state}
                  placeholder={
                    errors.state
                      ? t("PLEASE_ENTER_YOUR_STATE")
                      : t("YOUR_STATE")
                  }
                />
              </div>
              <div className="flex flex-col gap-3 relative">
                <label className="text-white-50" htmlFor="role">
                  {t("ROLE")}
                </label>
                <input
                  {...personalInfoForm.register("role", { required: true })}
                  className="rounded w-full"
                  type="text"
                  name="role"
                  id="role"
                  defaultValue={user?.role}
                  readOnly
                  placeholder={
                    errors.role ? t("PLEASE_ENTER_YOUR_ROLE") : t("YOUR_ROLE")
                  }
                />
              </div>
              {(isAgent || user?.role === "agent") && (
                <div className="flex flex-col gap-3">
                  <label className="text-white-50" htmlFor="taxNumber">
                    {t("TAX_ID")}
                  </label>
                  <input
                    {...personalInfoForm.register("taxNumber", {
                      required: true,
                    })}
                    className="rounded w-full"
                    type="text"
                    name="taxNumber"
                    id="taxNumber"
                    defaultValue={user?.taxNumber}
                    maxLength={11}
                    placeholder={
                      errors.taxNumber
                        ? t("PLEASE_ENTER_YOUR_TAX_NUMBER")
                        : t("YOUR_TAX_NUMBER")
                    }
                  />
                </div>
              )}
            </div>
            <button
              disabled={isInfoLoading}
              className="bg-green-500 hover:bg-transparent border border-transparent hover:border-green-500 text-white font-semibold px-2 py-2 rounded w-full flex items-center justify-center h-12"
            >
              {" "}
              {isInfoLoading ? (
                <ImSpinner9 className="animate-spin text-[26px]"></ImSpinner9>
              ) : (
                t("SAVE_CHANGES")
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
