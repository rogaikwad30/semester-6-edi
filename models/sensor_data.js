const mongoose  = require("mongoose")
let sensorDataSchema = new mongoose.Schema({
    Value: {
        type: Number, 
        required: [true, "can't be blank"]
    },
    LogTime : {
        type: Date, 
        required: [true, "can't be blank"]
    },
    LogTime_EP : {
        type: Number, 
        required: [true, "can't be blank"]
    },
    bypass: {
        type: Boolean,
        default: false,
        required: [true, "can't be blank"]
    }
})

let sensorDataModel =  mongoose.model("Archive-SensorData", sensorDataSchema)
module.exports = sensorDataModel;
