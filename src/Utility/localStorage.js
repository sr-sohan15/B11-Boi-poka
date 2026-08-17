import { toast } from 'react-toastify';

export const getCurrentUser = () => {
    const user = localStorage.getItem('boi-poka-user');
    return user ? JSON.parse(user) : null;
};

const getUserKey = (prefix) => {
    const user = getCurrentUser();
    return user ? `${prefix}_${user.email}` : `${prefix}_guest`;
};

// Read List
export const getStoredReadList = () => {
    const storedListStr = localStorage.getItem(getUserKey('read-list'));
    return storedListStr ? JSON.parse(storedListStr) : [];
};

export const addToStoredReadList = (id) => {
    const storedList = getStoredReadList();
    if (storedList.includes(id)) {
        toast.warn('This book is already in your Read list!');
    } else {
        storedList.push(id);
        localStorage.setItem(getUserKey('read-list'), JSON.stringify(storedList));
        toast.success('Book marked as Read!');
    }
};

export const removeFromStoredReadList = (id) => {
    const storedList = getStoredReadList();
    const updatedList = storedList.filter(bookId => bookId !== id);
    localStorage.setItem(getUserKey('read-list'), JSON.stringify(updatedList));
    toast.info('Removed from Read list');
};

// Wishlist
export const getStoredWishList = () => {
    const storedListStr = localStorage.getItem(getUserKey('wish-list'));
    return storedListStr ? JSON.parse(storedListStr) : [];
};

export const addToStoredWishList = (id) => {
    const storedWishList = getStoredWishList();
    const storedReadList = getStoredReadList();

    if (storedReadList.includes(id)) {
        toast.error('You already completed this book!');
    } else if (storedWishList.includes(id)) {
        toast.warn('Book is already in your Wishlist!');
    } else {
        storedWishList.push(id);
        localStorage.setItem(getUserKey('wish-list'), JSON.stringify(storedWishList));
        toast.success('Book added to Wishlist!');
    }
};

export const removeFromStoredWishList = (id) => {
    const storedList = getStoredWishList();
    const updatedList = storedList.filter(bookId => bookId !== id);
    localStorage.setItem(getUserKey('wish-list'), JSON.stringify(updatedList));
    toast.info('Removed from Wishlist');
};

// Goal Tracker
export const getStoredGoal = () => {
    const goal = localStorage.getItem(getUserKey('reading-target-goal'));
    return goal ? parseInt(goal) : 12;
};

export const setStoredGoal = (target) => {
    localStorage.setItem(getUserKey('reading-target-goal'), target);
};

// Community Reviews
export const getBookReviews = (bookId) => {
    const reviews = localStorage.getItem(`book_reviews_${bookId}`);
    return reviews ? JSON.parse(reviews) : [];
};

export const addBookReview = (bookId, reviewText, userRating) => {
    const user = getCurrentUser();
    const reviews = getBookReviews(bookId);
    const newEntry = {
        id: Date.now(),
        userName: user ? user.name : 'Guest Reader',
        text: reviewText,
        rating: userRating,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    reviews.unshift(newEntry);
    localStorage.setItem(`book_reviews_${bookId}`, JSON.stringify(reviews));
    toast.success('Your review has been posted!');
};

// Personal Private Notes
export const getPrivateNotes = (bookId) => {
    const notes = localStorage.getItem(getUserKey(`private_notes_${bookId}`));
    return notes ? JSON.parse(notes) : [];
};

export const savePrivateNote = (bookId, noteText) => {
    const notes = getPrivateNotes(bookId);
    const newNote = {
        id: Date.now(),
        text: noteText,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    notes.unshift(newNote);
    localStorage.setItem(getUserKey(`private_notes_${bookId}`), JSON.stringify(notes));
    toast.success('Private note saved!');
};

export const deletePrivateNote = (bookId, noteId) => {
    const notes = getPrivateNotes(bookId);
    const updated = notes.filter(n => n.id !== noteId);
    localStorage.setItem(getUserKey(`private_notes_${bookId}`), JSON.stringify(updated));
    toast.info('Note deleted');
};