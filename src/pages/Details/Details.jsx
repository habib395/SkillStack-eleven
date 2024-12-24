import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Details = () => {
    const { productBrand } = useLoaderData()
   
    return (
        <div>
            <h2>details page: {productBrand}</h2>
            <h2>details page</h2>
        </div>
    );
};

export default Details;