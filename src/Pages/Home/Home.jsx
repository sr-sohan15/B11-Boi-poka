import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import Books from '../Books/Books';

const Home = () => {
    const data = useLoaderData();

    return (
        <div className="w-full space-y-8 sm:space-y-12">
            <Banner />
            <Books data={data} />
        </div>
    );
};

export default Home;