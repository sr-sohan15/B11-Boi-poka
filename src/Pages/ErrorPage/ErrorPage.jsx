import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F3F3F3] flex flex-col justify-center items-center px-4 py-8 text-center w-full">
            <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-200">
                <h1 className="text-6xl sm:text-8xl font-extrabold text-[#23BE0A] tracking-wider mb-2">
                    {error?.status || '404'}
                </h1>
                
                <h2 className="text-xl sm:text-2xl font-bold text-[#131313] mb-3">
                    {error?.statusText || "Oops! Page Not Found"}
                </h2>

                <p className="text-gray-500 mb-8 text-sm sm:text-base leading-relaxed">
                    {error?.data || error?.message || "The page you are looking for doesn't exist or has been moved."}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn border border-gray-300 bg-white text-[#131313] hover:bg-gray-100 rounded-xl px-6"
                    >
                        Go Back
                    </button>
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn bg-[#23BE0A] hover:bg-[#1fa908] text-white border-none rounded-xl px-6"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;