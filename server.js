const express = require('express');
const app = express();

const mongoose = require('mongoose');
const routes = require('./PlaceRoutes')

const cors = require('cors');

require('dotenv').config()

mongoose
.set("strictQuery", false)

const PORT = 8080 || process.env.port;

app.use(express.json());
app.use(cors())

mongoose
.connect(process.env.MONGODB_LINK)
.then(() => 
    console.log('We were connected to Mongo DB'))
.catch((err) => console.log(err))

app.use(routes);



app.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`)
})
