'use client';

import { useToggleContext } from "@/providers/ToggleProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLogo = ({ lng }: { lng: string }) => {
    const { setNavUserToggle } = useToggleContext();
    const pathname = usePathname();
    const isDashboard = pathname.includes('/dashboard');

    return (
        <Link
            href={`/${lng}`}
            onClick={() => setNavUserToggle(false)}
            className="h-[24px] md:h-[48px] md:w-[336px] w-[200px] relative"
        >
            {!isDashboard ? (
                <Image
                    className="cursor-pointer"
                    src="/images/navLogo.svg"
                    alt="Logo"
                    height={24}
                    width={336}
                />
            ) : (
                <Image
                    className="cursor-pointer"
                    src="/images/navlogo_transparent.png"
                    alt="Logo"
                    height={24}
                    width={336}
                />
            )}
        </Link>
    );
};

export default NavLogo;