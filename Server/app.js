const express = require("express")
const app = express();
require('dotenv').config();
const cors = require('cors')
const morgan = require('morgan')
const cookieparser = require("cookie-parser")
const bodyParser = require("body-parser")



const db = require("./config/mongoose-connection")
const userRoutes = require("./routes/userRouters")
const planRoutes = require("./routes/planRouters")
const goalRouter = require("./routes/goalRouter")
const qrCodeRoute = require("./routes/qrCode")


require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieparser());
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin:"*"
}))
app.use(morgan('dev'))

app.get("/",(req,res)=>{
    res.send("backend server Started")
})

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
    data: null
  });
});

app.use('/user', userRoutes);
app.use('/plan', planRoutes);
app.use('/goal', goalRouter);
app.use('/api', qrCodeRoute);

module.exports = app;