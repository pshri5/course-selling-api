import { asyncHandler } from "../utils/asyncHandler";
import { Admin } from "../models/admin.model";
import bcrypt from "bcrypt"



//Register admin
const registerAdmin = asyncHandler(async(req,res)=>{
    try {
        const {firstName, lastName, email, password} = req.body
        if ([firstName,lastName,email,password].some((field)=>field?.trim()==="")) {
            throw new Error("All fields are compulsory")
        }
        //check if admin already exists
        const existingAdmin = Admin.findOne({email})
        if (existingAdmin) {
            throw new Error("Profile exists")
        }
        const admin = await Admin.create({
            firstName,
            lastName,
            email,
            password
        })

    } catch (error) {
        throw new Error("Signup failed")
    }
})
//login admin
const loginAdmin = asyncHandler(async(req,res)=>{
    try {
        const {email, password} = req.body
        if (!email && !password) {
            throw new Error("Please provide email and password")
        }

        const admin = Admin.findOne({email})
        if (!admin) {
            throw new Error("User does not exist")
        }
        const isPasswordCorrect = bcrypt.compare(password, admin.password)
        if (!isPasswordCorrect) {
            throw new Error("Invalid credentials")
        }
        const accessToken = jwt.sign({_id: admin._id},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"15m"
        })
        const refreshToken = jwt.sign({_id:admin._id},process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:"3d"
        })
        res.cookie("refreshToken",refreshToken,{
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000 //3days
        })
        
        res.status(200).json({
            _id: admin._id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            accessToken,
            message: "login Successful"
        })


    } catch (error) {
        throw new Error("Signin failed")
    }
})











export {
    registerAdmin,
    loginAdmin,
}