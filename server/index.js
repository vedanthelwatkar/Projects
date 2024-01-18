const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const Mongourl = process.env.MONGO;
const client = new MongoClient(Mongourl);
const db = client.db("company");
const coll = db.collection("data");

app.get("/", async (req, res) => {
  try {
    const url = process.env.DATA;
    const response = await axios.get(url);
    res.status(201).send(response.data);
  } catch (err) {
    res.status(500).send("Internal server erorr");
    console.error("Error occured", err);
  }
});

app.post("/mongo", async (req, res) => {
  try {
    const url = process.env.DATA;
    const response = await axios.get(url);
    const newData = response.data;

    await db.dropCollection("data").catch(() => {});
    await db.createCollection("data");

    await coll.insertMany(newData);
    res.status(201).json({ message: "Data added successfully" });
  } catch (err) {
    res.status(500).send("Internal server erorr");
    console.error("Error occured", err);
  }
});

app.use("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const month = req.body.month;
    try {
      let queryCheck = { title: { $regex: query, $options: "i" } };
      if (month) {
        queryCheck.$and = [
          {
            $expr: {
              $eq: [{ $month: { $toDate: "$dateOfSale" } }, parseInt(month)],
            },
          },
        ];
      }
      const data = await coll.find(queryCheck).limit(40).toArray();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    res.status(500).send("Internal server erorr");
    console.error("Error occured", err);
  }
});

app.post("/dropdown", async (req, res) => {
  const month = req.body.month;
  const saleData = await coll
    .find({
      $expr: {
        $eq: [{ $month: { $toDate: "$dateOfSale" } }, parseInt(month)],
      },
    })
    .toArray();
  const totalSale = saleData.reduce((total, item) => total + item.price, 0);
  const totalSoldItems = saleData.filter((item) => item.sold).length;
  const totalNotSoldItems = saleData.filter((item) => !item.sold).length;

  const data = {
    sale: totalSale,
    itemsale: totalSoldItems,
    nosale: totalNotSoldItems,
    message: saleData,
  };
  res.status(200).send(data);
});

app.post("/chartData", async (req, res) => {
  const month = req.body.month;
  const saleData = await coll
    .find({
      $expr: {
        $eq: [{ $month: { $toDate: "$dateOfSale" } }, parseInt(month)],
      },
    })
    .toArray();
  const prices = saleData.map((item) => item.price);

  console.log(prices);
  res.json(prices);
});

app.get("/allChartData", async (req, res) => {
  try {
    const allSaleData = await coll.find({}).toArray();

    const allPrices = allSaleData.map((item) => item.price);

    console.log(allPrices);
    res.json(allPrices);
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/pieChart", async (req, res) => {
  try {
    const month = req.query.q;
    const saleData = await coll
      .find({
        $expr: {
          $eq: [{ $month: { $toDate: "$dateOfSale" } }, parseInt(month)],
        },
      })
      .toArray();

    const categoryCount = {};
    saleData.forEach((item) => {
      const category = item.price;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    res.json(categoryCount);
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/combinedData", async (req, res) => {
  try {
    const response1 = await axios.get("http://localhost:8000/allChartData");
    const response2 = await axios.get("http://localhost:8000/");
    const combinedResponse = {
      Prices: response1.data,
      Sold: response2.data.map((item) => item.sold),
      Category: response2.data.map((item) => item.category),
    };

    res.json(combinedResponse);
  } catch (error) {
    console.error("Error occurred", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(8000, () => {
  console.log("Server Ready @ 8000");
});
