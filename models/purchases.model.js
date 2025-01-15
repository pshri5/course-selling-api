import mongoose,{Schema} from "mongoose";
import { Course } from "./course.model";
import { User } from "./user.model";

const purchaseSchema = new Schema({
    courseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:Course
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: User 
    }
},{timestamps:true})


export const Purchase = mongoose.model("Purchase",purchaseSchema)