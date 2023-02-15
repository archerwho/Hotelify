const express = require(`express`);
const errorMiddleware = require(`./middleware/error`);
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser())

//Route Imports
const hotel = require(`./routes/hotelRoute`);
const room = require(`./routes/roomRoute`);
const user = require(`./routes/userRoute`)

app.use(`/api/v1`, hotel);
app.use(`/api/v1`, room);
app.use(`/api/v1`, user)

//Middlewares
app.use(errorMiddleware);

module.exports = app;
