const jwt = require("jsonwebtoken");

const SECRET = "super_secret_key_123";

function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) return res.status(401).send("Yetkisiz");

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send("Geçersiz token");
    }
}

module.exports = auth;