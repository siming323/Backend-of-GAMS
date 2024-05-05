import mongoose from "mongoose";

const accessorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true
    },
    cover: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    stock: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    madeAt: {
        type: Number,
        default:null,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updateAt: {
        type: Number,
        default: Date.now,
    }
})

export default accessorySchema