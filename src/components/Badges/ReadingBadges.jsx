import React from 'react';
import { FiAward, FiBook, FiCheckCircle, FiStar, FiZap } from 'react-icons/fi';

const ReadingBadges = ({ readCount, totalPages }) => {
    const badges = [
        {
            title: 'Novice Reader',
            desc: 'Read your first book',
            icon: <FiBook />,
            unlocked: readCount >= 1,
            color: 'from-amber-400 to-orange-500'
        },
        {
            title: 'Book Enthusiast',
            desc: 'Read 3+ books',
            icon: <FiAward />,
            unlocked: readCount >= 3,
            color: 'from-emerald-400 to-teal-500'
        },
        {
            title: 'Page Explorer',
            desc: 'Read over 500 pages',
            icon: <FiZap />,
            unlocked: totalPages >= 500,
            color: 'from-blue-400 to-indigo-500'
        },
        {
            title: 'Master Scholar',
            desc: 'Read over 1,000 pages',
            icon: <FiStar />,
            unlocked: totalPages >= 1000,
            color: 'from-purple-400 to-pink-500'
        }
    ];

    return (
        <div className="bg-base-100 border border-base-300 rounded-3xl p-5 sm:p-8 space-y-4 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
                <FiAward className="text-[#23BE0A]" /> Unlocked Achievements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {badges.map((b, idx) => (
                    <div 
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                            b.unlocked 
                                ? 'bg-gradient-to-br ' + b.color + ' text-white shadow-md border-transparent' 
                                : 'bg-base-200 text-base-content/40 border-dashed border-base-300 opacity-60'
                        }`}
                    >
                        <div className="text-2xl mb-2 flex justify-between items-center">
                            {b.icon}
                            {b.unlocked && <FiCheckCircle className="text-sm" />}
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm">{b.title}</h4>
                        <p className="text-[11px] mt-0.5 opacity-90">{b.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReadingBadges;