const express = require("express");
const logger = require("morgan");

const app = express();


// Add logging functionality to the app
app.use(logger("short"));

// Run the server on port 3000
app.listen(3000,function(){
    console.log("Application running on port")
})