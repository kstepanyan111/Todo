const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const rootRouter = require("./routers/quote")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// simple route
app.use("/", rootRouter)
const db = require("./app/models");

const connectDB = async () => {
    try {
        await db.mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database!");
    } catch (err) {
        console.log("Cannot connect to the database!", err);
        process.exit();
    }
};
connectDB();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});