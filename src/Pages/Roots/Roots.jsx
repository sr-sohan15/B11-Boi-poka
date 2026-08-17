import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Header/Navbar';
import Footer from '../../components/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Roots = () => {
    return (
        <div className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden bg-base-100 text-base-content transition-colors duration-200">
            <ScrollToTop />
            <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
};

export default Roots;