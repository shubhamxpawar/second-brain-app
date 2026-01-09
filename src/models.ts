import mongoose from "mongoose";
import { Schema } from "mongoose";

//model interfaces

interface IUser extends mongoose.Document {
  username: string;
  password: string;
}

interface ITag extends mongoose.Document{
  title: string;
}

interface IContent extends mongoose.Document{
  title: string;
  type: string;
  link: string;
  tags: mongoose.Types.ObjectId | ITag;
  userId: mongoose.Types.ObjectId | IUser;
}

interface ILink extends mongoose.Document{
  hash: string;
  userId: mongoose.Types.ObjectId | IUser;
}

//mongoose models/schemas

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const tagSchema = new Schema<ITag>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const contentSchema = new Schema<IContent>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["text", "docucment", "image", "video", "audio"],
    required: true,
  },
  link: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const linkSchema = new Schema<ILink>({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Content = mongoose.model("Content", contentSchema);
const Link = mongoose.model("Link", linkSchema);

export { User, Tag, Content, Link };
