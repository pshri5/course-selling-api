import { asyncHandler } from "../utils/asyncHandler"
import {User} from "../models/user.model"
import bcrypt from "bcrypt"
import { Purchase } from "../models/purchases.model"
import { Course } from "../models/course.model"


//Register user
const registerUser = asyncHandler(async(req,res)=>{
    const {firstName,lastName,email, password} = req.body
    if (!firstName||!lastName||!email) {
        throw new Error("Please provide the neccesary information")
    }
    const userExist = await User.findOne({email})
    if (userExist) {
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const user = User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(201).json({
            success: true,
            message: "User is registered"
        })
    }
})
//login user
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if (!email || !password) {
        throw new Error("Please provide all the credentials")
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new Error("User does not exist")
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if (!isPasswordCorrect) {
        throw new Error("Invalid credentials")
    }

const accessToken = jwt.sign({_id: user._id},process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:"15m"
})
const refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN_SECRET,{
    expiresIn:"3d"
})
res.cookie("refreshToken",refreshToken,{
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000 //3days
})

res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken,
    message: "login Successful"
})
})
//show all purchased courses
const purchasedCourses = asyncHandler(async(req,res)=>{
    const userID = req.user._id
    const purchases = await Purchase.findById({userID})

    let purchasedCoursesID = []
    for (let i = 0; i < purchases.length; i++) {
        purchasedCoursesID.push(purchases[i].courseID)
        
    }
    const coursesData = await Course.find({
        _id: {$in:purchasedCoursesID} //find courses whose ID are in the array
    })
    res.status(200).json({
        purchases,
        coursesData
    })

})


export {
    registerUser,
    loginUser,
    purchasedCourses
}