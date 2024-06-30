"use client"

import Image from "next/image";
import userImg from "@/public/noavatar.png";
import { useAuthContext } from "@/providers/AuthProvider";
import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getStoredToken } from "@/utils/tokenStorage";
import { IChangePassword, IUserInfo, changePassword, getUser, updateUserInfo } from "@/lib/database/authUser";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { setCookie } from "@/utils/authCookie";
import Swal from "sweetalert2";
import { sendVerificationEmail } from "@/lib/database/verifyEmail";

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

const ProfilePage = () => {
    const [currentImage, setCurrentImage] = useState('');
    const [isAgent, setIsAgent] = useState(false);

    const { user, setUser, setIsUpdateProfile } = useAuthContext();
    const [isShow, setIsShow] = useState(false);

    const [isInfoLoading, setInfoIsLoading] = useState(false);
    const [isPassLoading, setPassIsLoading] = useState(false);
    const [isImageChangeLoading, setImageChangeLoading] = useState(false);


    const personalInfoForm = createFormInstance<IPersonalInfo>();
    const passwordForm = createFormInstance<IPasswordInfo>();

    const { formState: { errors }, } = personalInfoForm;
    //* const { register, handleSubmit, formState: { errors }, } = personalInfoForm;

    //* handler for toggle password show option
    const handleShowPassword = () => {
        setIsShow(!isShow)
    }

    //* handler for swich role to agent toggle
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
    }

    //* handler for delete image
    const handleDeleteImage = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your image will Delete from everywhere!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            background: "#182237",
            color: "#F9ECE4",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Close",
            confirmButtonText: "Yes, delete it!"
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

                const reqData: any = { allData, token, id: user?._id }

                if (user && user._id) {
                    const dbResponse = await updateUserInfo(reqData)
                    if (dbResponse.success) {
                        setImageChangeLoading(false);
                        setIsUpdateProfile(prev => !prev);

                        return toast.success(dbResponse?.message)
                    } else {
                        setImageChangeLoading(false);
                        return toast.error(dbResponse?.error);
                    }
                } else {
                    setImageChangeLoading(false);
                    console.error('User ID is not available');
                }
                setImageChangeLoading(false);
            }
        });
    };

    //? handler for delete image
    const handleImageCancel = async () => {
        setCurrentImage("");
    };

    const handleImageChange = async () => {
        setImageChangeLoading(true);
        const token = getStoredToken();

        //? All personal info from the input fields
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

        const reqData: any = { allData, token, id: user?._id }

        if (user && user._id) {
            const dbResponse = await updateUserInfo(reqData)
            if (dbResponse.success) {
                setImageChangeLoading(false);
                setIsUpdateProfile(prev => !prev);

                return toast.success(dbResponse?.message)
            } else {
                setImageChangeLoading(false);
                return toast.error(dbResponse?.error);
            }
        } else {
            setImageChangeLoading(false);
            console.error('User ID is not available');
        }
        setImageChangeLoading(false);
    }

    const handlePersonalInfoSave: SubmitHandler<IPersonalInfo> = async (data) => {
        setInfoIsLoading(true);
        const token = getStoredToken();

        //? All personal info from the input fields
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

        const reqData: any = { allData, token, id: user?._id }

        if (user && user._id) {
            const dbResponse = await updateUserInfo(reqData)
            if (dbResponse.success) {
                setInfoIsLoading(false);
                setIsUpdateProfile(prev => !prev);

                return toast.success(dbResponse?.message)
            } else {
                setInfoIsLoading(false);
                return toast.error(dbResponse?.error);
            }
        } else {
            setInfoIsLoading(false);
            console.error('User ID is not available');
        }
        setInfoIsLoading(false);
    };


    //* Handle updates the old password to the new password
    // const handleChangePassword: SubmitHandler<IPasswordInfo> = async (data) => {
    //     setPassIsLoading(true);
    //     const newPassword = data.newPassword;
    //     const oldPassword = data.oldPassword;
    //     const updateData = { newPassword, oldPassword };
    //     const token = getStoredToken();
    //     if (user && user._id) {
    //         const reqData: IChangePassword = { updateData, token, id: user._id };
    //         const dbResponse = await changePassword(reqData);
    //         if (dbResponse.success) {
    //             setPassIsLoading(false);
    //             const fetchUser = async () => {
    //                 if (token) {
    //                     const { user } = await getUser({ token });
    //                     setUser(user);
    //                     setCookie("authToken", token.split(" ")[1], 24)
    //                 }
    //                 else {
    //                     setUser(null)
    //                 }
    //             };
    //             fetchUser();
    //             return toast.success(dbResponse?.message)
    //         } else {
    //             setPassIsLoading(false);
    //             return toast.error(dbResponse?.error);
    //         }
    //     } else {
    //         setPassIsLoading(false);
    //         // Handle the case where user._id is undefined
    //         console.error('User ID is not available');
    //     }
    //     setPassIsLoading(false);
    // };
    const isEmailVerified = user?.isEmailVerified;

    const handleVerifyMessage = async () => {
        const dbResponse = await sendVerificationEmail();
        if (dbResponse?.success) {
            toast.success(dbResponse?.message);

        }
        else {
            toast.error("Verification email not send");
        }
    }

    return (
        <div className='min-h-screen'>
            <div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                    <Image className="w-52 h-52 object-cover rounded-full" alt="user image" width={208} height={208} src={currentImage || user?.image || userImg} />
                    <div className="flex justify-start items-center flex-col gap-3">
                        <ImageUploader setCurrentImage={setCurrentImage} />
                        {
                            currentImage &&
                            <div className="flex gap-3 w-full">
                                <button onClick={handleImageChange} className="bg-green-500 hover:bg-transparent border border-transparent hover:border-red-500 text-white font-semibold px-2 py-2 rounded w-full flex justify-center">
                                    {
                                        isImageChangeLoading ?
                                            <ImSpinner9 className="animate-spin text-[26px]"></ImSpinner9>
                                            :
                                            "Save"
                                    }
                                </button>
                                <button onClick={handleImageCancel} className="bg-red-500 hover:bg-transparent border border-transparent hover:border-red-500 text-white font-semibold px-2 py-2 rounded w-full">Cancel</button>
                            </div>
                        }
                        <button onClick={handleDeleteImage} className="bg-red-500 hover:bg-transparent border border-transparent hover:border-red-500 text-white font-semibold px-2 py-2 rounded w-full">Remove Picture</button>
                    </div>
                </div>
                <div className="">

                    {/*//* ============= User profile form ===========**/}
                    <form onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSave)} className="mx-auto max-w-3xl space-y-3 my-6">
                        <h4 className="text-white-50 text-xl">Update Personal Info:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <label className="text-white-50" htmlFor="firstName">Name</label>
                                <input {...personalInfoForm.register("name", { required: true })} className="rounded w-full" type="text" defaultValue={user?.name} name="name" id="name" placeholder={errors.name ? "Please Enter Your Name" : "Your Name"} />
                            </div>
                            <div className="flex flex-col gap-3 relative">
                                <label className="text-white-50" htmlFor="email">Email</label>
                                <input {...personalInfoForm.register("email", { required: true })} className="rounded w-full" type="email" name="email" id="email" defaultValue={user?.email} readOnly placeholder={errors.email ? "Please Enter Your Email" : "Your Email"} />
                                {
                                    isEmailVerified ?
                                        <span className="text-sm absolute bottom-2 text-green-500 rounded py-0.5 px-2 right-2 font-semibold">
                                            Verified  ✓
                                        </span>
                                        :
                                        <span onClick={handleVerifyMessage} className="text-sm absolute bottom-2 bg-red-500 hover:bg-red-600 duration-150 font-semibold text-white rounded py-0.5 px-2 right-2 cursor-pointer">
                                            Verify
                                        </span>
                                }
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white-50" htmlFor="telephoneOrPhone">Telephone/Phone</label>
                                <input {...personalInfoForm.register("telephoneOrPhone", { required: true })} className="rounded w-full" type="number" name="telephoneOrPhone" id="telephoneOrPhone" defaultValue={user?.telephoneOrPhone} placeholder={errors.telephoneOrPhone ? "Please Enter Your Telephone or Phone Number" : "Your Telephone or Phone Number"} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white-50" htmlFor="street">Street</label>
                                <input {...personalInfoForm.register("street", { required: true })} className="rounded w-full" type="text" name="street" id="street" defaultValue={user?.street} placeholder={errors.street ? "Please Enter Your Street" : "Your Street"} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white-50" htmlFor="houseOrBuildingNum">House/Building Number</label>
                                <input {...personalInfoForm.register("houseOrBuildingNum", { required: true })} className="rounded w-full" type="text" name="houseOrBuildingNum" id="houseOrBuildingNum" defaultValue={user?.houseOrBuildingNum} placeholder={errors.houseOrBuildingNum ? "Please Enter Your House or Building Number" : "Your House or Building Number"} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white-50" htmlFor="postcode">Postcode</label>
                                <input {...personalInfoForm.register("postcode", { required: true })} className="rounded w-full" type="text" name="postcode" id="postcode" defaultValue={user?.postcode} placeholder={errors.postcode ? "Please Enter Your Postcode" : "Your Postcode"} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white-50" htmlFor="city">City</label>
                                <input {...personalInfoForm.register("city", { required: true })} className="rounded w-full" type="text" name="city" id="city" defaultValue={user?.city} placeholder={errors.city ? "Please Enter Your City" : "Your City"} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="text-white-50" htmlFor="state">State</label>
                                <input {...personalInfoForm.register("state", { required: true })} className="rounded w-full" type="text" name="state" id="state" defaultValue={user?.state} placeholder={errors.state ? "Please Enter Your State" : "Your State"} />
                            </div>
                            <div className="flex flex-col gap-3 relative">
                                <label className="text-white-50" htmlFor="role" defaultValue={user?.role}>Role</label>
                                <input {...personalInfoForm.register("role", { required: true })} className="rounded w-full" type="text" name="role" id="role" defaultValue={user?.role} readOnly placeholder={errors.role ? "Please Enter Your Role" : "Your Role"} />
                                {/* {
                                    user?.role === "user" &&
                                    <span onClick={switchAgentToggle} className="text-sm absolute bottom-2 border py-0.5 px-0.5 rounded right-2 cursor-pointer">
                                        {
                                            isAgent ? "Cancel" : "Switch To Agent"
                                        }
                                    </span>
                                } */}
                            </div>
                            {
                                (isAgent || user?.role === "agent") &&
                                <div {...personalInfoForm.register("taxNumber", { required: true })} className="flex flex-col gap-3" defaultValue={user?.taxNumber}>
                                    <label className="text-white-50" htmlFor="taxNumber">Tax ID</label>
                                    <input className="rounded w-full" type="text" name="taxNumber" id="taxNumber" defaultValue={user?.taxNumber} maxLength={11} placeholder={errors.taxNumber ? "Please Enter Your Tax Number" : "Your Tax Number"} />
                                </div>
                            }
                        </div>
                        <button disabled={isInfoLoading} className="bg-green-500 hover:bg-transparent border border-transparent hover:border-green-500 text-white font-semibold px-2 py-2 rounded w-full flex items-center justify-center h-12"> {
                            isInfoLoading ?
                                <ImSpinner9 className="animate-spin text-[26px]"></ImSpinner9>
                                :
                                "Save Changes"
                        }</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;