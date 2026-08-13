import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#131313] text-gray-300 mt-20 pt-12 pb-6">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-white">Boi Poka</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Discover, read, and organize your favorite books all in one place.
                    </p>
                </div>

                <div>
                    <h6 className="text-white font-semibold mb-4 text-base">Services</h6>
                    <ul className="space-y-2 text-sm">
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Book Review</a></li>
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Wishlist Management</a></li>
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Reading List</a></li>
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Author Profiles</a></li>
                    </ul>
                </div>

                <div>
                    <h6 className="text-white font-semibold mb-4 text-base">Company</h6>
                    <ul className="space-y-2 text-sm">
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">About us</a></li>
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Contact</a></li>
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Careers</a></li>
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Press kit</a></li>
                    </ul>
                </div>

                <div>
                    <h6 className="text-white font-semibold mb-4 text-base">Legal</h6>
                    <ul className="space-y-2 text-sm">
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Terms of use</a></li>
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Privacy policy</a></li>
                        <li><a className="hover:text-[#23BE0A] transition-colors cursor-pointer">Cookie policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto px-4 gap-2">
                <p>© {new Date().getFullYear()} Boi Poka. All rights reserved.</p>
                <p>
                    Developed with <span className="text-red-500"></span> by{" "}
                    <span className="text-gray-300 font-medium hover:text-[#23BE0A] transition-colors">
                        Md. Saidur Rahman Sohan
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;