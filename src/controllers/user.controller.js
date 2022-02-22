const express =  require("express")
const User = require("../models/user.model")
const { body, validationResult } = require('express-validator');
const router = express.Router()

router.post("",
body("first_name").notEmpty().isLength({min:3,max:20}).withMessage("Enter a valid first_name"),
body("last_name").notEmpty().isLength({min:3,max:20}).withMessage("Enter a valid last_name"),
body("email").notEmpty().isEmail().withMessage("Enter a valid email"),
body("pincode").notEmpty().isLength({min:6,max:6}).withMessage("Enter a valid pincode"),
body("age").notEmpty().isNumeric().custom(value=>{
    if(value>100 || value<1){
        throw new Error('Password confirmation does not match password');
    }
    return true
}).withMessage("Enter a valid age"),
body("gender").notEmpty().isIn(["Male","Female","Others"]).withMessage("Enter a valid gender"),
async(req,res)=>{
    try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let newError;
        newError = errors.array().map(err=>{
            return {error:err.param , message:err.msg}
        })
        return res.status(400).json({ errors: newError });
        // return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.create(req.body)
    return res.send(user)
    }catch(err){
        return res.status(500).send(err.message)
    }
})
router.get("",async(req,res)=>{
    try{
    const users = await User.find().lean().exec()
    return res.send(users)
    }catch(err){
        return res.status(500).send(err.message)
    }
})
module.exports = router