const mongoose = require("mongoose")

const connect = ()=>{
    return mongoose.connect("mongodb+srv://sid283:sid_283@cluster0.cbay8.mongodb.net/test3?retryWrites=true&w=majority")
}

module.exports = connect