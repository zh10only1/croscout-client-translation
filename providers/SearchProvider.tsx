"use client"
import React, { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";
import { CountrySelectValue } from "@/components/ui/Inputs/CountrySelect";
// import { Property } from "@/constant";

// DateRange Interface
export interface DateRange {
    startDate: Date;
    endDate: Date;
    key: string;
}

// FilteredProperty Type
// type FilteredProperty = Property[] | [];

// SearchContextProps Interface
export interface SearchContextProps {
    searchCalDate: DateRange[];
    setSearchCalDate: Dispatch<SetStateAction<DateRange[]>>;
    location: string;
    setLocation: Dispatch<SetStateAction<string>>;
    adultsCount: number;
    setAdultsCount: Dispatch<SetStateAction<number>>;
    locationObject: CountrySelectValue;
    setLocationObject: Dispatch<SetStateAction<CountrySelectValue>>;
    childrenCount: number;
    setChildrenCount: Dispatch<SetStateAction<number>>;
    isSearchBtnClicked: boolean;
    setIsSearchBtnClicked: Dispatch<SetStateAction<boolean>>;
    // filteredProperty: FilteredProperty;
    // setFilteredProperty: Dispatch<SetStateAction<FilteredProperty>>;
    searchDisable: boolean;
    setSearchDisable: Dispatch<SetStateAction<boolean>>;
    isFilterSection: boolean;
    setIsFilterSection: Dispatch<SetStateAction<boolean>>;
    // categoryInputValue: string;
    activeCat: string;
    setActiveCat: Dispatch<SetStateAction<string>>;
    currentFilter: string;
    setCurrentFilter: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps | null>(null);

interface SearchProviderProps {
    children: ReactNode;
}

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    // States
    const [searchCalDate, setSearchCalDate] = useState<DateRange[]>([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    const [locationObject, setLocationObject] = useState<CountrySelectValue>({
        label: '',
        latlng: [0, 0],
        region: '',
        value: ''
        // flag: '',
    });
    const [location, setLocation] = useState<string>("");
    // const [categoryInputValue, setCategoryInputValue] = useState<string>("");
    const [adultsCount, setAdultsCount] = useState<number>(0);
    const [childrenCount, setChildrenCount] = useState<number>(0);
    const [isSearchBtnClicked, setIsSearchBtnClicked] = useState<boolean>(false);
    const [isFilterSection, setIsFilterSection] = useState<boolean>(false);
    const [searchDisable, setSearchDisable] = useState<boolean>(true);
    const [currentFilter, setCurrentFilter] = useState("");
    const [activeCat, setActiveCat] = useState("")

    // const [filteredProperty, setFilteredProperty] = useState<FilteredProperty>([]);

    const contextValue: SearchContextProps = {
        searchCalDate,
        setSearchCalDate,
        location,
        setLocation,
        adultsCount,
        setAdultsCount,
        childrenCount,
        setChildrenCount,
        // filteredProperty,
        // setFilteredProperty,
        isSearchBtnClicked,
        setIsSearchBtnClicked,
        searchDisable,
        setSearchDisable,
        // categoryInputValue,
        locationObject,
        setLocationObject,
        activeCat,
        setActiveCat,
        isFilterSection,
        setIsFilterSection,
        currentFilter,
        setCurrentFilter
    };

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
};

// Custom hook to consume the context
const useSearchContext = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("useSearchContext must be used within a SearchProvider");
    }

    return context;
};

export { SearchProvider, useSearchContext };
