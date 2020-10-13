import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import {RestaurantsContext} from '../context/RestaurantsContext'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetailPage = () => {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            setSelectedRestaurant(response.data.data);
        }
        fetchData();
    }, [])
    return (
        <div>
            {selectedRestaurant && (
                <>
                    <h1>{selectedRestaurant.restaurant.name}</h1>
                    <StarRating rating={selectedRestaurant.restaurant.average_rating} />
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>
                    <AddReview />
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage;