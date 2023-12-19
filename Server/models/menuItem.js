import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required: true,
    },
    image:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    
})
