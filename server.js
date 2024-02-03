import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from './routes/categoryRoute.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'

const app = express();
//.env
dotenv.config();

//DB config
connectDB();


//Middlewares\
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT || 8080;

//rest api 

app.get('/', (req, res) => {
    res.send(
        '<h1>Welcome to Ecommerce MERN Stack App</h1>'
    )
})

app.get('/api/products', (req, res) => {
    const { start, limit } = req.query;
    const startIndex = parseInt(start) || 0;
    const endIndex = startIndex + (parseInt(limit) || 8);
    const products = allProducts.slice(startIndex, endIndex);

    res.json({ products, hasMore: endIndex < allProducts.length });
});



app.listen(PORT, () => {
    console.log(`Server IS Running on  ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen.bgBlack)
})
