import React, { useState, useContext } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import {RestaurantsContext} from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price range");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange
            })
            addRestaurants(response.data.data.restaurant);
        } catch(e) {

        }
    }

    return (
        <div>
            <h1 className="mb-4">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"/>
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location"/>
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                            <option disabled>Price range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </h1>
        </div>
    )
}

export default AddRestaurant