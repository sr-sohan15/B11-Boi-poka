import React from 'react';
import Book from '../Book/Book';

const Books = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
            {
                data?.map((singleBook) => (
                    <Book key={singleBook.bookId} singleBook={singleBook} />
                ))
            }
        </div>
    );
};

export default Books;