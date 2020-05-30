const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const userRouter = require("./routes/user_routes")
const dropRouter = require("./routes/drop_routes")
const authRouter = require("./routes/auth_routes")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.port || 3030;

// Equivalent of create server in http library
const app = express();
app.use(cors());
// const whitelist = ['http://127.0.0.1:5500/']
// app.use(cors({
//     credentials: true,
//     origin: function (origin,callback) {
//         // Check each url in whitelist and see if it includes the origin (instead of matching exact string)
//         const whitelistIndex = whitelist.findIndex((url) => url.includes(origin))
// 		console.log("found whitelistIndex", whitelistIndex)
//         callback(null,whitelistIndex > -1)
//     }
// }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
    }

app.use(session({
    // resave and saveUninitialized set to false for deprecation warnings
        secret: "Express is awesome",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1800000
        },
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    }));


require("./config/passport")
app.use(passport.initialize())
app.use(passport.session())


const dbConn = process.env.MONGODB_URI || "mongodb://localhost/ryppl"
console.log(dbConn)
mongoose.connect(dbConn,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    },
    err => {
        if (err) {
            console.log("Error connecting to database", err)
        } else {
            console.log("Connected to database!", dbConn)
        }
    }
)

// app.use("/user", userRouter)
app.use("/drops", dropRouter)
// Define a simple route for GET
app.get("/",(req,res) => {
    res.send("Hi from your Express Server.")
});

app.use("/auth", authRouter)
// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));