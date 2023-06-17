var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Sculpt__Fitness';

const fetchuser = (req, res, next) => {
    //next will call next functin. Incase of 'getuser' asynce(req,res) is the next function

    // Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (e) {
        res.send(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;