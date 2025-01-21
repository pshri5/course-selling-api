import { Router } from "express";
import { registerAdmin,loginAdmin } from "../controllers/admin.controller";
import { createCourse,getCourse,updateCourse,deleteCourse } from "../controllers/course.controller";

const adminRouter = Router()

adminRouter.route("/register").post(registerAdmin)
adminRouter.route("/login").post(loginAdmin)
adminRouter.route("/course/create").post(createCourse)
adminRouter.route("/course/get").get(getCourse)
adminRouter.route("/course/update").patch(updateCourse)
adminRouter.route("/course/delete").delete(deleteCourse)



export default adminRouter