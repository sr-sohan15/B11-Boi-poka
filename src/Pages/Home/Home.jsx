import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Banner from '../../components/Banner/Banner';
import Books from '../Books/Books';

const Home = () => {
    const data = useLoaderData();

    return (
        <div>
            <Banner />
            {/* এখানে কোনো map() থাকবে না, পুরো ডাটা একসাথে Books এ যাবে */}
            <Books data={data} />
        </div>
    );
};

export default Home;