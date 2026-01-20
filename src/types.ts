import {Types} from "mongoose";
import type {IUser, ITag} from "./models";

export interface userAuthBody {
    username : string;
    password : string
}

enum contentType{
    text = "text",
    document = "document",
    image = "image",
    video = "video",
    audio = "audio"
}
export interface contentBody {
    title : string;
    type : contentType;
    link : string;
    tags : [Types.ObjectId | ITag];
    userId : Types.ObjectId | IUser
}

export interface tagBody {
    title : string
}

