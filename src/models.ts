import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

const tagSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique : true
    }
})

const contentSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    type : {
        type : String,
        enum : ["text", "docucment", "image", "video", "audio"],
        required : true
    },
    link : { type : String, required : true},
    tags : [{type : Schema.Types.ObjectId, ref : "Tag"}],
    userId : { 
        type : Schema.Types.ObjectId, 
        ref : "User", 
        required : true
    } 
})

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
});

const User = mongoose.model("User", userSchema)
const Tag = mongoose.model("Tag", tagSchema)
const Content = mongoose.model("Content", contentSchema)
const Link = mongoose.model("Link", linkSchema)

export {
    User,
    Tag,
    Content,
    Link
}