const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//MongoDB
const mongoDB = process.env.ATLAS_URI.replace(
    "<password>",
    process.env.AdminPassword
);
mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Database Connection Established Successfully!");
    })
    .catch((err) => console.log(err));

//Routes
const authRouter = require("./routes/authRoute");

const optionChainsRouter = require("./routes/optionChainsRoute");
const searchQuoteRouter = require("./routes/searchQuoteRoute");
const getNewsRouter = require("./routes/marketNewsRoute");
const checkValidSymbolRouter = require("./routes/checkValidSymbolRoute");

app.use("/api/optionChains", optionChainsRouter);
app.use("/api/searchQuote", searchQuoteRouter);
app.use("/api/marketNews", getNewsRouter);
app.use("/api/checkSymbol", checkValidSymbolRouter);
app.use("/api/auth", authRouter);

//App
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
