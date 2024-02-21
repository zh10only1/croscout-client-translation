import { defaultStatesForMap } from "@/constant";
import countries from "world-countries";

const formattedCountries = defaultStatesForMap.map((state) => ({
    value: state.value,
    label: state.value,
    latlng: state.latlng,
    region: state.region,
    // flag: state.flag,
}))

export const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value)
    }

    return {
        getAll,
        getByValue
    }
}