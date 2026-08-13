import React from 'react';
import bookimage from '../../assets/books.jpg';

const Banner = () => {
    return (
        <div className="bg-[#131313]/5 rounded-3xl py-8 px-4 sm:px-8 lg:px-16 my-4 w-full">
            <div className="flex flex-col-reverse lg:flex-row-reverse justify-between items-center gap-6 lg:gap-12 w-full">
                
                <div className="w-full lg:w-1/2 flex justify-center">
                    <img
                        alt="Books Banner"
                        src={bookimage}
                        className="max-w-[200px] sm:max-w-xs md:max-w-sm w-full rounded-2xl shadow-xl object-cover h-auto"
                    />
                </div>

                <div className="w-full lg:w-1/2 text-center lg:text-left space-y-3 sm:space-y-5">
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#131313] leading-snug">
                        Books to freshen up your bookshelf
                    </h1>
                    <p className="text-gray-600 text-xs sm:text-base max-w-md mx-auto lg:mx-0">
                        Discover your next favorite read from our curated collection of bestselling books.
                    </p>
                    <div>
                        <button className="btn bg-[#23BE0A] hover:bg-[#1fa908] text-white border-none rounded-xl px-5 sm:px-7 text-xs sm:text-sm font-semibold">
                            View The List
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;