import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ singleBook }) => {
    if (!singleBook) return null;

    const { bookId, bookName, author, image, rating, category, tags, review, yearOfPublishing } = singleBook;

    const renderStars = (numRating) => {
        const stars = [];
        const fullStars = Math.floor(numRating);
        const hasHalfStar = numRating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<span key={i} className="text-amber-400 text-sm">★</span>);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<span key={i} className="text-amber-400 text-sm">½</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300 text-sm">☆</span>);
            }
        }
        return stars;
    };

    return (
        <Link to={`/book/${bookId}`}>
            <div className="card bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 h-full cursor-pointer flex flex-col justify-between">
                <div>
                    <figure className="bg-[#F3F3F3] py-6 rounded-xl">
                        <img className="h-[160px] object-contain drop-shadow-sm" src={image} alt={bookName} />
                    </figure>

                    {tags && tags.length > 0 && (
                        <div className="flex gap-2 mt-4 flex-wrap">
                            {tags.map((tag, index) => (
                                <span key={index} className="badge bg-[#23BE0A]/10 text-[#23BE0A] border-none px-3 py-2 font-semibold text-xs rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-between gap-2 mt-3">
                        <h2 className="card-title text-lg font-bold text-[#131313] line-clamp-1">
                            {bookName}
                        </h2>
                        {yearOfPublishing >= 1950 && (
                            <span className="badge bg-[#FF007A] text-white font-bold text-[10px] border-none px-2 py-0.5 rounded-md">
                                NEW
                            </span>
                        )}
                    </div>

                    <p className="text-gray-500 font-medium text-xs mt-1">By : {author}</p>

                    {review && (
                        <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mt-2">
                            {review}
                        </p>
                    )}
                </div>

                <div>
                    <div className="border-t border-dashed border-gray-200 my-3"></div>

                    <div className="flex justify-between items-center text-xs font-medium text-gray-700">
                        <span>{category}</span>
                        
                        <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                            <span>{rating}</span>
                            <div className="flex items-center">
                                {renderStars(rating)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Book;