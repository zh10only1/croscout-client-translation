"use client"
import { useToggleContext } from "@/providers/ToggleProvider";
import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import navbarStyles from "./navbar.module.css"
import { useModalContext } from "@/providers/ModalProvider";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import { useAuthContext } from "@/providers/AuthProvider";
import { logoutUser } from "@/lib/database/authUser";
import toast from "react-hot-toast";
import { clearToken } from "@/utils/tokenStorage";
import { usePathname, useRouter } from "next/navigation";
import { HiMenuAlt1 } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";
import { setCookie } from "cookies-next";
import { removeCookie } from "@/utils/authCookie";
import { sendVerificationEmail, verifyEmail } from "@/lib/database/verifyEmail";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useTranslation } from "@/app/i18n/client"; 

const Navbar = ({lng} : {lng: string;}) => {
    const { t } = useTranslation(lng, 'navbar');
    const { navUserToggle, setNavUserToggle } = useToggleContext();
    const { setLoginModal, setSignupModal, sidebarToggle,
        setSidebarToggle } = useModalContext();
    const { user, setUser } = useAuthContext();

    // navbar will be hidden if them pathname matches the include pathname
    const pathname = usePathname();
    const isResetPassword = /\/reset-password\/[^/]+$/.test(pathname);
    const isDashboard = pathname.includes('/dashboard');
    const isVerifyEmail = pathname.includes('/verify-email');
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // const dbResponse = await logoutUser();
            // if(dbResponse.isLogout){
            setUser(null);
            clearToken();
            removeCookie("authToken")
            // }
            router.push('/')
            toast.success("Successfully Logout")
        } catch (error) {
            console.log(error);
        }
    }

    {/*//*-----====== Handle open menubar to close sidebar=====------*/ }
    const handleMenuToggle = () => {
        setNavUserToggle(pre => !pre);
        setSidebarToggle(false); // Close the sidebar menu
    };

    {/*//*--=== Handle open sidebar to close menubar===-----*/ }
    const handleSidebarToggle = () => {
        setSidebarToggle(pre => !pre);
        setNavUserToggle(false); // Close the menuList 
    };

    const profileRoute = user?.role === "user" ? "/dashboard/user/profile" : user?.role === "agent" ? "/dashboard/agent/profile" : user?.role === "admin" ? "/dashboard/admin/profile" : "";

    const isVerifed = user?.isEmailVerified;
    return (
        <>
            {
                user && !isVerifed &&
                <div hidden={isResetPassword || isVerifyEmail} className="bg-red-500 text-white">
                    <p className="text-center py-3 text-white"><Link href={profileRoute} className="underline">You email is not verified! Please verify your email.<IoArrowForward className="inline" /></Link></p>
                </div>
            }
            <nav hidden={isResetPassword || isVerifyEmail} id="topbar" className={`py-5   z-40 sticky top-0 ${isDashboard ? "bg-[#182237]" : "bg-primary"}`}>
                {/* Wrapper */}
                <div className={` flex-between items-center relative ${isDashboard ? "w-full px-6" : "wrapper"}`}>
                    <div className="text-white lg:hidden">
                        {isDashboard && <div
                            onClick={handleSidebarToggle}
                            className="text-2xl cursor-pointer block lg:hidden">
                            {sidebarToggle ? <IoIosCloseCircle /> : <CgMenuGridR color="white" />}
                        </div>}
                    </div>
                    {/* Logo */}
                    <NavLogo />

                    {/* NavMenu - Visible for Version */}
                    <NavMenu lng={lng} />

                    {/* Menu Button - Visible for Mobile Version */}
                    <button
                        onClick={handleMenuToggle}
                        className="block md:hidden text-white select-none text-2xl">
                        {navUserToggle ? <IoIosCloseCircle /> : <AiOutlineMenu color="white" />}
                    </button>



                    {/* User Menu Dropdown */}
                    <ul className={`${navbarStyles.navUserMenu} ${navUserToggle ? "scale-y-100" : "scale-y-0"}`}>
                        {
                            user ?
                                <>
                                    <button className={navbarStyles.dashboardBtn}>{user?.name}</button>

                                    <Link onClick={() =>
                                        setNavUserToggle(false)}
                                        className={navbarStyles.dashboardBtn}
                                        href={user.role === "user" ? "/dashboard/user/my-bookings" : "/dashboard"}>Dashboard</Link>
                                    <button

                                        onClick={handleLogout}
                                    >Logout</button>
                                </>
                                :
                                <>
                                    <button
                                        onClick={() => {
                                            setLoginModal(true);
                                            setNavUserToggle(false);

                                        }}
                                    >{t('LOGIN')}</button>
                                    <button
                                        onClick={() => {
                                            setSignupModal(true);
                                            setNavUserToggle(false);

                                        }}
                                    >{t('SIGNUP')}</button>
                                </>
                        }
                    </ul>
                </div>
            </nav >
        </>
    );
};

export default Navbar;