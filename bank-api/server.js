const express = require("express");
const cors = require("cors");
require("dotenv").config();
const rootRouter = require("./routes/users.router.js");
const path = require("path");



const { env } = process;
const { PORT } = env;

// can be const {PORT} = process.env
// I did it to make it clearer maybe that was my bad sorry

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", rootRouter);


app.listen(PORT, () => console.log(`Server is up and running on ${PORT}`));

// I know that I did it please try to write this server alone that you will understand the process (: 


