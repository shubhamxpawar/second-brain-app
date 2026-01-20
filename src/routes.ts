import { Router } from "express";
import { User, Content, Tag } from "./models";
import type { userAuthBody, contentBody, tagBody } from "./types";
const router = Router()

router.get("/", (req, res) => {return res.send("api working")})

//auth routes

router.post("/auth/signup", async (req, res) => {
    const body = req.body as userAuthBody

    if(!body.username || !body.password){
        console.log("invalid details")
        return res.status(400).send("invalid details")
    }

    const user = await User.findOne({
        username : body.username,
        password : body.password
    })

    if(user){
        console.log("user already exists")
        return res.status(409).send("user already exists")
    }

    console.log("user : ", body)
    await User.create(body)

    return res.send("user created succesfully")
})

router.post("/auth/login", async (req, res) => {
    const body = req.body as userAuthBody

    if(!body.username || !body.password){
        console.log("invalid details")
        return res.status(400).send("invalid details")
    }

    const username = body.username
    
    const user = await User.findOne({username})
    if(!user){
        console.log("user doesnt exist")
        return res.status(404).send("user doesnt exist")
    }

    if(user.password !== body.password) return res.send("incorrect password")

    return res.send("user logged in")
})

//content routes

router.route("/content").post(async (req, res) => {
    const content = req.body as contentBody
    if(!content.title || !content.link || !content.tags || !content.type || !content.userId){
        return res.status(400).send("Invalid input data")
    }

    try {
        const postedContent = await Content.create(content);
        console.log("content uploaded succesfully");
        console.log("content : ", postedContent)
        return res.send("content uploaded succesfully")
    } catch (err) {
        console.error("content uploading failed:", err);
        return res.status(500).send({
            message : "content uploading failed",
            error : err
        })
    }

}).get(async (req, res) => {
    try{
        const allContent = await Content.find({}).select("-_id -__v")
            .populate("tags", "title -_id")
            .populate("userId", "username -_id")
            .lean()
            
        if(!allContent) return res.status(404).send("Couldnt find content");

        res.send(allContent)
    } catch(err){
        console.error("content finding failed:", err);
        return res.status(500).send({
            message : "content finding failed",
            error : err
        })
    }
})

router.route("/content/:id").delete(async (req, res) => {
    const contentId = req.params.id as string
    if(!contentId) res.status(400).send("invalid id parameter")

    try{
        const content = await Content.findById(contentId)
        if(!content) return res.status(404).send("couldnt find content with id : " + contentId)
        
        await Content.deleteOne({_id : contentId})
        return res.send("content deleted successfully with title : " + content.title)
    } catch(err){
        console.error("content deleting failed:", err);
        return res.status(500).send({
            message : "content deleting failed",
            error : err
        })
    }
})

//tag routes

router.route("/tags").post(async (req, res) => {
    const tag = req.body as tagBody

    if(!tag.title){
        console.log("invalid tag details")
        return res.status(400).send("invalid tag details")
    }

    const dataTag = await Tag.findOne({title : tag.title})

    if(dataTag){
        console.log("tag already exists")
        return res.status(409).send("tag already exists")
    }

    console.log("tag : ", tag)
    await Tag.create(tag)

    return res.send("tag created succesfully")
}).get(async (req, res) => {
    try{
        const allTags = await Tag.find({}).select("title -_id -__v")
        if(!allTags) return res.status(404).send("Couldnt find tags");
        console.log("tags : ")
        console.table(allTags)
        res.send(allTags)
    } catch(err){
        console.error("tags finding failed:", err);
        return res.status(500).send({
            message : "tags finding failed",
            error : err
        })
    }
})

export default router