const express = require("express")
const handlers = require("./controllers/handlers")
const mongodb = require("./services/mongodb")
const path = require("path") 
const cors = require('cors');

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors());
var urlBodyEncoder = bodyParser.urlencoded({ extended: false })

app.get("/", urlBodyEncoder, handlers.getHome)
app.post("/save-sensor-data", urlBodyEncoder, handlers.postSensorData)

app.post("/", urlBodyEncoder, handlers.postTest)

// let SerialPort = require('serialport').SerialPort;  
// const { ReadlineParser } = require('@serialport/parser-readline')
// const port = new SerialPort({ 
//   path:'COM3', 
//   baudRate: 9600  
// }); 
// const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
// parser.on("open", () => {
//   console.log('serial port open');
// });
// parser.on('data', data =>{
//   console.log('got word from arduino:', data);
// });
const ExpressPort = process.env.PORT || 3000;
app.listen(ExpressPort, ()=>{
    console.log(`Server Started at Port - `, ExpressPort)
})