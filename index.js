require ("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const Product = require("./models/product.model");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
// const session = require("express-session")
const port = 9999;
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const routerFB = require("./router/authRouterFB");
const router = require("./router/router.js");
const myStoreRouter = require("./router/mystore.router.js");
const authRouter = require("./router/authRouter.js");
const userRouter = require("./router/user.router");
const manageListRouter = require("./router/listRouter.js");
const validateLogin = require("./middlewares/auth.middleware")
const sessionMiddleware = require("./middlewares/session.middleware")

// Passport session setup. 
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/*config is our configuration variable.*/
passport.use(new FacebookStrategy({
  clientID: 628164661217196,
  clientSecret: "0d8f1efa7d969dc6860c6b10f67b8105" ,
  callbackURL: "http://localhost:9999/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    //Check whether the User exists or not using profile.id
    if(config.use_database) {
       //Further code of Database.
    }
    return done(null, profile);
  });
}
));

mongoose.connect(process.env.MONGO_URL).then(function() {
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(morgan("dev"));
  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  // app.use(session());
  app.use(express.static("public"));
  
  app.set("views", "./views");
  app.set("view engine", "pug");
  // app.use(sesionMiddleware);
  app.use("/", sessionMiddleware,router);
  app.use("/",manageListRouter);
  app.use("/mystore/view/", myStoreRouter)
  app.use("/mystore/",validateLogin.requireAuth, myStoreRouter);
  app.use("/user",authRouter);
  app.use("/user", routerFB);
  app.use("/user",validateLogin.requireAuth,userRouter);
  
  app.listen(port, ()=>{
      console.log("App is running with port " +port);
  });
});

