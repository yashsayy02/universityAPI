const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const sessionRoutes = require("./routes/sessionRoutes")

dotenv.config()

connectDB()
const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/session", sessionRoutes);

const server = app.listen(process.env.PORT, console.log(`server started on port ${process.env.PORT}`));