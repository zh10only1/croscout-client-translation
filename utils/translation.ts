export const getCurrentLng = () : string => {
    const currentPathname =
      typeof window !== "undefined" ? window.location.pathname : "/";
    const segments = currentPathname.split("/");
    return segments[1] || "";
}