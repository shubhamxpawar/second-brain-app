import { Router } from "express";
import { User } from "./models";
import type { userAuthBody } from "./types";
const router = Router()

router.get("/", (req, res) => {
    return res.send("api working")
})

//auth routes

router.post("/auth/signup", async (req, res) => {
    const body = req.body as userAuthBody

    if(!body.username || !body.password){
        console.log("invalid details")
        return res.status(400).send("invalid details")
    }

    const user = await User.findOne(body)

    if(user){
        console.log("user already exists")
        return res.send("user doesnt exists")
    }

    console.log("user : ", body)
    await User.insertOne(body)

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
        return res.send("user doesnt exist")
    }

    if(user.password !== body.password) return res.send("incorrect password")

    return res.send("user logged in")
})

export default router