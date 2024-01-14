const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    name:{type:String, required: true},
    rating:{type: Number, required: true},
    comment:{type: String, required: true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

},{
    timestamps:true
})


const menuSchema = mongoose.Schema({
    
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
    description:{
        type: String,
        required: true
    },
    isAvailable:{
        type: Boolean,
        required: true,
        default:true
    },
    price:{
        type: Number,
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
},{
    timestamps: true,
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu;