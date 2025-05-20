const express = require("express");
const connectDB = require("./db/db_connection");
const User = require("./models/userModel");
const Registeration = require("./models/registerationModel");
const MediaContent = require("./models/mediaContentModel");
const cors = require("cors");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require('path')
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



connectDB();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

app.post("/adduser", async (request, response) => {
    const {name, email} = request.body;
    try{
        await User.insertOne({name, email});
        response.status(200).send({message: "User added successfully"});
    }
    catch(err){
        response.status(500).send({message: err});
    }
})

app.get("/getusers", async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).send({users});
    }
    catch(err){
        console.log(err);
        response.status(500).send({err});
    }
})

app.delete("/deleteuser/:id", async (request, response) => {
    try {
        await User.deleteOne({_id: request.params.id});
        response.status(200).send({message: "User deleted succesffully"});
    }
    catch(err){
        console.log(err);
        response.status(500).send({err});
    }
})

app.put("/updateuser/:id", async (request, response) => {
    const {name, email} = request.body;
    try {
        await User.updateOne({_id: request.params.id}, {name, email});
        response.status(200).send({message: "User updated succesffully"});
    }
    catch(err){
        console.log(err);
        response.status(500).send({err});
    }
})

app.get("/search-user/:value", async (request, response) => {
    const searchValue = request.params.value;
    try {
        const result = await User.find({
            "$or": [
                {"name" : {$regex : searchValue, $options: "i"}}
            ]
        });
        response.status(200).send({filteredUsers: result});
    }
    catch(err){
        response.status(500).send(err);
    }
})

app.post("/signup", async (request, response) => {
    try {
    const { name, email, password } = request.body;

    const hashPassword = await bcrypt.hash(password, 10);
    await Registeration.insertOne({name, email, password: hashPassword});
    response.status(200).send({message : "Registered Successfully"});
    }
    catch(err){
        console.log(err);
    }
})


app.post("/signin", async(request, response) => {
    const {email, password} = request.body;
    
        const registeredUser = await Registeration.findOne({email: email});
        if(registeredUser){
            const isMatch = await bcrypt.compare(password, registeredUser.password);
            if(isMatch){
                response.status(200).send({message: "Login Successfully", registeredUser});
            }
            else {
                response.status(200).send({message: "Invalid Credentials"});
            }
        }
        else {
            response.status(200).send({message: "Account does not exist for this email"});
        }
})

app.post("/media-upload", upload.single("file"),  async(request, response) => {
    const {filename} = request.file;
     console.log(filename)
    try {
        await MediaContent.insertOne({Image: filename});
        response.status(200).send({message: "File Uploaded Successfully"});
    }
    catch(err){
        console.log(err);
    }
})


app.get("/get-files", async(request, response) => {
    try {
        const files = await MediaContent.find();
        response.status(200).send(files);
    }
    catch(err){
        console.log(err);
    }
})

app.listen(2000, () => {
    console.log("Server started!");
})