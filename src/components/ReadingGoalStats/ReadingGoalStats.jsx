import React, { useState, useEffect } from 'react';
import { getStoredGoal, setStoredGoal } from '../../utility/localStorage';
import { FiTarget, FiBookOpen, FiAward } from 'react-icons/fi';

const ReadingGoalStats = ({ readBooksCount, totalPagesRead }) => {
    const [goal, setGoal] = useState(12);
    const [isEditing, setIsEditing] = useState(false);
    const [customGoal, setCustomGoal] = useState(12);

    useEffect(() => {
        const stored = getStoredGoal();
        setGoal(stored);
        setCustomGoal(stored);
    }, []);

    const handleSaveGoal = () => {
        const parsed = parseInt(customGoal) || 1;
        setGoal(parsed);
        setStoredGoal(parsed);
        setIsEditing(false);
    };

    const progressPercentage = Math.min(Math.round((readBooksCount / goal) * 100), 100);

    return (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-5 sm:p-8 my-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
                
                <div className="flex items-center gap-4 bg-base-100 p-4 rounded-2xl border border-base-300 shadow-sm">
                    <div className="p-3 bg-[#23BE0A]/10 text-[#23BE0A] rounded-xl text-2xl">
                        <FiBookOpen />
                    </div>
                    <div>
                        <p className="text-xs text-base-content/60 font-medium">Completed Books</p>
                        <h4 className="text-xl sm:text-2xl font-bold text-base-content">{readBooksCount}</h4>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-base-100 p-4 rounded-2xl border border-base-300 shadow-sm">
                    <div className="p-3 bg-[#50B1C9]/10 text-[#50B1C9] rounded-xl text-2xl">
                        <FiAward />
                    </div>
                    <div>
                        <p className="text-xs text-base-content/60 font-medium">Total Pages Read</p>
                        <h4 className="text-xl sm:text-2xl font-bold text-base-content">{totalPagesRead}</h4>
                    </div>
                </div>

                <div className="bg-base-100 p-4 rounded-2xl border border-base-300 shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-base-content/70 font-semibold flex items-center gap-1">
                            <FiTarget className="text-emerald-500" /> Annual Goal
                        </span>
                        {isEditing ? (
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    min="1"
                                    value={customGoal}
                                    onChange={(e) => setCustomGoal(e.target.value)}
                                    className="input input-xs input-bordered w-16 text-center bg-base-100 text-base-content"
                                />
                                <button onClick={handleSaveGoal} className="btn btn-xs bg-[#23BE0A] text-white border-none">Set</button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="text-xs text-emerald-600 hover:underline font-bold">
                                {readBooksCount} / {goal} books (Edit)
                            </button>
                        )}
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2.5 overflow-hidden">
                        <div
                            className="bg-[#23BE0A] h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="text-[11px] text-right text-base-content/50 font-medium">{progressPercentage}% Completed</p>
                </div>

            </div>
        </div>
    );
};

export default ReadingGoalStats;