const express = require("express")
const app = express();
const cors = require('cors')
const cookieparser = require("cookie-parser")
const bodyParser = require("body-parser")



const db = require("./config/mongoose-connection")
const userRoutes = require("./routes/userRouters")
const planRoutes = require("./routes/planRouters")
// const goalRouter = require("./routes/goalRouter")
// const indexRouter = require("./routes/indexRouter")
// const qrCodeRoute = require("./routes/qrCode")

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieparser());
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())


app.use('/user', userRoutes);
app.use('/plan', planRoutes);
// app.use('/goal', goalRouter);
// app.use('/api', qrCodeRoute);

module.exports = app