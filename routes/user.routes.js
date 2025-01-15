import { Router } from "express";
import { registerUser,loginUser,purchasedCourses } from "../controllers/user.controller";

const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/courses").get(purchasedCourses)

export default userRouter