import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer/Footer';

const Roots = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-base-100">
            <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Roots;