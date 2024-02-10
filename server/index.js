// const express = require("express")
// const mongoose = require('mongoose')
// const cors = require('cors')
// const bcrypt = require('bcrypt')


// const app = express()
// app.use(express.json())
// app.use(cors())

// // mongoose.connect("mongodb://127.0.0.1:27017/employee")

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/employee');
// }

// const userSchema = new mongoose.Schema({
//     name: {
//     type: String,
//     required: true
//     },
//     email: String,
//     password: String
// })

// const userModel = mongoose.model("user",userSchema)



// // app.post('/register',(req,res)=>{
// //     userModel.create(req.body)
// //     .then(data=>res.json(data))
// //     .catch(err=>res.json(err))
// // })

// // now adding hashing
// app.post('/register',(req,res)=>{
//     const {name,email,password} = req.body;
//     bcrypt.hash(password,10)
//     .then(hash =>{
//         userModel.create({name,email,password: hash})
//         .then(data=>res.json(data))
//         .catch(err=>res.json(err))
//     }).catch(err => console.log(err.message))
//     })
   




// // app.post("/login",(req,res)=>{
// //     const {email,password} = req.body;
// //     userModel.findOne({email:email})
// //     .then(user=>{
// //         if(user){
// //             if(user.password === password){
// //                 res.json("success")
// //             }else{
// //                 res.json("the password is incorrect")
// //             }
// //         }else{
// //             res.json("no record exists")
// //         }
// //     })
// // })


// // adding hashing

// app.post("/login",(req,res)=>{
//     const {email,password} = req.body;
//     userModel.findOne({email:email})
//     .then(user=>{
//         if(user){
//             bcrypt.compare(password,user.password,(err,response)=>{
//                 if(response){
//                     res.json("success")
//                 }else{
//                     res.json("the pass is incorrect")
//                 }
                
//             })
    
//         }else{
//             res.json("no record exists")
//         }
//     })
// })

// app.listen(5500,()=>{
//     console.log("server is running")
// })








// after adding jwt and cookie paeser

const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
// app.use(cookieParser)

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/employee');
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true,min: [6, 'Must be at least 6']}
})
// min: [6, 'Must be at least 6, got {VALUE}'],

const userModel = mongoose.model("user",userSchema)

// now adding hashing
app.post('/register',(req,res)=>{
    const {name,email,password} = req.body;
    bcrypt.hash(password,10)
    .then(hash =>{
        userModel.create({name,email,password: hash})
        .then(data=>res.json(data))
        .catch(err=>res.json(err))
    }).catch(err => console.log(err.message))
    })
   
// adding hashing

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    userModel.findOne({email:email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    res.json("success")
                }else{
                    res.json("the pass is incorrect")
                }
                
            })
    
        }else{
            res.json("no record exists")
        }
    })
})

app.listen(5500,()=>{
    console.log("server is running")
})