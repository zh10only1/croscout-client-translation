"use client"
import Slider from "react-slick";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import CategoryCard from "./CategoryCard";
import { useState } from "react";
import { categoryList } from "@/constant";
import { useSearchContext } from "@/providers/SearchProvider";
// import { searchProperties } from "@/utils/filterProperties";
import { setSearchQuery } from "@/utils/searchQuery";

export default function CategoryList() {
    const [activeCategory, setActiveCategory] = useState("");
    const { location, activeCat, setActiveCat } = useSearchContext();

    const CustomPrevArrow = (props: any) => (
        <div
            className="custom-next-arrow bg-gray-300 cursor-pointer -left-[28px] lg:-left-[40px] h-[24px] w-[24px] rounded-full flex justify-center items-center"
            onClick={props.onClick}
            style={{ position: "absolute", top: "31%", zIndex: 1 }}
        >
            <BiLeftArrow />
        </div>
    );

    const CustomNextArrow = (props: any) => (
        <div
            className="custom-next-arrow bg-gray-300 cursor-pointer -right-[28px] lg:-right-[40px] h-[24px] w-[24px] rounded-full flex justify-center items-center"
            onClick={props.onClick}
            style={{ position: 'absolute', top: '31%', zIndex: 1 }}
        >
            <BiRightArrow />
        </div>
    );

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleCategoryChange = (catName: string) => {
        setSearchQuery("category", catName)
        setActiveCategory(catName);
    };

    // console.log(activeCategory);
    return (
        <div id="categoryTypeList" className="py-10  w-full px-6 placeholder-cyan-100">
            <Slider {...settings}>
                {categoryList.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            handleCategoryChange(item.name)
                            // setCatergoryInputValue(item.name)
                            // const categoryClick = setFilteredProperty(searchProperties({
                            //     location,
                            //     propertyType: item.name
                            // }))


                        }}
                        className="px-2"
                    >
                        <CategoryCard key={index} category={item} activeCat={activeCategory} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}