const mongoose=require("mongoose")

const userSchema=mongoose.Schema({

    name:{type:String,require:true},
    phone:{type:Number,require:true},
    profession:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
   
},{
    versionKey:false,
})


const userModal=mongoose.model("users",userSchema)

module.exports={userModal}