const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session")
const cookieParser = require("cookie-parser");
const ObjectID = require("mongoose").Types.ObjectId;
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth , authUser } = require("./middleware/auth.middleware");
require("./config/db");
require("dotenv").config({ path: ".env" });

const path = require("path")
// const multer = require('multer');

const app = express();


// Cors parametre \\

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  // allowedHeaders: ["set-cookie", "Content-type"],
  allowedHeaders: ["sessionId", "Content-type"],
  exposeHeaders: ["sessionId"],
  // exposeHeaders:["set-cookie"] ,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// parser \\
app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const sessionOption ={
//   secret: 'wow very secret',
//   cookie: {
//     maxAge: 600000,
//     secure: false},
// saveUninitialized: false,
//   resave: false,
//   unset: 'destroy'


// }

// app.use(session(sessionOption))


//jwt check user id \\
app.get('*', checkUser,
// (req,res)=>{
  
//   console.log(res.body);
//   res.send(req.user)}
); // TODO 

app.get('/jwtid', requireAuth, (req,res)=>{
  // console.log(res);
  
  res.status(200).send(res.locals.user_id)});
app.get('/me',authUser,(req,res)=>{res.status(200).send(res.locals.user_id)});




// routes\\
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// static image express \\
app.use('/images', express.static(path.join(__dirname, 'images')))

// config serveur \\
app.listen(process.env.PORT, (port) =>
  console.log(`listening on port ${process.env.PORT}`)
);

// ===============ROUTE checkuser===============================================================================\\

