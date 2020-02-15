const express = require("express");
const logger = require("morgan");

// middleware import 
const authMiddleware = require('./middlewares/auth')

// Routes Import
const users = require("./routes/users");
const employee = require("./routes/employe");
const company = require("./routes/company");
const action = require("./routes/action");
const notification = require('./routes/Notification');
const product = require('./routes/product');
const userProduct = require('./routes/UserProduct');
const userCompany = require('./routes/userCompany');

const cors = require('cors');
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
app.use(express.json());
app.use(cors());
//Routes
app.use(users)
app.use(authMiddleware);
app.use("/employee", employee);
app.use("/company", company);
app.use("/action", action);
app.use("/notification", notification);
app.use(product);
app.use(userProduct);
app.use(userCompany);

console.log(app._router.path)

// Catch 404 Errors and forward then to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found")  ;
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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening of port ${port}`));
