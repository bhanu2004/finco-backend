const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const port = process.env.PORT||4000;



const userdata = require('./db/userdata');
const consultData = require('./db/consultData');
const mongoURL = "mongodb+srv://bhanu:dM7btuEdKWWDQgpj@cluster0.bukxiiu.mongodb.net/finco?retryWrites=true&w=majority";

mongoose.connect(mongoURL,{
    useNewUrlparser: true
}).then(()=>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));
//home route
app.get('/',(req,res)=>{
    res.send("mhello from the express...");
});

app.get('/signup',(req,res)=>{
    res.send("nhello from the express...");
});
app.post('/profile',(req,res)=>{
    console.log(req.body);
    
    consultData.find({userId:req.body.id})
    .then((ans)=>{
        res.send(ans);
    }).catch((err)=>{
        console.log(err);
    });
    
})

app.post('/consultancy', async(req,res)=>{
    console.log(req.body);
    try{
        const consult = new consultData({
            name: req.body.name,
            phone: req.body.phone,
            mode: req.body.mode,
            speciality: req.body.speciality,
            desc: req.body.desc,
            userId: req.body.userId,
            email: req.body.email,
            status: req.body.status
        })
        await consult.save();
    }
    catch(err){
        console.log(err);
    }
})

app.post('/signup',async(req,res)=>{
    console.log(req.body);
    try{
        const password = req.body.pass;
        const cpassword = req.body.confirmpassword;
        const name = req.body.name;
        const email = req.body.email;
        console.log(req.body);
        const user = new userdata({
            name: name,
            email:email,
            password:password,
        })
        await user.save();
        

        // if(password == cpassword){
        //     const regis
        // }
    }catch(error){
        res.send({status:"error"});
    }
})

app.post('/signin',async(req,res)=>{
    const {email, pass} = req.body;
    userdata.findOne({email:email},(err,user)=>{
        if(user){
            if(pass==user.password){
                console.log("login successfull");
                res.send({message:"Login Successfull", user:user});

            }
            else{
                console.log("invalid password");
                res.send({message:"password dindn't match"})
            }
        }
        else{
            console.log("user not registerd")
            res.send("user not registered");
        }
    })
})

app.listen(port, ()=>{console.log("listining to server on http://localhost:3000")});

 





