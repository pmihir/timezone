const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Expire in 1 Hour");
        req.emailId = decodedToken.emailId ;
        next();
    } catch(err) {
        res.status(401).json({ message: "Authentication Failed"});
    }
}