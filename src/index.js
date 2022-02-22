const express = require("express")
const connect = require("./configs/db")
const app = express()
const userController = require("./controllers/user.controller")
app.use(express.json())

app.use("/users",userController)

app.listen(2500,async()=>{
    try{
        await connect()
        console.log("Listening on port 2500")
    }catch(err){
        console.log(err.message)
    }
})