import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = () => {
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const response = await RestaurantFinder.get(`/${id}`)
            const restaurantDetails = response.data.data.restaurant;
            setName(restaurantDetails.name)
            setLocation(restaurantDetails.location)
            setPriceRange(restaurantDetails.price_range)
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const UpdatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        })
        history.push("/")
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="price_range">Price range</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number" />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant