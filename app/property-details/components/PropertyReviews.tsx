import React from 'react'
import { BiChevronRight } from 'react-icons/bi';

export default function PropertyReviews() {
    return (
        <div className="">
            <div className='wrapper'>
                <div className="py-[6.875rem] text-white">
                    <h1 className="text-[2.625rem] font-bold text-white">Things to know</h1>
                    <div className="mt-[3.75rem] grid grid-cols-3 gap-6">
                        {/* Item 1 */}
                        <div className="col-span-3 lg:col-span-1">
                            <div className="text-xl leading-[220%] font-medium">
                                House rules
                            </div>
                            <div className="text-xl leading-[220%] font-medium">
                                2 guests maximum
                            </div>
                            <div className="text-xl leading-[220%] font-medium">
                                Pets allowed
                            </div>
                            <div className="text-xl leading-[220%] font-medium">
                                Self check-in with lockbox
                            </div>
                            <div className="flex gap-3 items-center text-accent">
                                <div className="text-xl text-accent font-medium leading-[220%]">
                                    Show more
                                </div>
                                <BiChevronRight size={20} />
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="col-span-3 lg:col-span-1">
                            <div className="text-xl leading-[220%] font-medium">
                                Safety & property
                            </div>
                            <div className="text-xl leading-[220%] font-medium">
                                No carbon monoxide alarm
                            </div>
                            <div className="text-xl leading-[220%] font-medium">
                                No smoke alarm
                            </div>
                            <div className="text-xl leading-[220%] font-medium">
                                Heights without rails or protection
                            </div>
                            <div className="flex gap-3 items-center text-accent">
                                <div className="text-xl text-accent font-medium leading-[220%]">
                                    Show more
                                </div>
                                <BiChevronRight size={20} />
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="col-span-3 lg:col-span-1">
                            <div className="text-xl leading-[220%] font-medium">
                                Cancellation policy
                            </div>
                            <div className="text-xl leading-[220%] font-medium">
                                Add your trip dates to get the
                            </div>
                            <div className="text-xl leading-[220%] font-medium">
                                cancellation details for this stay.
                            </div>
                            <div className="flex gap-3 items-center text-accent">
                                <div className="text-xl text-accent font-medium leading-[220%]">
                                    Add Details
                                </div>
                                <BiChevronRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
