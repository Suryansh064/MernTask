import mongoose from "mongoose";
const Conn = async ()=>{
    try {
        const response = await mongoose.connect(process.env.MONGO_URL);
        if(response) console.log("Connected to DataBase")
    } catch (error) {
        console.log("Error in DataBase Conncetion", error)  
    }
}
export default Conn;
