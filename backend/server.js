const express = require("express");

const app = express();

const dotenv = require("dotenv");
const { chats } = require("./data/data");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

const mongoose = require("mongoose");

async function connectDB() {
    try {
        const connection = await mongoose.connect(
            "mongodb+srv://sammidigiridhar:1$=SeventyRupees@cluster0.ktb6zi2.mongodb.net/?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
    } catch (err) {
        console.log(`Error: ${err.message}`.red.bold);
    } finally {
        console.log("connected to mongoDB".green.bold);
    }
}
connectDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

// this is to intercept every request of json type: (body parser)
app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is your server");
});

app.get("/api/chat/:id", (req, res) => {
    // console.log(req.params.id);
    const singleChat = chats.find((chat) => chat._id == req.params.id);
    res.send(singleChat);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

/***********for page errors */
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});
app.use((err, req, res, next) => {
    res.status(res.statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
});

app.listen(process.env.PORT || 3030, console.log(`this is my server`));
