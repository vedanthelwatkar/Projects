const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const CareItems = require('../models/CareItems');

// ROUTE 1: Get all the CareItems using - GET "/api/careItems/fetchcareitems"
router.get('/fetchcareitems',
    async (req, res) => {
        try {
            const careItems = await CareItems.find({});
            res.json(careItems);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
);

// ROUTE 2: Add CareItem using - POST "/api/careItems/addcareitem"
router.post('/addcareitem', [
    body('testName', "Enter a valid test name").isLength({ min: 3 }),
    body('testDesc', "Enter a valid test description").isLength({ min: 3 }),
    body('mainImageURL', "Enter a valid test main Image").isLength({ min: 3 }),
    body('fullImageURL', "Enter a valid test full Image").isLength({ min: 3 }),
    body('price', "Enter a valid test price").isLength({ min: 3 }),
    body('offerPrice', "Enter a valid test offer Price").isLength({ min: 3 }),
    body('noOfTests', "Enter a valid test no tests").isLength({ min: 3 }),
    body('reportTime', "Enter a valid test time").isLength({ min: 3 })
],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            succcess = false;
            return res.status(400).json({ success, errors: errors.array() });
        }

        try {
            let careItem = await CareItems.findOne({ id: req.body.id });
            //NOTE: We use await only when we use a ascynchronous functions i.e callbacks or promises. Here findOne returns a callback
            if (careItem) {
                success = false;
                return res.status(400).json({ success, error: "Sorry! Item with this id already exist" });
            }

            careItem = await CareItems.create({
                id: req.body.id,
                testName: req.body.testName,
                testDesc: req.body.testDesc,
                mainImageURL: req.body.mainImageURL,
                fullImageURL: req.body.fullImageURL,
                price: req.body.price,
                offerPrice: req.body.offerPrice,
                noOfTests: req.body.noOfTests,
                reportTime: req.body.reportTime,
                testsInclude: req.body.testsInclude
            });

            success = true;
            res.json({ success });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }

)

// ROUTE 3: Edit the CareItems using - PUT "/api/careItems/updatecareitem/:id"
router.put('/updatecareitem/:id',
    async (req, res) => {
        const { testName, testDesc, mainImageURL, fullImageURL, price, offerPrice, noOfTests, reportTime, testsInclude } = req.body;

        try {
            const newItem = {};
            if (testName) {
                newItem.testName = testName;
            }
            if (testDesc) {
                newItem.testDesc = testDesc;
            }
            if (mainImageURL) {
                newItem.mainImageURL = mainImageURL;
            }
            if (fullImageURL) {
                newItem.fullImageURL = fullImageURL;
            }
            if (price) {
                newItem.price = price;
            }
            if (offerPrice) {
                newItem.offerPrice = offerPrice;
            }
            if (noOfTests) {
                newItem.noOfTests = noOfTests;
            }
            if (reportTime) {
                newItem.reportTime = reportTime;
            }
            if (testsInclude) {
                newItem.testsInclude = testsInclude;
            }

            let oldItem = await CareItems.findById(req.params.id);
            if (!oldItem) {
                res.status(404).send("Item not found");
            }

            oldItem = await CareItems.findByIdAndUpdate(req.params.id, { $set: newItem }, { new: true })
            res.json("Item has been successfully updated!!");
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
)

// ROUTE 4: Delete a CareItem using - DELETE "/api/careItems/deletecareitem/:id"
router.delete('/deletecareitem/:id',
    async (req, res) => {
        try {
            let oldItem = await CareItems.findById(req.params.id);
            if (!oldItem) {
                res.status(404).send("Item not found");
            }

            oldItem = await CareItems.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Item has been deleted" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some error occured");
        }
    }
)


module.exports = router