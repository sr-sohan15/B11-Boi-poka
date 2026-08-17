import React, { useState } from 'react';
import Book from '../Book/Book';
import { FiSearch } from "react-icons/fi";

const Books = ({ data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(data?.map(book => book.category) || [])];

    const filteredBooks = data?.filter(book => {
        const matchesSearch = book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              book.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="my-10 space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-base-content">Books</h2>
                <p className="text-base-content/70 text-xs sm:text-sm">Explore our diverse collection across various genres</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-base-200 p-4 rounded-2xl border border-base-300">
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search by title or author..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input input-bordered w-full pl-10 pr-4 rounded-xl text-sm bg-base-100 text-base-content border-base-300 focus:outline-none focus:border-[#23BE0A]"
                    />
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/50 text-lg" />
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full">
                    {categories.map((cat, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                                selectedCategory === cat
                                    ? 'bg-[#23BE0A] text-white shadow-sm'
                                    : 'bg-base-100 text-base-content hover:bg-base-300 border border-base-300'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {filteredBooks && filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((singleBook) => (
                        <Book key={singleBook.bookId} singleBook={singleBook} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-base-200 border border-base-300 rounded-2xl">
                    <p className="text-base-content/60 font-medium text-sm">No books found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Books;