const express = require("express")
const cors = require("cors")
const {MongoClient} = require("mongodb")

const app = express()
app.use(cors())
app.use(express.json())

const url = "mongodb+srv://vedanthelwatkar:vedd2201@cluster0.dno09q6.mongodb.net/"
const client = new MongoClient(url)

app.post("/entry",async(req,res)=>{
    const db = client.db("EMS");
    const coll = db.collection("entries")
    let data = {
        id: req.body.id,
        name : req.body.name,
        sal : req.body.sal
    }
    try {
        const existingUser = await coll.findOne({ id: data.id });
        if (existingUser) {
          res.status(400).send("Duplicate Entry --> ID already exists");
        } else {
          const result = await coll.insertOne(data);
        if (result.insertedId) {
          res.status(200).send("ENTRY SAVED");
        } else {
          res.status(400).send("INVALID INPUT");
        }}
        
      } catch (err) {
        res.status(500).send("Error adding entry: " + err.message);
      }  
})

app.get("/view", (req, res) => {
  const db = client.db("EMS");
  const coll = db.collection("entries")
  
  coll.find({}).toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: "An error occurred while fetching data." });
    });
});

app.put("/update", async (req, res) => {
  const db = client.db("EMS")
  const coll = db.collection("entries")

  let data = {
    id: req.body.id,
    name: req.body.name,
    sal: req.body.sal,
  }

  try {
    const existingUser = await coll.findOne({ id: data.id })

    if (!existingUser) {
      res.status(404).send("Entry not found - ID does not exist.")
    } else {
      const result = await coll.updateOne({ id: data.id }, { $set: data })

      if (result.matchedCount && result.modifiedCount) {
        res.status(200).send("Entry updated successfully.")
      } else {
        res.status(400).send("Failed to update the entry.")
      }
    }
  } catch (err) {
    res.status(500).send("Error updating entry: " + err.message)
  }
})


app.post("/del", async (req, res) => {
  const db = client.db("EMS")
  const coll = db.collection("entries")
  const data = {
    id: req.body.id,
  };


  try {
    const exists = await coll.findOne(data);

    if (exists) {
      const deletionResult = await coll.deleteOne(data);

      if (deletionResult.deletedCount === 1) {
        res.status(200).send("ENTRY DELETED");
      } else {
        res.status(500).send("Error deleting entry");
      }
    } else {
      res.status(500).send("No entry found");
    }
  } catch (err) {
    res.status(500).send("Error deleting entry: " + err.message);
  }
});

app.get("/top", (req, res) => {
  const db = client.db("EMS");
  const coll = db.collection("entries");

  coll.find({}).sort({ salary: -1 }).limit(5).toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: "An error occurred while fetching top salaries." });
    });
});



app.listen(9999,()=>{console.log("Server ready @ 9999")})
