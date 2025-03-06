require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");

//auth stuff
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

//db stuff
const pool = require("./db/pool");
const db = require("./db/queries");
const pgStore = require("connect-pg-simple")(session);

//routers
const indexRouter = require('./routes/indexRouter');
const loginRouter = require('./routes/loginRouter');
const signUpRouter = require('./routes/signUpRouter');
const newMessageRouter = require('./routes/newMessageRouter');

const app = express();
const sessionStore = new pgStore({ pool, createTableIfMissing: true });

app.use(
  session({
    store: sessionStore, //store sesion info in db instead of memory
    resave: false, //don't save session if unmodified
    saveUninitialized: false, //don't create session until something stored
    secret: process.env.SECRET, //secret key
    cookie: {
      maxAge: 1000 * 60, //1 minute
    },
  })
);

app.use(passport.session());

passport.use( //is called when authenticate function is called
  new LocalStrategy(async (username, password, done) => {
    try {
      const res = await db.getUser(username); //array of objects that contains id, fullname, member, admin, username, password.
      if (res === null) return done(null, false, { message: "Incorrect username" });
      const user = {id: res.id, username: res.username, member: res.member, admin: res.admin};
      const match = await bcrypt.compare(password, res.password);
      if (!match) return done(null, false, { message: "Incorrect password" });
      return done(null, user); //is passed to serializeUser
    } catch (error) {
      return done(error);
    }
  })
);


passport.serializeUser((user, done) => { //is called upon successful user authentication, user is passed from strategy
  done(null, user); //stores user in session cookie, pass error to next middleware
});

//can be used for db calls to get additional data, but for our requirements, it is not needed as all user data can be kept in session cookie
passport.deserializeUser((user, done) => {  //is called upon successful session authentication, user passed from cookie
  done(null, user); //pass error, user into next middleware
});


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //sets views directory
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/sign-up", signUpRouter);
app.use("/new-message", newMessageRouter);


app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
