import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './Database/db.js';
import Razorpay from "razorpay"
dotenv.config();
import cors from 'cors'

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
  });

const app = express()
app.use(express.json())
app.use(cors());

app.use("/uploads",express.static("uploads"))

const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.send("Server is working")
})

// importing routes
import userRoutes from "./routes/user.js"
import courseRoutes from "./routes/course.js"
import adminRoutes from "./routes/admin.js"


// using routes
app.use('/api',userRoutes)
app.use('/api',courseRoutes)
app.use('/api',adminRoutes)


app.listen(port, ()=>{
    console.log(`Server is listening on http://localhost:${port} `)
    connectDb()
})