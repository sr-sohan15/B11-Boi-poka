import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/books.jpg';

const Banner = () => {
    return (
        <div className="bg-base-200 rounded-3xl py-10 sm:py-14 px-6 sm:px-14 my-6">
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-8">
                <div className="space-y-5 text-center lg:text-left flex-1">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-base-content leading-tight">
                        Books to freshen up <br className="hidden sm:inline" /> your bookshelf
                    </h1>
                    <p className="text-base-content/75 text-xs sm:text-base max-w-md mx-auto lg:mx-0 font-medium">
                        Discover your next favorite read from our curated collection of bestselling books.
                    </p>
                    <div className="pt-2">
                        <Link to="/listedBooks">
                            <button className="btn bg-[#23BE0A] hover:bg-[#1fa908] text-white border-none rounded-xl px-7 font-bold shadow-md">
                                View The List
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="flex-1 flex justify-center lg:justify-end">
                    <img
                        src={bannerImg}
                        alt="Books Banner"
                        className="max-w-[220px] sm:max-w-sm rounded-2xl shadow-xl object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;