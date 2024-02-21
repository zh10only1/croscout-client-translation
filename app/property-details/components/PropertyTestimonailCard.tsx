import Image from "next/image";
import React from "react";
import QuoteSign from "@/public/icons/quote-sign.svg";
import { format } from "date-fns";
import userImg from "@/public/noavatar.png";


type IProps = {};

export default function PropertyTestimonialCard({ testimonial }: any) {
    return (
        <div className=" pt-10 px-8 md:px-16 mb-10">
            <div className={`grid grid-cols-2`}>
                <div className="col-span-2 lg:col-span-1 relative border-[3px] border-accent rounded-[10px] px-4 lg:px-[3.75rem] py-6 pt-[4rem]">
                    <div
                        className="h-20 w-20 absolute -top-10 rounded-full bg-center bg-cover bg-no-repeat border-[3px] border-accent"
                        style={{ backgroundImage: `url(${testimonial?.user?.image || "/noavatar.png"})` }}
                    ></div>
                    <div className="text-2xl font-bold text-[#D8D8D8]">{testimonial?.user?.name}</div>
                    
                    <div className="mt-3 text-accent font-bold">{format(new Date(testimonial?.createdAt), "MMM dd, yyyy")}
                    </div>
                    <p className="mt-6 text-xl text-[#D8D8D8] leading-[150%]">
                        {
                            testimonial.comment
                        }
                    </p>
                </div>
                <div className="lg:flex justify-center py-[4.375rem] hidden">
                    <Image src={QuoteSign} width={240} height={190} alt="Quote" />
                </div>
            </div>
            {/* <div className={`lg:grid grid-cols-2 gap-[1.875rem] mt-10 hidden`}>
                <div className="flex justify-center py-[4.375rem]">
                    <Image src={QuoteSign} width={240} height={190} alt="Quote" />
                </div>
                <div className="relative border-[3px] border-accent rounded-[10px] px-[3.75rem] py-6 pt-[4rem]">
                    <div
                        className="h-20 w-20 absolute -top-10 rounded-full bg-center bg-cover bg-no-repeat border-[3px] border-accent"
                        style={{ backgroundImage: "url(/images/man.png)" }}
                    ></div>
                    <div className="text-2xl font-bold text-[#D8D8D8]">ADAM</div>
                    <div className="mt-3 text-accent font-bold">July 2023</div>
                    <p className="mt-6 text-[#D8D8D8] text-xl leading-[150%]">
                        This was a great room in a great location. (It says private
                        residence, but everything was hotel-quality, including breakfast.)
                        It is a real cave room, just like you see when you tour...
                    </p>
                </div>
            </div> */}
        </div>
    );
}
