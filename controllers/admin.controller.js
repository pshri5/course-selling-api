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
        
    } catch (error) {
        throw new Error("Signin failed")
    }
})

//create course

//show created course

//update course

//delete course



export {
    registerAdmin,
    loginAdmin,
}