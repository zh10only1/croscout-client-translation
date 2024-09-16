import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import { ModalProvider } from "@/providers/ModalProvider";
import { ToggleProvider, useToggleContext } from "@/providers/ToggleProvider";
import LoginModal from "@/components/ui/Modal/LoginModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SignupModal from "@/components/ui/Modal/SignupModal";
import CalenderModal from "@/components/ui/Modal/CalenderModal";
import GuestModal from "@/components/ui/Modal/GuestModal";
import { SearchProvider } from "@/providers/SearchProvider";
import LocationModal from "@/components/ui/Modal/LocationModal";
import LanguageModal from "@/components/ui/Modal/LanguageModal";
import { LocalizationProvider } from "@/providers/LocalizationContext";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/AuthProvider";
import Main from "./Main";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// const { navUserToggle, setNavUserToggle } = useToggleContext();

// const handleToogleUserMenu = () => {
//   setNavUserToggle(false);
// }

export const metadata: Metadata = {
  title: "Croscout",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lng: string;
  };
}>) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${onest.className} bg-primary`}>
        <LocalizationProvider>
          <AuthProvider>
            <SearchProvider>
              <ModalProvider>
                <ToggleProvider>
                  <Toaster position="top-center" reverseOrder={false} />
                  {/* Modals */}
                  <LoginModal lng={lng} />
                  <SignupModal lng={lng} />
                  <LocationModal lng={lng} />
                  <CalenderModal lng={lng} />
                  <GuestModal lng={lng} />
                  <LanguageModal lng={lng} />

                  <div className="flex min-h-screen flex-col ">
                    <Navbar lng={lng} />
                    <main className="flex-1">
                      <Main>{children}</Main>
                    </main>
                    <Footer lng={lng} />
                  </div>
                </ToggleProvider>
              </ModalProvider>
            </SearchProvider>
          </AuthProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
