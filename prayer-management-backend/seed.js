// prayer-management-backend/seed.js
require("dotenv").config();
const mongoose = require("mongoose");

// Import the model by defining the same schema or by requiring server after connecting.
// Easiest: require server to register the model, then use mongoose.model.
const app = require("./server"); // registers schemas/routes

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const PrayerEvent = mongoose.model("PrayerEvent");

    await PrayerEvent.deleteMany({});

    await PrayerEvent.create([
      {
        title: "Diwali Aarti",
        religion: "Hindu",
        date: new Date("2025-10-20T18:00:00Z"),
        venue: "Community Hall",
        description: "Evening aarti and prasad distribution.",
        devotees: [
          { name: "Aarav", email: "aarav@example.com", rsvp: "Yes" },
          { name: "Meera", email: "meera@example.com", rsvp: "Maybe" }
        ],
        seva: [
          { text: "Flowers", assignee: "Aarav" },
          { text: "Prasad", assignee: "Meera" }
        ]
      },
      {
        title: "Eid al‑Fitr Prayer",
        religion: "Muslim",
        date: new Date("2025-03-31T06:30:00Z"),
        venue: "Main Masjid",
        description: "Morning namaz and community meet."
      },
      {
        title: "Christmas Mass",
        religion: "Christian",
        date: new Date("2025-12-25T09:00:00Z"),
        venue: "St. Mary’s Church",
        description: "Mass and carols."
      }
    ]);

    console.log("✅ Seeded prayer events.");
    process.exit(0);
  } catch (e) {
    console.error("❌ Seed error:", e.message);
    process.exit(1);
  }
};

run();
