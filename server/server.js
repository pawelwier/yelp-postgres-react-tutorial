require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./db/index');

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get('/api/v1/restaurants', async (req, res) => {

    const result = await db.query('select * from restaurants')
    console.log(result);
    res.status(200).json({
        status: "success",
        data: {
            restaurant: [
                "bao bao",
                "bambus"
            ]
        }
    })
});

app.get('/api/v1/restaurants/:id', (req, res) => {
    console.log(req.params);
})

app.post('/api/v1/restaurants', (req, res) => {
    console.log(req.body);
})

app.put('/api/v1/restaurants/:id', (req, res) => {
    console.log(req.params.id);
})

app.delete('/api/v1/restaurants/:id', (req, res) => {
    console.log(req.params.id);
    res.status(204);
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port} again and again`);
});