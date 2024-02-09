const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee")

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
    },
    email: String,
    password: String
})

const userModel = mongoose.model("user",userSchema)



app.post('/register',(req,res)=>{
    userModel.create(req.body)
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    userModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("success")
            }else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("no record exists")
        }
    })
})

app.listen(5500,()=>{
    console.log("server is running")
})