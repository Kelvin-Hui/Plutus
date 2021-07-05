const express = require("express");
const cors = require("cors");
// const mongoose = require('mongoose');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri , {useNewUrlParser: true , useCreateIndex:true});
// const connection = mongoose.connection;
// connection.once('open',()=>{
//     console.log("MongoDB database connection established successfully");
// })

//Routes
const optionChainsRouter = require("./routes/optionChainsRoute");
const searchQuoteRouter = require("./routes/searchQuoteRoute");
const getNewsRouter = require("./routes/marketNewsRoute");
const checkValidSymbolRouter = require("./routes/checkValidSymbolRoute");

app.use("/api/optionChains", optionChainsRouter);
app.use("/api/searchQuote", searchQuoteRouter);
app.use("/api/marketNews", getNewsRouter);
app.use("/api/checkSymbol", checkValidSymbolRouter);

//App
app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});
