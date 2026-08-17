import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthModal from '../AuthModal/AuthModal';
import { toast } from 'react-toastify';
import { FiLogOut, FiUser, FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signin');
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('boi-poka-theme') || 'light');

    useEffect(() => {
        const savedUser = localStorage.getItem('boi-poka-user');
        if (savedUser) setUser(JSON.parse(savedUser));
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('boi-poka-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleOpenAuth = (mode) => {
        setAuthMode(mode);
        setIsAuthOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('boi-poka-user');
        setUser(null);
        toast.info('Logged out successfully!');
    };

    const links = (
        <>
            <li>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        isActive 
                            ? "text-[#23BE0A] border border-[#23BE0A] font-bold bg-transparent!" 
                            : "font-semibold text-base-content hover:text-[#23BE0A]"
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
                            ? "text-[#23BE0A] border border-[#23BE0A] font-bold bg-transparent!" 
                            : "font-semibold text-base-content hover:text-[#23BE0A]"
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
                            ? "text-[#23BE0A] border border-[#23BE0A] font-bold bg-transparent!" 
                            : "font-semibold text-base-content hover:text-[#23BE0A]"
                    }
                >
                    Pages to Read
                </NavLink>
            </li>
        </>
    );

    return (
        <>
            <div className="navbar bg-transparent py-4 px-0 flex justify-between items-center w-full">
                <div className="navbar-start w-auto flex items-center gap-1">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden pl-0 pr-2 text-base-content">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-base-300 gap-1">
                            {links}
                        </ul>
                    </div>
                    <Link to="/" className="text-xl sm:text-2xl font-extrabold text-base-content tracking-tight">
                        Boi Poka
                    </Link>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2">
                        {links}
                    </ul>
                </div>

                <div className="navbar-end w-auto flex items-center gap-2 sm:gap-3">
                    <button 
                        onClick={toggleTheme} 
                        className="btn btn-ghost btn-circle btn-sm text-lg text-base-content"
                        title="Toggle Dark/Light Mode"
                    >
                        {theme === 'dark' ? <FiSun className="text-amber-400" /> : <FiMoon />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 bg-base-200 py-1.5 px-3 rounded-xl border border-base-300">
                                <div className="w-7 h-7 rounded-full bg-[#23BE0A] text-white flex items-center justify-center font-bold text-xs">
                                    {user.name?.charAt(0).toUpperCase() || <FiUser />}
                                </div>
                                <span className="text-xs font-semibold text-base-content max-w-[90px] truncate hidden sm:inline">
                                    {user.name}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="Log Out"
                                className="btn btn-ghost btn-circle btn-sm text-red-500 hover:bg-red-50"
                            >
                                <FiLogOut className="text-base" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => handleOpenAuth('signin')}
                                className="btn bg-[#23BE0A] text-white hover:bg-[#1fa908] border-none px-3.5 sm:px-6 min-h-0 h-9 sm:h-10 text-xs sm:text-sm rounded-xl font-semibold shadow-sm"
                            >
                                Sign In
                            </button>
                            <button 
                                onClick={() => handleOpenAuth('signup')}
                                className="btn bg-[#59C6D2] text-white hover:bg-[#43b2be] border-none px-3.5 sm:px-6 min-h-0 h-9 sm:h-10 text-xs sm:text-sm rounded-xl font-semibold shadow-sm hidden sm:inline-flex"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <AuthModal
                isOpen={isAuthOpen}
                initialMode={authMode}
                onClose={() => setIsAuthOpen(false)}
                onLoginSuccess={(userData) => setUser(userData)}
            />
        </>
    );
};

export default Navbar;