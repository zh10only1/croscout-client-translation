import { useLocalizationContext } from "@/providers/LocalizationContext";
import { supportedLngs } from "@/constant";

export const getCurrentLng = () : string => {
    const currentPathname =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const segments = currentPathname.split("/");
    return segments[1] || "";
}

export const getCurrentLngServerComponent = () : any => {
    const { selectedLanguage } = useLocalizationContext();
    const lng : any = supportedLngs[`${selectedLanguage}`];
    return lng;
  }

