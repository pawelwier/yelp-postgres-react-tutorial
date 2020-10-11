import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'
import {RestaurantsContext} from '../context/RestaurantsContext'

const RestaurantDetailPage = () => {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            setSelectedRestaurant(response.data.data.restaurant);
        }
        fetchData();
    }, [])
    return (
        <div>
            {selectedRestaurant && selectedRestaurant.name}
        </div>
    )
}

export default RestaurantDetailPage;