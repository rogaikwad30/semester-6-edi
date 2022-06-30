const sensorDataModel = require("../models/sensor_data");
const { checkErrors } = require("./validations");
const validations = require("./validations").checkErrors;

module.exports.getHome = async (req, res) => {
  res.render("dashboard");
};

module.exports.postSensorData = async (req, res) => {
  try {
    const time = new Date();
    const time_ep = time.getTime();
    const obj = await sensorDataModel.create({
      Value: 34,
      LogTime: time,
      LogTime_EP: time_ep,
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


module.exports.postTest = async(req,res) => {
  console.log(req.body)
  res.send(req.body)
}