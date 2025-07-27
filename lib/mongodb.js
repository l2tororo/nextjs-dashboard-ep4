import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to DB")
    } catch(error) {
        console.log("Error connect to Mongo" , error)
    }
}