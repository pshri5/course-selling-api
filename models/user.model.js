import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
},{timestamps:true})

//password encrypted
userSchema.pre("save",async function (next) {
    if (!this.modified("password")) {
        return next()
    }
    
    this.password = bcrypt.hash(this.password,10) 


    next()
})

//comparing user provided and database stored password
userSchema.methods.isPasswordCorrect = async function(password){
    await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema)