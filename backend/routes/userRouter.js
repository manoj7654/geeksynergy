// <-----------------importing express ------------------>
const express=require("express")

// <------------creating employee router------------------->
const userRouter=express.Router()

// <-------------importing register,loging --------------------->
const { register, login, updateUser, deleteUser, getUserList } = require("../controller/userController");
const { authenticate } = require("../middleware/authenticate");


// <--------for user list --------------->

userRouter.get('/list',authenticate, getUserList);
// <--------for register--------------->
userRouter.post("/register",register)


// <----------------for login----------------->
userRouter.post("/login",login)

// <----------------for update a user ----------------->
userRouter.put('/:id',authenticate, updateUser);

// <----------------for delete a user----------------->
userRouter.delete('/:id',authenticate, deleteUser);
// <------------exporting userRouter------------->
module.exports={userRouter}