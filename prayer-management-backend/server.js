// server.js (older Festivals-only API)
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Older schemas the UI expects
const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  done: { type: Boolean, default: false }
}, { _id: false });

const FestivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  religion: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, default: "" },
  todos: { type: [TodoSchema], default: [] }
}, { timestamps: true });

const Festival = mongoose.models.Festival || mongoose.model("Festival", FestivalSchema);

// Health
app.get("/", (_req, res) => res.send("Festivals API 🕯️"));

// List festivals (sorted by date ASC)
app.get("/festivals", async (_req, res) => {
  try {
    const list = await Festival.find({}).sort({ date: 1 });
    res.json(list);
  } catch (err) {
    console.error("GET /festivals error:", err.message);
    res.status(500).json({ error: "Failed to fetch festivals" });
  }
});

// Create festival
app.post("/festivals", async (req, res) => {
  try {
    const { name, religion, date, description = "", todos = [] } = req.body;
    if (!name || !religion || !date) {
      return res.status(400).json({ error: "name, religion, and date are required" });
    }
    const created = await Festival.create({ name, religion, date, description, todos });
    res.status(201).json(created);
  } catch (err) {
    console.error("POST /festivals error:", err.message);
    res.status(400).json({ error: "Failed to create festival", details: err.message });
  }
});

// Delete festival
app.delete("/festivals/:id", async (req, res) => {
  try {
    const result = await Festival.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Festival not found" });
    res.sendStatus(204);
  } catch (err) {
    console.error("DELETE /festivals/:id error:", err.message);
    res.status(500).json({ error: "Failed to delete festival" });
  }
});

// Mongo connect & start
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
