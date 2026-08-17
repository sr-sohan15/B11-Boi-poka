import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams, Link } from 'react-router-dom';
import { 
    addToStoredReadList, 
    addToStoredWishList, 
    getStoredReadList,
    getStoredWishList,
    getCurrentUser, 
    getBookReviews, 
    addBookReview,
    getPrivateNotes,
    savePrivateNote,
    deletePrivateNote
} from '../../utility/localStorage';
import AuthModal from '../../components/AuthModal/AuthModal';
import { FiClock, FiExternalLink, FiMessageSquare, FiSend, FiUser, FiCheck, FiShare2, FiBookmark, FiTrash2 } from "react-icons/fi";
import { toast } from 'react-toastify';

const BookDetail = () => {
    const { bookId } = useParams();
    const loadedData = useLoaderData();
    const data = Array.isArray(loadedData) ? loadedData : [];
    const id = parseInt(bookId);

    const book = data.find(b => b.bookId === id);

    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signup');
    const [currentUser, setCurrentUser] = useState(null);
    const [pendingAction, setPendingAction] = useState(null);
    const [isRead, setIsRead] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [userRating, setUserRating] = useState(5);
    const [notes, setNotes] = useState([]);
    const [noteText, setNoteText] = useState('');

    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
        setReviews(getBookReviews(id));
        setNotes(getPrivateNotes(id));

        const readList = getStoredReadList();
        const wishList = getStoredWishList();
        setIsRead(readList.includes(id));
        setIsWishlisted(wishList.includes(id));
    }, [id]);

    if (!book) {
        return (
            <div className="text-center py-24 space-y-4">
                <h2 className="text-2xl font-bold text-base-content">Book Details Not Available!</h2>
                <Link to="/" className="btn bg-[#23BE0A] text-white rounded-xl">Back to Home</Link>
            </div>
        );
    }

    const {
        bookName,
        author,
        image,
        review,
        totalPages,
        rating,
        category,
        tags,
        publisher,
        yearOfPublishing,
        readUrl
    } = book;

    const estimatedHours = (totalPages / 40).toFixed(1);

    const handleShare = async () => {
        const shareData = {
            title: bookName,
            text: `Check out ${bookName} by ${author} on Boi Poka!`,
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log(err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Book link copied to clipboard!');
        }
    };

    const handleReadAction = () => {
        const user = getCurrentUser();
        if (!user) {
            toast.warn('Please sign up or log in first!');
            setAuthMode('signup');
            setPendingAction('read');
            setIsAuthOpen(true);
            return;
        }
        addToStoredReadList(id);
        setIsRead(true);
        setIsWishlisted(false);
    };

    const handleWishlistAction = () => {
        const user = getCurrentUser();
        if (!user) {
            toast.warn('Please sign up or log in first!');
            setAuthMode('signup');
            setPendingAction('wishlist');
            setIsAuthOpen(true);
            return;
        }
        addToStoredWishList(id);
        setIsWishlisted(true);
    };

    const handleAuthSuccess = (userData) => {
        setCurrentUser(userData);
        if (pendingAction === 'read') {
            addToStoredReadList(id);
            setIsRead(true);
            setIsWishlisted(false);
        } else if (pendingAction === 'wishlist') {
            addToStoredWishList(id);
            setIsWishlisted(true);
        }
        setPendingAction(null);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!reviewText.trim()) return;
        addBookReview(id, reviewText, userRating);
        setReviews(getBookReviews(id));
        setReviewText('');
    };

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        if (!noteText.trim()) return;
        savePrivateNote(id, noteText);
        setNotes(getPrivateNotes(id));
        setNoteText('');
    };

    const handleDeleteNote = (noteId) => {
        deletePrivateNote(id, noteId);
        setNotes(getPrivateNotes(id));
    };

    return (
        <div className="my-6 lg:my-10 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="bg-base-200 rounded-3xl p-6 sm:p-12 flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
                    <img 
                        src={image} 
                        alt={bookName} 
                        className="max-h-[300px] sm:max-h-[380px] object-contain rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content">{bookName}</h1>
                        <button
                            onClick={handleShare}
                            title="Share Book"
                            className="btn btn-circle btn-ghost text-base-content/80 hover:text-[#23BE0A]"
                        >
                            <FiShare2 className="text-xl" />
                        </button>
                    </div>

                    <p className="text-base-content/80 font-semibold text-sm sm:text-base">By : {author}</p>
                    
                    <div className="border-t border-b border-base-300 py-3 flex justify-between items-center">
                        <span className="text-base-content/80 font-semibold text-sm sm:text-base">{category}</span>
                        <div className="flex items-center gap-1.5 text-xs text-base-content/80 bg-base-200 px-3 py-1.5 rounded-lg font-medium">
                            <FiClock className="text-emerald-500" />
                            <span>Approx. {estimatedHours} hrs read</span>
                        </div>
                    </div>

                    <p className="text-base-content/75 leading-relaxed text-xs sm:text-sm">
                        <span className="font-bold text-base-content">Review : </span>
                        {review}
                    </p>

                    <div className="flex items-center gap-3 py-2">
                        <span className="font-bold text-base-content text-sm">Tag</span>
                        <div className="flex gap-2 flex-wrap">
                            {tags?.map((tag, idx) => (
                                <span key={idx} className="badge bg-[#23BE0A]/10 text-[#23BE0A] border-none px-3 py-2 font-semibold text-xs rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-base-300 pt-4 space-y-2.5 text-xs sm:text-sm">
                        <div className="flex gap-8 sm:gap-12">
                            <span className="text-base-content/70 w-36 font-medium">Number of Pages:</span>
                            <span className="font-bold text-base-content">{totalPages}</span>
                        </div>
                        <div className="flex gap-8 sm:gap-12">
                            <span className="text-base-content/70 w-36 font-medium">Publisher:</span>
                            <span className="font-bold text-base-content">{publisher}</span>
                        </div>
                        <div className="flex gap-8 sm:gap-12">
                            <span className="text-base-content/70 w-36 font-medium">Year of Publishing:</span>
                            <span className="font-bold text-base-content">{yearOfPublishing}</span>
                        </div>
                        <div className="flex gap-8 sm:gap-12">
                            <span className="text-base-content/70 w-36 font-medium">Rating:</span>
                            <span className="font-bold text-base-content">{rating} ★</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 sm:gap-4 pt-4">
                        {readUrl && (
                            <a 
                                href={readUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn bg-[#23BE0A] hover:bg-[#1fa908] text-white font-semibold px-5 sm:px-8 rounded-xl border-none shadow-sm flex items-center gap-2 text-xs sm:text-sm"
                            >
                                <span>Read Online</span>
                                <FiExternalLink className="text-base" />
                            </a>
                        )}

                        <button 
                            onClick={handleReadAction}
                            disabled={isRead}
                            className={`btn rounded-xl px-5 sm:px-7 font-semibold shadow-sm transition-all text-xs sm:text-sm ${
                                isRead 
                                    ? 'bg-base-300 text-base-content/50 cursor-not-allowed border-none' 
                                    : 'border border-base-300 bg-base-100 hover:bg-base-200 text-base-content'
                            }`}
                        >
                            {isRead ? (
                                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                                    <FiCheck className="text-base" /> Read Added
                                </span>
                            ) : (
                                'Mark as Read'
                            )}
                        </button>

                        <button 
                            onClick={handleWishlistAction}
                            disabled={isWishlisted || isRead}
                            className={`btn rounded-xl px-5 sm:px-7 font-semibold shadow-sm transition-all border-none text-xs sm:text-sm ${
                                isWishlisted || isRead
                                    ? 'bg-base-300 text-base-content/50 cursor-not-allowed' 
                                    : 'bg-[#50B1C9] hover:bg-[#3ea0b8] text-white'
                            }`}
                        >
                            {isRead ? 'Already Read' : isWishlisted ? (
                                <span className="flex items-center gap-1 text-cyan-600 font-bold">
                                    <FiCheck className="text-base" /> Wishlisted
                                </span>
                            ) : (
                                'Wishlist'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Private Notes */}
            <div className="border-t border-base-300 pt-8 space-y-5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-base-content flex items-center gap-2">
                    <FiBookmark className="text-amber-500" /> My Private Notes & Quotes
                </h3>

                <form onSubmit={handleNoteSubmit} className="bg-base-200 border border-base-300 p-4 sm:p-6 rounded-2xl space-y-3">
                    <textarea
                        rows="2"
                        placeholder="Write a private note, memorable quote or thought about this book..."
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm bg-base-100 text-base-content focus:border-amber-500"
                        required
                    ></textarea>
                    <button type="submit" className="btn bg-amber-500 hover:bg-amber-600 text-white btn-sm rounded-xl px-5 border-none font-bold">
                        Save Private Note
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {notes.map(n => (
                        <div key={n.id} className="p-4 rounded-xl border border-base-300 bg-base-100 flex justify-between items-start">
                            <div>
                                <p className="text-xs sm:text-sm text-base-content/85 font-medium italic">"{n.text}"</p>
                                <span className="text-[10px] text-base-content/50 mt-2 block font-medium">{n.date}</span>
                            </div>
                            <button onClick={() => handleDeleteNote(n.id)} className="text-base-content/40 hover:text-red-500 ml-2">
                                <FiTrash2 className="text-sm" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Community Reviews */}
            <div className="border-t border-base-300 pt-8 space-y-5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-base-content flex items-center gap-2">
                    <FiMessageSquare className="text-[#23BE0A]" /> Reader Discussions & Reviews ({reviews.length})
                </h3>

                <form onSubmit={handleReviewSubmit} className="bg-base-200 p-4 sm:p-6 rounded-2xl space-y-4">
                    <div className="flex flex-wrap justify-between items-center gap-3">
                        <span className="text-xs sm:text-sm font-bold text-base-content">
                            {currentUser ? `Posting as ${currentUser.name}` : 'Leave your rating & feedback (as Guest):'}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-base-content/75">Your Rating:</span>
                            <select 
                                value={userRating} 
                                onChange={(e) => setUserRating(Number(e.target.value))}
                                className="select select-bordered select-xs rounded-lg bg-base-100 text-base-content font-medium"
                            >
                                <option value="5">5 ★ (Masterpiece)</option>
                                <option value="4">4 ★ (Great Read)</option>
                                <option value="3">3 ★ (Good)</option>
                                <option value="2">2 ★ (Average)</option>
                                <option value="1">1 ★ (Poor)</option>
                            </select>
                        </div>
                    </div>

                    <textarea
                        rows="3"
                        placeholder={`Share your thoughts on ${bookName}...`}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="textarea textarea-bordered w-full rounded-xl text-xs sm:text-sm focus:border-[#23BE0A] bg-base-100 text-base-content"
                        required
                    ></textarea>

                    <button 
                        type="submit" 
                        className="btn bg-[#23BE0A] hover:bg-[#1fa908] text-white btn-sm rounded-xl px-5 border-none font-bold flex items-center gap-1.5"
                    >
                        <span>Post Review</span>
                        <FiSend className="text-xs" />
                    </button>
                </form>

                <div className="space-y-3">
                    {reviews.length > 0 ? (
                        reviews.map((rev) => (
                            <div key={rev.id} className="p-4 border border-base-300 rounded-2xl bg-base-100 space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-[#23BE0A]/20 text-[#23BE0A] flex items-center justify-center font-bold text-xs">
                                            {rev.userName?.charAt(0).toUpperCase() || <FiUser />}
                                        </div>
                                        <span className="font-bold text-base-content">{rev.userName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-400 font-bold">★ {rev.rating}.0</span>
                                        <span className="text-base-content/50 font-medium">• {rev.date}</span>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed pl-8">{rev.text}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-base-content/50 text-center py-4 font-medium">No community reviews yet. Be the first to share!</p>
                    )}
                </div>
            </div>

            <AuthModal
                isOpen={isAuthOpen}
                initialMode={authMode}
                onClose={() => setIsAuthOpen(false)}
                onLoginSuccess={handleAuthSuccess}
            />
        </div>
    );
};

export default BookDetail;