const express=require("express");
const { connection } = require("./config/db");

const app=express();

require("dotenv").config()
const { userRouter } = require("./routes/userRouter");
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to the hompage of this api")
})

app.use("/users",userRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Database connection successfull")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on ${process.env.port}`)
})