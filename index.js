// const express = require("express");
// const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// require("dotenv").config(); // Load environment variables from .env file

// const app = express();
// const port = process.env.PORT || 3000;  // Use the PORT from .env or default to 3000

// // CORS setup to allow requests from your frontend
// const corsOptions = {
//   origin: "http://localhost:5173", // Allow only this origin
//   methods: ["GET", "POST", "OPTIONS"], // Allowed methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
// };

// app.use(cors(corsOptions)); // Apply CORS globally
// app.use(express.json());

// // Use the MONGO_URI from the .env file
// const uri = process.env.MONGO_URI;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     await client.connect();

//     const db = client.db("SocialSparkDB"); // Database name
//     const joinedEventsCollection = db.collection("joinedEvents");

//     // Post a new joined event (when user joins an event)
//     app.post("/join-event", async (req, res) => {
//       const { email, eventId } = req.body;

//       if (!email || !eventId) {
//         return res.status(400).json({ message: "Email and event ID are required." });
//       }

//       const joinedEvent = {
//         email: email,
//         eventId: eventId,
//         joinedAt: new Date(),
//       };

//       try {
//         const result = await joinedEventsCollection.insertOne(joinedEvent);
//         res.status(201).json({ message: "Successfully joined the event!" });
//       } catch (error) {
//         res.status(500).json({ message: "Failed to join the event. Try again later." });
//       }
//     });

//     // Get user's joined events
//     app.get("/joined-events", async (req, res) => {
//       const email = req.query.email;

//       if (!email) {
//         return res.status(400).json({ message: "Email is required." });
//       }

//       const query = { email: email };
//       const cursor = joinedEventsCollection.find(query);
//       const result = await cursor.toArray();
//       res.status(200).json(result);
//     });

//     console.log("Connected to MongoDB!");
//   } finally {
//   }
// }

// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Social Spark Portal Server is running.");
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });


// First time commit - from previous steps
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;  // Use the PORT from .env or default to 3000

// CORS setup to allow requests from your frontend
const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  methods: ["GET", "POST", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions)); // Apply CORS globally
app.use(express.json());

// New code added: MongoDB connection setup
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// New route to handle user joining an event
app.post("/join-event", async (req, res) => {
  const { email, eventId } = req.body;

  if (!email || !eventId) {
    return res.status(400).json({ message: "Email and event ID are required." });
  }

  const joinedEvent = {
    email: email,
    eventId: eventId,
    joinedAt: new Date(),
  };

  try {
    const result = await joinedEventsCollection.insertOne(joinedEvent);
    res.status(201).json({ message: "Successfully joined the event!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to join the event. Try again later." });
  }
});

// New route to get user's joined events
app.get("/joined-events", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const query = { email: email };
  const cursor = joinedEventsCollection.find(query);
  const result = await cursor.toArray();
  res.status(200).json(result);
});
