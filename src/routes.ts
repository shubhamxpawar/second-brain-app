import { Router } from "express";
import { User } from "./models";
const router = Router()

router.get("/", (req, res) => {
    return res.send("api working")
})

//auth routes

router.post("/auth/signup", async (req, res) => {
    const body : object = req.body
    if(!body){
        console.log("invalid details")
        res.send("invalid details")
    }

    const user : object | null = await User.findOne(body)
    if(user){
        console.log("user already exists")
        return res.send("user doesnt exists")
    }

    console.log("user : ", body)
    await User.insertOne(body)

    return res.send("user created succesfully")
})

router.post("/auth/login", async (req, res) => {
    const body : object = req.body
    if(!body){
        console.log("invalid details")
        res.send("invalid details")
    }

    const username : string = body.username
    
    const user = await User.findOne({username})
    if(!user){
        console.log("user doesnt exist")
        return res.send("user doesnt exist")
    }

    if(user.password !== body.password) return res.send("incorrect password")

    return res.send("user logged in")
})

export default router