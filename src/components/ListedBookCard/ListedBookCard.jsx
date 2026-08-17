import React from 'react';
import { Link } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import { FiUsers, FiTrash2 } from "react-icons/fi";
import { RiFileListLine } from "react-icons/ri";

const ListedBookCard = ({ book, activeTab, onRemove }) => {
    const { bookId, bookName, author, image, rating, category, tags, totalPages, publisher, yearOfPublishing } = book;

    return (
        <div className="border border-base-300 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-center bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 relative group">
            <div className="bg-base-200 rounded-xl py-6 px-10 flex justify-center items-center w-full md:w-52 h-52 shrink-0 overflow-hidden">
                <img src={image} alt={bookName} className="h-40 object-contain group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="w-full space-y-3">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-base-content hover:text-[#23BE0A] transition-colors">{bookName}</h2>
                        <p className="text-xs sm:text-sm font-medium text-base-content/70 mt-1">By : {author}</p>
                    </div>
                    <button
                        onClick={() => onRemove(bookId, activeTab)}
                        title="Remove book"
                        className="btn btn-circle btn-ghost btn-sm text-base-content/40 hover:text-red-500 hover:bg-red-50"
                    >
                        <FiTrash2 className="text-lg" />
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <span className="font-bold text-base-content">Tag</span>
                    {tags?.map((tag, idx) => (
                        <span key={idx} className="badge bg-[#23BE0A]/10 text-[#23BE0A] border-none px-3 py-1 text-xs font-semibold rounded-full">
                            #{tag}
                        </span>
                    ))}
                    <div className="flex items-center gap-1 text-base-content/60 text-xs sm:text-sm">
                        <IoLocationOutline className="text-base" />
                        <span>Year: {yearOfPublishing}</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-base-content/60 border-b border-base-200 pb-3">
                    <div className="flex items-center gap-1">
                        <FiUsers className="text-base" />
                        <span>Publisher: {publisher}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <RiFileListLine className="text-base" />
                        <span>Page {totalPages}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-1 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        <span className="badge bg-[#328EFF]/15 text-[#328EFF] border-none px-3.5 py-2.5 rounded-full text-xs font-medium">
                            Category: {category}
                        </span>
                        <span className="badge bg-[#FFAC33]/15 text-[#FFAC33] border-none px-3.5 py-2.5 rounded-full text-xs font-medium">
                            Rating: {rating} ★
                        </span>
                    </div>
                    <Link to={`/book/${bookId}`}>
                        <button className="btn bg-[#23BE0A] hover:bg-[#1fa908] text-white rounded-xl px-5 min-h-0 h-9 text-xs border-none font-semibold shadow-sm">
                            View Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ListedBookCard;