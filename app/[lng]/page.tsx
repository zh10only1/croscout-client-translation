import CategoryList from "@/components/Home/CategoryList";
import FilterButton from "@/components/Home/FilterButton";
import Hero from "@/components/Home/Hero";
import MultiCategory from "@/components/Home/MultiCategory";
import PropertyList from "@/components/Home/Property/PropertyList";
import { useAuthContext } from "@/providers/AuthProvider";
import Main from "./Main";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Croscout | Home',
  description: 'Discover unique and affordable accommodations worldwide with Croscout. Your perfect stay is just a click away.',
}


export default function Home({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {

  return (
    <>
      <Hero lng={lng} />
      <div className="wrapper">
        <FilterButton lng={lng} />
        <CategoryList lng={lng} />
        <PropertyList lng={lng} />
      </div>
    </>
  );
}
