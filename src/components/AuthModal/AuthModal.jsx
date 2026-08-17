import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FiX, FiMail, FiLock, FiUser } from 'react-icons/fi';

const AuthModal = ({ isOpen, onClose, initialMode = 'signin', onLoginSuccess }) => {
    const [mode, setMode] = useState(initialMode);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || (mode === 'signup' && !name)) {
            toast.error('Please fill in all required fields!');
            return;
        }

        if (mode === 'signup') {
            const newUser = { name, email };
            localStorage.setItem('boi-poka-user', JSON.stringify(newUser));
            onLoginSuccess(newUser);
            toast.success(`Welcome to Boi Poka, ${name}!`);
        } else {
            const userName = email.split('@')[0];
            const loggedUser = { name: userName, email };
            localStorage.setItem('boi-poka-user', JSON.stringify(loggedUser));
            onLoginSuccess(loggedUser);
            toast.success('Signed in successfully!');
        }

        onClose();
        setName('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
            <div className="bg-base-100 text-base-content border border-base-300 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
                <button 
                    onClick={onClose}
                    className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-base-content/60 hover:text-base-content"
                >
                    <FiX className="text-xl" />
                </button>

                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-base-content">
                        {mode === 'signin' ? 'Welcome Back!' : 'Create Account'}
                    </h3>
                    <p className="text-xs text-base-content/60 mt-1">
                        {mode === 'signin' 
                            ? 'Sign in to access your reading list and reviews' 
                            : 'Sign up to build your personalized digital bookshelf'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'signup' && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full pl-10 rounded-xl text-sm bg-base-200 text-base-content border-base-300 focus:border-[#23BE0A]"
                            />
                            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full pl-10 rounded-xl text-sm bg-base-200 text-base-content border-base-300 focus:border-[#23BE0A]"
                        />
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>

                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full pl-10 rounded-xl text-sm bg-base-200 text-base-content border-base-300 focus:border-[#23BE0A]"
                        />
                        <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>

                    <button
                        type="submit"
                        className="btn bg-[#23BE0A] hover:bg-[#1fa908] text-white border-none w-full rounded-xl font-semibold mt-2 shadow-sm"
                    >
                        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center mt-6 text-xs text-base-content/70">
                    {mode === 'signin' ? (
                        <p>
                            Don't have an account?{' '}
                            <button 
                                onClick={() => setMode('signup')} 
                                className="text-[#23BE0A] font-bold hover:underline"
                            >
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{' '}
                            <button 
                                onClick={() => setMode('signin')} 
                                className="text-[#23BE0A] font-bold hover:underline"
                            >
                                Sign In
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;