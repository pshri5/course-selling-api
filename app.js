import CookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express()

app.use(cors({
    origin: "./.env",
    credentials:true
}))

app.use(CookieParser())
app.use(express.urlencoded({limit: "16kb"}))
app.use(express.json({limit:"16kb"}))




export {app}