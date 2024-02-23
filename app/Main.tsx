"use client"

import { useToggleContext } from "@/providers/ToggleProvider";

const Main = ({ children }: { children: React.ReactNode }) => {
    const { setNavUserToggle, setFilterToggle, filterToggle } = useToggleContext();
    return (
        <div onClick={() => {
            setNavUserToggle(false);
            if (filterToggle) {
                setFilterToggle(false);
            }
        }}>
            {children}
        </div>
    );
};

export default Main;