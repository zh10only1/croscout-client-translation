"use client"

import { resetPassword } from "@/lib/database/authUser";
import { useModalContext } from "@/providers/ModalProvider";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { IoArrowBack } from "react-icons/io5";

export default function ResetPassword() {
    const [isShow, setIsShow] = useState(false);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { setLoginModal } = useModalContext()
    const [isLoading, setIsLoading] = useState(false);

    const { token } = useParams();
    const navigate = useRouter();

    // handler for toggle password show option
    const handleShowPassword = () => {
        setIsShow(!isShow)
    }

    // handler for submit reset button 
    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const newPassword = passwordRef.current?.value;
            const dbResponse = await resetPassword({ token: token as string, newPassword });
            console.log(dbResponse)
            if (dbResponse.success) {
                toast.success('Password reset successful. Now you can login with your new updated password', { duration: 5000 });
                setIsLoading(false);
                navigate.push('/');
                setLoginModal(true);
            }
            else {
                toast.error(dbResponse?.error)
                setIsLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen max-w-7xl mx-auto my-10">
            <Link href="/">
                <button type="button" className="text-lg my-2 flex mx-4 items-center justify-center rounded-xl relative  py-2 h-[52px] border border-accent text-white duration-200 overflow-hidden z-50 font-semibold px-3 pr-4">
                    <IoArrowBack className="mx-1"></IoArrowBack>Back to Home</button>
            </Link>
            <form onSubmit={handleResetPassword} className="flex min-h-[80vh] items-center justify-center">
                <div className="text-sm max-w-lg mx-auto w-full shadow-2xl rounded px-4 py-6">
                    <h1 className="text-3xl font-bold text-center text-white my-3">Enter a new password</h1>
                    <div className="relative my-3">
                        <input ref={passwordRef} type={isShow ? "text" : "password"} name="password" id="password" placeholder="Enter Password" className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none" />
                        <button type="button" onClick={handleShowPassword} className="text-2xl absolute top-3 right-2">
                            {
                                isShow ?
                                    <FaEyeSlash></FaEyeSlash>
                                    :
                                    <FaEye></FaEye>
                            }
                        </button>
                    </div>
                    <button type="submit" className="text-lg my-3 flex items-center justify-center rounded-xl relative  py-2 h-[52px] w-full bg-rose-500 hover:bg-rose-400 text-white duration-200 overflow-hidden active:bg-rose-400 z-50 font-semibold">
                        {
                            isLoading ?
                                <ImSpinner9 className="animate-spin text-[26px]"></ImSpinner9>
                                :
                                "Reset Password"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}