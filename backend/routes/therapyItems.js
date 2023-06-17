const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const TherapyItems = require('../models/TherapyItems');

// ROUTE 1: Get all the TherapyItems using - GET "/api/therapyItems/fetchtherapyitems"
router.get('/fetchtherapyitems',
    async (req, res) => {
        try {
            const therapyItems = await TherapyItems.find({});
            res.json(therapyItems);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
);

// ROUTE 2: Add TherapyItem using - POST "/api/therapyItems/addtherapyitem"
router.post('/addtherapyitem', [
    body('therapyName', 'Enter a valid description').isLength({ min: 5 }),
    body('therapyDesp', 'Enter a valid description').isLength({ min: 5 }),
    body('firstImage', 'Enter a valid description').isLength({ min: 5 }),
    body('therapyTime', 'Enter a valid description').isLength({ min: 5 }),
    body('therapyPrice', 'Enter a valid description').isLength({ min: 1 }),
    body('offerPrice', 'Enter a valid description').isLength({ min: 1 }),
    body('therapyAbout', 'Enter a valid description').isLength({ min: 5 }),
    body('secondImage', 'Enter a valid description').isLength({ min: 5 }),
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            succcess = false;
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let therapyItem = await TherapyItems.findOne({ id: req.body.id });
            if (therapyItem) {
                success = false;
                return res.status(400).json({ success, error: "Sorry! Item with this id already exist" });
            }

            therapyItem = await TherapyItems.create({
                id: req.body.id,
                therapyName: req.body.therapyName,
                therapyDesp: req.body.therapyDesp,
                firstImage: req.body.firstImage,
                therapyTime: req.body.therapyTime,
                therapyPrice: req.body.therapyPrice,
                offerPrice: req.body.offerPrice,
                therapyAbout: req.body.therapyAbout,
                secondImage: req.body.secondImage,
                therapyOffer: req.body.therapyOffer,
                therapySession: req.body.therapySession,
            });

            success = true;
            res.json("New Therapy is successfully added!!");
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }

)

// ROUTE 3: Edit the TherapyItems using - PUT "/api/therapyItems/updatetherapyitem/:id"
router.put('/updatetherapyitem/:id',
    async (req, res) => {
        const { id, therapyName, therapyDesp, firstImage, therapyTime, therapyPrice, offerPrice, therapyAbout, secondImage, therapyOffer, therapySession } = req.body;

        try {
            const newItem = {};
            if (therapyName) {
                newItem.therapyName = therapyName;
            }
            if (therapyDesp) {
                newItem.therapyDesp = therapyDesp;
            }
            if (firstImage) {
                newItem.firstImage = firstImage;
            }
            if (therapyTime) {
                newItem.therapyTime = therapyTime;
            }
            if (therapyPrice) {
                newItem.therapyPrice = therapyPrice;
            }
            if (offerPrice) {
                newItem.offerPrice = offerPrice;
            }
            if (therapyAbout) {
                newItem.therapyAbout = therapyAbout;
            }
            if (secondImage) {
                newItem.secondImage = secondImage;
            }
            if (therapyOffer) {
                newItem.therapyOffer = therapyOffer;
            }
            if (therapySession) {
                newItem.therapySession = therapySession;
            }

            let oldItem = await TherapyItems.findById(req.params.id);
            if (!oldItem) {
                res.status(404).send("Therapy not found");
            }

            oldItem = await TherapyItems.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true })
            res.json("New therapy item has been successfully updated!!");
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
)

// ROUTE 4: Delete a TherapyItem using - DELETE "/api/therapyItems/deletetherapyitem/:id"
router.delete('/deletetherapyitem/:id',
    async (req, res) => {
        try {
            let oldItem = await TherapyItems.findById(req.params.id);
            if (!oldItem) {
                res.status(404).send("Item not found");
            }

            oldItem = await TherapyItems.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Item has been deleted" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
)

module.exports = router