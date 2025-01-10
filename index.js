import dotenv from "dotenv"
import { app } from "./app.js"
import { connectDB } from "./db/index.js"

const port = process.env.PORT || 8000
dotenv.config({
    path: "./.env",
    credentials: true
})

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
})
.catch((err)=>{
    console.log("Mongodb connection error",err)
})

