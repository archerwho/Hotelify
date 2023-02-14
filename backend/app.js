const express = require(`express`);
const errorMiddleware = require(`./middleware/error`);

const app = express();
app.use(express.json());

//Route Imports
const hotel = require(`./routes/hotelRoute`);
const room = require(`./routes/roomRoute`);

app.use(`/api/v1`, hotel);
app.use(`/api/v1`, room);

//Middlewares
app.use(errorMiddleware);

module.exports = app;
