"use client"

import React from "react";
import FooterLogo from "@/public/images/footer-logo.svg";
import Image from "next/image";
import { BiGlobe } from "react-icons/bi";
import Link from "next/link";
import footerStyles from "./footer.module.css"
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import MultiCategory from "@/components/Home/MultiCategory";
import { usePathname } from "next/navigation";

const Footer = () => {
    // footer will be hidden if them pathname matches the include pathname
    const pathname = usePathname();
    const isFooterHidden = /\/reset-password\/[^/]+$/.test(pathname) || /\/dashboard\/[^/]+$/.test(pathname);
    const isDashboard = pathname.includes('/dashboard')

    const currentYear = new Date().getFullYear();
    return (
        <div hidden={isFooterHidden || isDashboard}>
            <MultiCategory />
            <footer className={`bg-primary pt-20 ${footerStyles.footer}`}>
                <div className="wrapper">
                    <div className="flex flex-col md:flex-row justify-between text-white pb-[60px]">
                        <div className="flex justify-center md:flex-start">
                            <div className="flex flex-col items-center">
                                <Image src={FooterLogo} alt="logo" />
                                <div className="flex md:gap-3 mt-6">
                                    <div
                                        className="flex items-center gap-1.5 text-neutral-100  transition  cursor-pointer"
                                    >
                                        <BiGlobe />
                                        <div>English (US)</div>
                                    </div>
                                    <div
                                        className=" hidden md:block text-neutral-100  transition  cursor-pointer"
                                    >
                                        $USD
                                    </div>
                                </div>
                                {/* Socials */}
                                <div className={`flex items-center gap-2.5 mt-10 ${footerStyles.socialIcons}`}>
                                    <Link href="#"><FaFacebook /></Link>
                                    <Link href="#"><AiFillTwitterCircle /></Link>
                                    <Link href="#"><FaInstagram /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20 md:mt-0">
                            <div className="grid grid-cols-3 gap-10 md:gap-[120px]">
                                <div className="col-span-3 md:col-span-1">
                                    <h2 className="text-xl font-semibold">Support</h2>
                                    <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                                        <Link href={"#"}>Help Center</Link>
                                        <Link href={"#"}>AirCover</Link>
                                        <Link href={"#"}>Anti-discrimination</Link>
                                        <Link href={"#"}>Disability support</Link>
                                        <Link href={"#"}>Cancellation options</Link>
                                        <Link href={"#"}>Report neighborhood concern</Link>
                                    </div>
                                </div>
                                <div className="col-span-3 md:col-span-1">
                                    <h2 className="text-xl font-semibold">Hosting</h2>
                                    <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                                        <Link href={"#"}>Croscout your home</Link>
                                        <Link href={"#"}>Croscout for Hosts</Link>
                                        <Link href={"#"}>Hosting resources</Link>
                                        <Link href={"#"}>Community forum</Link>
                                        <Link href={"#"}>Hosting responsibly</Link>
                                        <Link href={"#"}>Croscout-friendly apartments</Link>
                                    </div>
                                </div>
                                <div className="col-span-3 md:col-span-1">
                                    <h2 className="text-xl font-semibold">Croscout</h2>
                                    <div className="mt-6 flex flex-col leading-[200%] text-[#CBC9C9]">
                                        <Link href={"#"}>Newsroom</Link>
                                        <Link href={"#"}>New features</Link>
                                        <Link href={"#"}>Careers</Link>
                                        <Link href={"#"}>Investors</Link>
                                        <Link href={"#"}>Gift cards</Link>
                                        <Link href={"#"}>Croscout.eu emergency stays</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-[#666060]"></div>
                <div className="wrapper">
                    <div className="flex flex-col md:flex-row justify-between text-white py-5">
                        <div className="text-lg font-medium">© {currentYear} Croscout, Inc.</div>
                        <div className="flex gap-4 md:gap-[32px] text-sm md:text-lg text-[#CBC9C9] font-medium">
                            <Link href="#">Terms</Link>
                            <Link href="#">Sitemap</Link>
                            <Link href="#">Privacy</Link>
                            <Link href="#">Your Privacy Choices</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    );
}

export default Footer;