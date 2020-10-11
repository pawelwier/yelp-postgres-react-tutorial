require('dotenv').config();
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const db = require('./db/index');


const app = express();

app.use(morgan("dev"));
app.use(cors())
app.use(express.json());

app.get('/api/v1/restaurants', async (req, res) => {

    const results = await db.query('select * from restaurants')
    console.log(results);
    res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            restaurants: results.rows
        }
    })
});

app.get('/api/v1/restaurants/:id', async (req, res) => {
    const restaurant = await db.query(`select * from restaurants where id = $1`, [req.params.id])
    const reviews = await db.query(`select * from reviews where restaurant_id = $1`, [req.params.id])

    res.status(200).json({
        status: "success",
        data: {
            restaurant: restaurant.rows[0],
            reviews: reviews.rows
        }
    })
})

app.post('/api/v1/restaurants', async (req, res) => {
    const results = await db.query('insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *', [
        req.body.name,
        req.body.location,
        req.body.price_range
    ]);
    console.log(results);
    res.status(201).json({
        status: "success",
        data: {
            restaurant: results.rows[0]
        }
    })
    
})

app.put('/api/v1/restaurants/:id', async (req, res) => {
    const results = await db.query('update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *', [
        req.body.name,
        req.body.location,
        req.body.price_range,
        req.params.id
    ]);
    console.log(results);
    res.status(200).json({
        status: "success",
        results: results.rows[0]
    })

})

app.delete('/api/v1/restaurants/:id', async (req, res) => {
    const results = await db.query('delete from restaurants where id = $1', [
        req.params.id
    ]);
    console.log(results);
    res.status(204).json({
        status: "success",
    })
})

app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
    const newReview = await db.query(`insert into reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *`, [
        req.params.id,
        req.body.name,
        req.body.review,
        req.body.rating
    ])
    res.status(201).json({
        status: 'success',
        data: {
            review: newReview.rows[0]
        }
    })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port} again and again`);
});