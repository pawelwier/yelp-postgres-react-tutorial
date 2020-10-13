import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'
import StarRating from '../components/StarRating'

const RestaurantList = () => {

const { restaurants, setRestaurants } = useContext(RestaurantsContext);

let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
                try {
                    const response = await RestaurantFinder.get("/")
                    console.log(response.data.data);
                    setRestaurants(response.data.data.restaurants)
                } catch (err) {

                }    
        }

        fetchData();
    }, [])

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
        } catch(err) {

        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/restaurants/${id}/update`)
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`)
    }

    const renderRating = ({ average_rating, count }) => {
        const ratingDisplay = count ? (
            <>
                <StarRating rating={average_rating} />
                 <span>({count})</span>
            </>
        ) : <span>No reviews</span>

        return ratingDisplay;
    }

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Restaurant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr key={restaurant.id} onClick={() => handleRestaurantSelect(restaurant.id)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Edit</button></td>
                            <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList