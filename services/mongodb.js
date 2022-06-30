const mongoose = require("mongoose");


// "mongodb+srv://rohan123:<password>@cluster0.pfqusy7.mongodb.net/?retryWrites=true&w=majority"


class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect( "mongodb+srv://rohan123:rohan123@cluster0.pfqusy7.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error : ", err);
      });
  }
}

module.exports = new Database();
