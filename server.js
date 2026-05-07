const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Server } = require("socket.io");
const User = require("./models/User");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const SECRET = "ultra_secret_key";

app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/panel");

/* ---------------- LOGIN ---------------- */
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "user not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "wrong password" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

/* ---------------- SOCKET REALTIME ---------------- */
io.on("connection", (socket) => {
    console.log("Kullanıcı bağlandı");

    // fake live data
    setInterval(() => {
        socket.emit("stats", {
            users: Math.floor(Math.random() * 1000),
            servers: Math.floor(Math.random() * 200),
            cpu: Math.floor(Math.random() * 100)
        });
    }, 2000);
});

server.listen(3000, () => {
    console.log("ULTRA SAAS ACTIVE");
});