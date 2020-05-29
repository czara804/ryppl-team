const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const userRouter = require("./routes/user_routes")
const dropRouter = require("./routes/drop_routes")
// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.port || 3030;

// Equivalant of create server in http library
const app = express();

// Call the middleware we want to use
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const dbConn = process.env.MONGODB_URI //|| "mongodb://localhost/ryppl"
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

// Listen
app.listen(port, () => console.log(`Listening on port ${port}.`));