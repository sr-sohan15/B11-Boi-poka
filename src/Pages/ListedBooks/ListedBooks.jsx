import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { 
    getStoredReadList, 
    getStoredWishList, 
    removeFromStoredReadList, 
    removeFromStoredWishList 
} from '../../utility/localStorage';
import ListedBookCard from '../../components/ListedBookCard/ListedBookCard';
import ReadingGoalStats from '../../components/ReadingGoalStats/ReadingGoalStats';
import ReadingBadges from '../../components/Badges/ReadingBadges';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { toast } from 'react-toastify';

const ListedBooks = () => {
    const allBooks = useLoaderData();
    const [readList, setReadList] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [activeTab, setActiveTab] = useState('read');
    const [sortCriterion, setSortCriterion] = useState('');

    const reloadData = () => {
        const storedReadIds = getStoredReadList();
        const storedWishIds = getStoredWishList();

        if (allBooks?.length > 0) {
            const readBooks = allBooks.filter(book => storedReadIds.includes(book.bookId));
            const wishBooks = allBooks.filter(book => storedWishIds.includes(book.bookId));
            setReadList(readBooks);
            setWishList(wishBooks);
        }
    };

    useEffect(() => {
        reloadData();
    }, [allBooks]);

    const handleRemoveBook = (bookId, currentTab) => {
        if (currentTab === 'read') {
            removeFromStoredReadList(bookId);
            setReadList(prev => prev.filter(b => b.bookId !== bookId));
        } else {
            removeFromStoredWishList(bookId);
            setWishList(prev => prev.filter(b => b.bookId !== bookId));
        }
    };

    const handleSort = (type) => {
        setSortCriterion(type);
        const sortBooks = (books) => {
            return [...books].sort((a, b) => {
                if (type === 'rating') return b.rating - a.rating;
                if (type === 'totalPages') return b.totalPages - a.totalPages;
                if (type === 'yearOfPublishing') return b.yearOfPublishing - a.yearOfPublishing;
                return 0;
            });
        };

        setReadList(sortBooks(readList));
        setWishList(sortBooks(wishList));
    };

    // CSV আকারে বুক লিস্ট ডাউনলোড
    const handleExportCSV = () => {
        const targetList = activeTab === 'read' ? readList : wishList;
        if (targetList.length === 0) {
            toast.warn('No books available to export!');
            return;
        }

        const headers = ["Book ID,Title,Author,Category,Pages,Rating,Publisher Year"];
        const rows = targetList.map(b => 
            `"${b.bookId}","${b.bookName}","${b.author}","${b.category}","${b.totalPages}","${b.rating}","${b.yearOfPublishing}"`
        );
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `BoiPoka_${activeTab}_list.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`Exported ${activeTab} books successfully!`);
    };

    const totalPagesRead = readList.reduce((acc, book) => acc + (book.totalPages || 0), 0);

    return (
        <div className="my-6 space-y-6">
            <div className="bg-[#131313]/5 dark:bg-base-200 py-8 rounded-3xl text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">My Reading Hub</h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your completed reads and future bookmarks</p>
            </div>

            {/* Reading Goal Dashboard */}
            <ReadingGoalStats readBooksCount={readList.length} totalPagesRead={totalPagesRead} />

            {/* Reading Badges & Gamification */}
            <ReadingBadges readCount={readList.length} totalPages={totalPagesRead} />

            {/* Actions: Sorting & Export */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn bg-[#23BE0A] hover:bg-[#1fa908] text-white border-none rounded-xl px-6 flex items-center gap-1 font-semibold shadow-sm">
                        <span>{sortCriterion ? `Sorted by: ${sortCriterion}` : 'Sort By'}</span>
                        <RiArrowDropDownLine className="text-2xl" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 dark:bg-base-200 rounded-box z-[1] w-52 p-2 shadow-lg border border-gray-100 dark:border-gray-700 mt-2">
                        <li><button onClick={() => handleSort('rating')}>Rating</button></li>
                        <li><button onClick={() => handleSort('totalPages')}>Number of pages</button></li>
                        <li><button onClick={() => handleSort('yearOfPublishing')}>Publisher year</button></li>
                    </ul>
                </div>

                <button 
                    onClick={handleExportCSV}
                    className="btn border border-gray-300 dark:border-gray-700 bg-white dark:bg-base-200 hover:bg-gray-100 dark:hover:bg-base-300 text-gray-700 dark:text-gray-200 rounded-xl px-5 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm"
                >
                    <FiDownload className="text-base" />
                    <span>Export {activeTab === 'read' ? 'Read' : 'Wishlist'} (CSV)</span>
                </button>
            </div>

            <div>
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setActiveTab('read')}
                        className={`py-3 px-6 text-sm sm:text-base font-semibold border-b-2 transition-all duration-200 ${
                            activeTab === 'read'
                                ? 'border-[#23BE0A] text-[#23BE0A] bg-transparent'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        Read Books ({readList.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('wishlist')}
                        className={`py-3 px-6 text-sm sm:text-base font-semibold border-b-2 transition-all duration-200 ${
                            activeTab === 'wishlist'
                                ? 'border-[#23BE0A] text-[#23BE0A] bg-transparent'
                                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        Wishlist Books ({wishList.length})
                    </button>
                </div>

                <div className="mt-6 space-y-4">
                    {activeTab === 'read' && (
                        readList.length > 0 ? (
                            readList.map(book => (
                                <ListedBookCard
                                    key={book.bookId}
                                    book={book}
                                    activeTab="read"
                                    onRemove={handleRemoveBook}
                                />
                            ))
                        ) : (
                            <div className="text-center py-16 bg-gray-50 dark:bg-base-200 rounded-2xl">
                                <p className="text-gray-400 font-medium">No books completed yet in your read list.</p>
                            </div>
                        )
                    )}

                    {activeTab === 'wishlist' && (
                        wishList.length > 0 ? (
                            wishList.map(book => (
                                <ListedBookCard
                                    key={book.bookId}
                                    book={book}
                                    activeTab="wishlist"
                                    onRemove={handleRemoveBook}
                                />
                            ))
                        ) : (
                            <div className="text-center py-16 bg-gray-50 dark:bg-base-200 rounded-2xl">
                                <p className="text-gray-400 font-medium">Your wishlist is currently empty.</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListedBooks;