import mongoose from "mongoose";
import dotenv from 'dotenv'

if(process.env.BACKEND_URL)
mongoose.connect(process.env.BACKEND_URL)

const userSchema = new mongoose.Schema({
    username : String,
    password : String
})

const linkSchema = new mongoose.Schema({
    hash : String,
    userId : mongoose.Types.ObjectId
})

const contentSchema = new mongoose.Schema({
    link : String,
    type : String,
    title : String,
    tag : {type : mongoose.Types.ObjectId , ref: 'tags'},
    userId : {type : mongoose.Types.ObjectId , ref : 'users'}
})

const tagSchema = new mongoose.Schema({
    title : String,
});

export const userModel = mongoose.model('users' , userSchema);
export const contentModel = mongoose.model('contents' , contentSchema);
export const linkModel = mongoose.model('links' , linkSchema);
export const tagModel = mongoose.model('tags' , tagSchema);