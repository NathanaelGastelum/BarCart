const express = require("express");
require("dotenv").config();
const connectDB = require('./db/db');
const port = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/recipes", require("./routes/recipeRoutes"));

app.listen(port, () => {
  // perform a database connection when server starts
//   dbo.connectToServer(function (err) {
//     if (err) console.error(err);

//   });
  console.log(`Server is running on port: ${port}`);
});