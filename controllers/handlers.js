const sensorDataModel = require("../models/sensor_data");
const { checkErrors } = require("./validations");
const validations = require("./validations").checkErrors;
const idealDataModel = require("../models/ideal_data");

module.exports.getHome = async (req, res) => {
  try {
    let idealData = await idealDataModel.find({}, {"LogTime":1,"x":1, "y":1, "z" : 1, "_id":0, "LogTime_EP":1}).sort({"LogTime_EP":-1}).limit(3050)
    idealData.reverse()
    let finalData_x = {}
    let finalData_y = {}
    for(let doc of idealData){
      finalData_x[doc["LogTime_EP"]]  = doc["x"]
      finalData_y[doc["LogTime_EP"]]  = doc["y"]
    }
    res.render("dashboard", {'liveDataX' : finalData_x , liveDataY:finalData_y})
  } catch (error) {
    res.status(400).json({
      "error" : error.message
    })
  }
};

module.exports.postSensorData = async (req, res) => {
  try {
    const time = new Date();
    const time_ep = time.getTime();
    const obj = await sensorDataModel.create({
      Value: req.body.Value || -1,
      LogTime: time,
      LogTime_EP: time_ep,
      bypass: req.body.bypass || false,
      x: req.body.x || 0,
      y: req.body.y || 0,
      z: req.body.z || 0
    });
    res.json({
      status: 200,
      message: `Data saved to the database successfully`,
      id: obj["_id"],
    });
  } catch (error) {
    const validationErrors = checkErrors(error);
    res.json({
      status: 400,
      errors: validationErrors,
    });
  }
};

module.exports.SaveSensorDataSerialPort = async ( inputData ) => {
  try {
    const time = new Date();
    const time_ep = time.getTime();
    const obj = await sensorDataModel.create({
      Value: 34,
      LogTime: time,
      LogTime_EP: time_ep,
    });
    console.log({
      status: 200,
      message: `Data saved to the database successfully`,
      id: obj["_id"],
    });
  } catch (error) {
    const validationErrors = checkErrors(error);
    console.log({
      status: 400,
      errors: validationErrors,
    });
  }
};

module.exports.getLineChartData = async (req,res) => {
  try {
    const all = await sensorDataModel.find({}, {"LogTime":1,"Value":1, "_id":0, "x":1,"y":1,"z":1,"LogTime_EP":1}).sort({"LogTime_EP":-1}).limit(8)
    all.reverse()
    let data = {
      "labels" : [],
      "valuesX" : [],
      "valuesY" : [] 
    }
    for(let doc of all){
      data["labels"].push(doc["LogTime"])
      data["valuesX"].push(doc["x"])
      data["valuesY"].push(doc["y"])
    }
    
    res.send({'liveData' : data })
  } catch (error) {
    res.status(400).json({
      "error" : error.message
    })
  }
}

module.exports.getPieData = async (req, res) => {
  try {
    let config = {
      "groupby" : null || "",
      "column" : null || "Value",
      "aggregator" :  null || "first",

    }

    let grpBy = "";
    let agg = "$sum";
    if(config["groupby"]){
      grpBy = "$" + config["groupby"]
    }
    if(config["aggregator"]){
      agg = "$" + config["aggregator"]
    }

    let value = {}
    value[agg] =  "$" + config["column"]
 
    
    let all = await sensorDataModel.aggregate([
      {
        "$group" : {
          "_id" : grpBy,
          value
        }
      }
    ])


    for(let i of all){
      console.log(i)
    }

    res.send(all)

  } catch (error) {
    res.status(400).json({
      "error" : error.message
    })
  }
}