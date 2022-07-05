const router = require("express").Router();
const User = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

router.get("/register", (req,res) => { // this finds a list of all the users already registered
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/register", async (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({msg: "Please enter in all fields"});
    }
    const user = await User.findOne({username: req.body.username});
    if(user){
        return res.status(400).json({msg: "User already exists"})
    }

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            const newUser = new User({
                username: req.body.username,
                password: hash,
            });
            newUser
                .save()
                .then((user) => res.json(user))
                .catch((err) => res.status(400).json("Error: " + err));
        });
    });
});
//login functions
router.get("/login", (req, res)=> {
    res.send("Login")
});

router.post("/login", async(req,res) => {
    //checks validity of entry
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({msg: "Enter in any missing fields"})
    }
    const user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(400).json({msg: "User doesn't exist"});
    }
    const valid = await bcrypt.compare(req.body.password, user.password);
    if(valid){
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.json({
            token: token, 
            user:{
                id: user._id,
                username: user.username,


            },
            msg: "Successfully Logged in"
        });
    }
    else{
        return res.status(400).json({msg: "Authentication error"});
    }
});

router.post("/tokenIsValid", async(req,res) =>{ // this determines if the jwt token is valid or not (for authorization)
    try{
        const token = req.header("auth-token");
        if(!token){ //if no token
            return res.json("false");
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified){ //if this doesn't return with the object containing user ID
            return res.json("false");
        }
        const user = await User.findById(verifid._id); // if user cannot be found baed on id
        if(!user){
            return res.json("false");
        }
        return res.json(true);

    } catch{
        res.status(500).json({msg: err.message});
    }
});
module.exports = router;


