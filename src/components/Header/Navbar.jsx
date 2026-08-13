import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const links = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive 
                            ? "text-[#23BE0A] border border-[#23BE0A] font-semibold bg-transparent hover:bg-transparent" 
                            : "font-medium text-gray-700 hover:text-[#23BE0A]"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/listedBooks" 
                    className={({ isActive }) => 
                        isActive 
                            ? "text-[#23BE0A] border border-[#23BE0A] font-semibold bg-transparent hover:bg-transparent" 
                            : "font-medium text-gray-700 hover:text-[#23BE0A]"
                    }
                >
                    Listed Books
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to="/pagesToRead" 
                    className={({ isActive }) => 
                        isActive 
                            ? "text-[#23BE0A] border border-[#23BE0A] font-semibold bg-transparent hover:bg-transparent" 
                            : "font-medium text-gray-700 hover:text-[#23BE0A]"
                    }
                >
                    Pages to Read
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 py-4 px-0 flex justify-between items-center w-full">
            <div className="navbar-start w-auto">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0 pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-1">
                        {links}
                    </ul>
                </div>
                <Link to="/" className="text-xl sm:text-2xl font-bold text-[#131313]">Boi Poka</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {links}
                </ul>
            </div>

            <div className="navbar-end w-auto flex gap-2">
                <a className="btn bg-[#23BE0A] text-white hover:bg-[#1fa908] border-none px-4 sm:px-6 min-h-0 h-10 text-xs sm:text-sm rounded-xl">Sign In</a>
                <a className="btn bg-[#59C6D2] text-white hover:bg-[#43b2be] border-none px-4 sm:px-6 min-h-0 h-10 text-xs sm:text-sm rounded-xl hidden sm:inline-flex">Sign Up</a>
            </div>
        </div>
    );
};

export default Navbar;