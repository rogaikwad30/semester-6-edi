const mongoose  = require("mongoose")
let idealSchema = new mongoose.Schema({
    x: {
        type: Number, 
        required: [true, "can't be blank"]
    },
    y : {
        type: Number, 
        required: [true, "can't be blank"]
    },
    z : {
        type: Number, 
        required: [true, "can't be blank"]
    },
    steps: {
        type: Number, 
        required: [true, "can't be blank"]
    },
    LogTime_EP: {
        type: Number, 
        required: [true, "can't be blank"]
    }
})

let idealDataModel =  mongoose.model("ideal_data", idealSchema)
module.exports = idealDataModel;
