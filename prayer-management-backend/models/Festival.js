// models/Festival.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { _id: false }
);

const FestivalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    religion: { type: String, required: true },
    date: { type: Date, required: true },
    todos: { type: [TodoSchema], default: [] }, // NEW
  },
  { timestamps: true }
);

module.exports = mongoose.models.Festival || mongoose.model("Festival", FestivalSchema);
