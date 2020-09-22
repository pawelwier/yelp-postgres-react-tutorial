require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./db/index');

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get('/api/v1/restaurants', async (req, res) => {

    const results = await db.query('select * from restaurants')
    console.log(results);
    res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
            restaurant: results.rows
        }
    })
});

app.get('/api/v1/restaurants/:id', async (req, res) => {
    const results = await db.query(`select * from restaurants where id = $1`, [req.params.id])
    res.status(200).json({
        status: "success",
        results: results.rows[0]
    })
})

app.post('/api/v1/restaurants', async (req, res) => {
    const results = await db.query('insert into restaurants (name, location, price_range) values ($1, $2, $3) returning *', [
        req.body.name,
        req.body.location,
        req.body.price_range
    ]);
    console.log(results);
    res.status(200).json({
        status: "success",
        results: results.rows[0]
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port} again and again`);
});