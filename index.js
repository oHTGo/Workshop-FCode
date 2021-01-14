//Init Express
const express = require("express");
const app = express();

//Init dotenv
const dotenv = require("dotenv");
dotenv.config({ path: './config/config.env' });

//Init CORS
const cors = require("cors");
app.use(cors());

//Init Hepler
const helper = require("./helper");

//Init & catch error Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) {
    helper.setStatusBadRequest(res, "Can't parser json");
  } else {
    next();
  }
});

//Init DBConnect
const connectDB = require("./config/db");
connectDB();

//Init Passport & Session config
const passport = require("passport");
const configPassport = require("./config/passport")
configPassport();

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secret: "01001000 01010100 01000111 485447"
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Init routers
app.use("/api", require("./routesAPI/index"));
app.use("/", require("./routesView/index"));


//Config PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Server running in ' + process.env.NODE_ENV + ' mode on port ' + PORT));
