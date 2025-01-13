import mongoose,{Schema} from "mongoose";
import { Admin } from "./admin.model";

const courseSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    price:{
        type:Number
    },
    imageURL:{
        type: String
    },
    creatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin
    }
},{timestamps:true})

export const Course = mongoose.model("Course",courseSchema)