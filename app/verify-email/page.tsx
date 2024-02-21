"use client"
import Loading from "@/components/ui/Loading/Loading";
import { getUser } from "@/lib/database/authUser";
import { verifyEmail } from "@/lib/database/verifyEmail";
import { useAuthContext } from "@/providers/AuthProvider";
import { getStoredToken } from "@/utils/tokenStorage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

const page = () => {
    const { setUser } = useAuthContext();
    const [verifyMessage, setVerifyMessage] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    useEffect(() => {
        const verifyEmailReq = async () => {
            if (token) {
                const dbResponse = await verifyEmail({ token })
                if (dbResponse?.success) {
                    setVerifyMessage(dbResponse?.message)
                    const userToken = getStoredToken();
                    if (!userToken) throw new Error("token is missing");
                    const { user } = await getUser({ token: userToken });
                    setUser(user);
                }
                else {
                    setVerifyMessage(dbResponse?.error)
                }
            }
        }
        return () => {
            verifyEmailReq()
        }
    }, [])
    return (
        <div className="min-h-screen max-w-7xl mx-auto my-10">
            <Link href="/">
                <button type="button" className="text-lg my-2 flex mx-4 items-center justify-center rounded-xl relative  py-2 h-[52px] border border-accent text-white duration-200 overflow-hidden z-50 font-semibold px-3 pr-4">
                    <IoArrowBack className="mx-1"></IoArrowBack>Back to Home</button>
            </Link>
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-4xl text-secondary-50 text-center">
                    <p>{verifyMessage && verifyMessage}</p>
                    {!verifyMessage &&
                        <Loading></Loading>
                    }
                </div>
            </div>
        </div>
    );
};

export default page;