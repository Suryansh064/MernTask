import express from "express";
const router = express.Router();
import Task from "../models/task.js";
import User from "../models/user.js";
import authenticateToken from "./auth.js";

// Done 
router.post("/createTask",authenticateToken,async (req ,res)=>{
    try {
        const {title ,desc}= req.body;
        const id = req.user.id;
        const newTask = new Task({title :title , desc :desc});
        const saveTask = await newTask.save();
        await User.findByIdAndUpdate(id,{$push :{ tasks :saveTask._id}},{ new: true });
        res.status(200).json({message:"Task Created Successfully"});
    } catch (error)
    {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})

// Done
router.get("/getallTask", authenticateToken,async(req,res)=>{
    try {
        const id = req.user.id;
        const userData = await User.findById(id).populate({
            path :"tasks",
            options :{sort :{createdAt:-1}}, 
        });
        res.status(200).json({data :userData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})

// Done
router.delete("/deleteTask/:id", authenticateToken, async(req,res)=>{
    try {
        const {id} = req.params;
        const userId = req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId ,{$pull :{tasks :id}});
        res.status(200).json({message :"Task Deleted Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})


router.put("/updateTask/:id", authenticateToken, async(req,res) =>
    {
    try {
        const {id} = req.params;
        const {title ,desc} = req.body;
        await Task.findByIdAndUpdate(id,{title : title, desc:desc});
        res.status(200).json({message :"Task Updated Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})

router.put("/updateImpTask/:id", authenticateToken, async(req,res) =>
    {
    try {
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const impTask = TaskData.important;
        await Task.findByIdAndUpdate(id , {important :!impTask});
        res.status(200).json({message :"Task Important Updated Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})

router.put("/updateCompleteTask/:id", authenticateToken, async(req,res) =>
    {
    try {
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const CompleteTask = TaskData.complete;
        await Task.findByIdAndUpdate(id , {complete :!CompleteTask});
        res.status(200).json({message :"Task Complete Updated Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})


// Get Important Tasks 
router.get("/getImpTask", authenticateToken,async(req,res)=>{
    try {
        const id = req.user.id;
        const Data = await User.findById(id).populate({
            path :"tasks",
            match :{important :true},
            options :{sort :{createdAt:-1}}, 
        });
        const impTaskData = Data.tasks;

        res.status(200).json({data :impTaskData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})


// Get Complete Tasks 
router.get("/getCompleteTask", authenticateToken,async(req,res)=>{
    try {
        const id = req.user.id;
        const Data = await User.findById(id).populate({
            path :"tasks",
            match :{complete :true},
            options :{sort :{createdAt:-1}}, 
        });
        const CompleteTaskData = Data.tasks;

        res.status(200).json({data :CompleteTaskData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})



// Get InComplete Tasks 
router.get("/getInCompleteTask", authenticateToken,async(req,res)=>{
    try {
        const id = req.user.id;
        const Data = await User.findById(id).populate({
            path :"tasks",
            match :{complete :false},
            options :{sort :{createdAt:-1}}, 
        });
        const InCompleteTaskData = Data.tasks;

        res.status(200).json({data :InCompleteTaskData});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Internal Server Error"});
    }
})
export default router;