import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    tasks:[
        {
            type :mongoose.Types.ObjectId,
            ref:"Task",
        },
    ],
})
export default mongoose.model("user", UserSchema);