const express = require("express");
const logger = require("morgan");

// Routes Import
const users = require("./routes/users");
const employee = require("./routes/employe");
const company = require("./routes/company");

const mongoose = require("mongoose");
const listEndpoints = require('express-list-endpoints')


// Database connection configuration
mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://sirius:Ffxv159357@cluster0-4trhr.mongodb.net/revirdb?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Middlewares
const app = express();
app.use(logger("dev"));
app.use(express.json())
//Routes
app.use("/users", users);
app.use("/employee", employee);
app.use("/company", company);
console.log(app._router.path)

// Catch 404 Errors and forward then to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // Respond to client
  res.status(status).json({
    message: error.message
  });

  console.log(error);
});

console.log(listEndpoints(app));


const port = app.get("port") || 3000;
app.listen(port, () => console.log(`Server is listening of port ${port}`));
