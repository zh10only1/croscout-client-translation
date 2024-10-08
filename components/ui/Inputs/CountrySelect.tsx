"use client"
import Select from 'react-select'

import { useCountries } from "@/hooks/useCountries";
import { useTranslation } from '@/app/i18n/client';


export type CountrySelectValue = {
    label: string,
    latlng: number[],
    region: string,
    value: string
    // flag: string,
} | undefined;

interface CountrySelectProps {
    value?: CountrySelectValue;
    isAddProperty: boolean;
    onChange: (value: CountrySelectValue | undefined) => void;
    lng: string;
}


const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, isAddProperty, lng }) => {
    const { getAll } = useCountries();
    const { t } = useTranslation(lng, 'home');


    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                // onMenuClose={handleMenuClose}

                onChange={(value) => {
                    // console.log("Selected value:", value);
                    onChange(value as CountrySelectValue);
                }}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row  items-center gap-3'>
                        {/* <div>{option.flag}</div> */}
                        <div>
                            {t(option.label)},
                            <span className={'text-neutral-500 ml-1'}>
                                {t(option.region)}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => `${isAddProperty ? 'p-[2px]' : 'p-3'} border-2 hover:cursor-pointer`,
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: '#666',
                        primary25: '#ffe4e6',
                    }
                })}
            />
        </div>
    );
};

export default CountrySelect;