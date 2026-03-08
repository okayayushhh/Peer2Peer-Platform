const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db;

async function connectDB() {
    await client.connect();
    db = client.db("booking_database");
    console.log("MongoDB Connected");
}

connectDB();

app.get("/", (req, res) => {
    res.send("Peer Mentoring Backend Running");
});

app.get("/peer-mentors", async (req, res) => {

    const mentors = await db.collection("peer_mentors").find().toArray();

    res.json(mentors);

});

app.post("/book-peer-session", async (req, res) => {

    console.log("Request body:", req.body);

    if (!req.body) {
        return res.json({ message: "No request body received" });
    }

    const { student_id, mentor_id, slot } = req.body;

    const mentor = await db.collection("peer_mentors")
        .findOne({ mentor_id: mentor_id });

    if (!mentor) {
        return res.json({ message: "Mentor not found" });
    }

    const result = await db.collection("peer_mentors").updateOne(
        { mentor_id: mentor_id, available_slots: slot },
        { $pull: { available_slots: slot } }
    );

    if (result.modifiedCount === 0) {
        return res.json({ message: "Slot already booked or unavailable" });
    }

    await db.collection("sessions").insertOne({
        student_id,
        mentor_id,
        mentor_type: "peer",
        slot,
        status: "booked"
    });

    res.json({ message: "Session booked successfully" });

});

app.get("/student-sessions/:student_id", async (req, res) => {

    const { student_id } = req.params;

    const sessions = await db.collection("sessions")
        .find({ student_id: student_id })
        .toArray();

    res.json(sessions);

});

app.get("/mentor-sessions/:mentor_id", async (req, res) => {

    const { mentor_id } = req.params;

    const sessions = await db.collection("sessions")
        .find({ mentor_id: mentor_id })
        .toArray();

    res.json(sessions);

});

app.delete("/cancel-session/:session_id", async (req, res) => {

    const { session_id } = req.params;

    await db.collection("sessions").deleteOne({ _id: session_id });

    res.json({ message: "Session cancelled" });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});