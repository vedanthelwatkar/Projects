const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');

const JWT_SECRET = 'Sculpt__Fitness';
// JWTWebToken is used for security purpose. It assigns a token everytime when a user logins, it ensures that user is shown his/her data only and that user cannot manipulate his credentials to see others data.
let refreshTokens = []

const generateAccessToken = (data) => {
    return jwt.sign(
        data,
        JWT_SECRET,
        { expiresIn: '30s' }
        // using expiresIn is more secured but whenever token expires user has to login again, therefore we create refresh token which will automatically recreate access token once it expires
    )
}

const generateRefreshToken = (data) => {
    return jwt.sign(
        data,
        JWT_SECRET
    )
}

// Refresh Token generation
router.post("/refresh",
    async (req, res) => {
        // take refresh token from user
        const refreshToken = req.body.token;
        const email = req.body.email;
        let user = await User.findOne({ email });

        const data = {
            user: {
                id: user.id
            }
        }

        // sent error if there is no token or it is invalid
        if (!refreshToken) return res.status(401).json("You are not authenticated!");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }

        jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
            err && console.log(err);
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            const newAuthToken = generateAccessToken(data);
            const newRefreshToken = generateRefreshToken(data);

            refreshTokens.push(newRefreshToken);

            res.status(200).json({
                newAuthToken,
                newRefreshToken
            })
        })

        // if everything is okay, create new access token, refresh token and send to user
    })

// ROUTE 1: Create a User using : POST "/api/auth/createuser". Doesn't require Auth(authentication). No Login required
router.post('/createuser', [
    body('firstName', 'Enter a valid first name').isLength({ min: 3 }),
    body('lastName', 'Enter a valid last name').isLength({ min: 3 }),
    body('number', 'Enter a valid phone number').isNumeric({ min: 10, max: 10 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 character long').isLength({ min: 5 }),
],
    async (req, res) => {
        let success = false;
        // If there are errors return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            succcess = false;
            return res.status(400).json({ success, errors: errors.array() });
        }
        // console.log(req.body);
        // const user = User(req.body); --> To create a new user
        // user.save();

        // User.create({
        //     name: req.body.name,
        //     password: req.body.password,
        //     email: req.body.email
        // }).then(user => res.json(user)).
        //     catch(err => {console.log(err)
        //     res.json({error: 'Enter valid credentials', message:err.message })});

        try {
            // Check whether user with given email exist already
            let user = await User.findOne({ email: req.body.email }); //NOTE: We use await only when we use a ascynchronous functions i.e callbacks or promises. Here findOne returns a callback
            if (user) {
                success = false;
                return res.status(400).json({ success, error: "Sorry! User with this email already exist" });
            }

            const salt = await bcrypt.genSalt(10); //genSalt is asynchronous
            const secPass = await bcrypt.hash(req.body.password, salt); // bcrypt is asynchronous

            // Create a new user
            user = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                number: req.body.number,
                email: req.body.email,
                password: secPass
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            // It creates a jwt token
            // const authToken = jwt.sign(data, JWT_SECRET);
            const newAuthToken = generateAccessToken(data);
            const newRefreshToken = generateRefreshToken(data);
            refreshTokens.push(newRefreshToken);

            success = true;
            res.json({ success, newAuthToken, newRefreshToken, email });
            // .then(user => res.json(user))
            // .catch(err => console.log(err));
            // res.json({ error: 'This email is already registered, please use new email' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    })

// ROUTE 2: Authenticate a User using : POST "/api/auth/login". No Login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],
    async (req, res) => {
        let success = false;
        // If there are errors return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                success = false;
                return res.status(400).json({ success, error: "Please try to login with correct credentials email" });
            }

            const passwordComp = await bcrypt.compare(password, user.password);
            if (!passwordComp) {
                success = false;
                return res.status(400).json({ success, error: "Please try to login with correct credentials password" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            // It creates a jwt token
            // const authToken = jwt.sign(data, JWT_SECRET);
            const newAuthToken = generateAccessToken(data);
            const newRefreshToken = generateRefreshToken(data);
            refreshTokens.push(newRefreshToken);

            success = true;
            res.json({ success, newAuthToken, newRefreshToken, email });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

// ROUTE 3: Get loged in User Details using- POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
    // Middleware is a function which will called whenever a request using routes that require login occur
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}
);

// ROUTE 4: Logout using- POST "/api/auth/logout". Login required
router.post("/logout", fetchuser, (req, res) => {
    try {
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        res.status(200).json("You logged out successfully");
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
