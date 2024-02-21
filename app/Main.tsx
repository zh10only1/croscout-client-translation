"use client"

import { useToggleContext } from "@/providers/ToggleProvider";

const Main = ({ children }: { children: React.ReactNode }) => {
    const { setNavUserToggle } = useToggleContext();
    return (
        <div onClick={() => setNavUserToggle(false)}>
            {children}
        </div>
    );
};

export default Main;