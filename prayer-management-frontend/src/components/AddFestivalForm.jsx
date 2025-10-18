import { useState } from "react";

const initial = { name: "", religion: "", date: "", description: "" };

const SUGGESTED_TYPES = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Buddhist",
  "Jain",
  "Jewish",
  "Zoroastrian",
  "Baháʼí",
  "Other"
];

export default function AddFestivalForm({ onAdd }) {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid =
      form.name.trim() &&
      form.religion.trim() &&
      form.date &&
      form.description.trim(); // require description
    if (!valid) return;
    setBusy(true);
    await onAdd({
      name: form.name.trim(),
      religion: form.religion.trim(),
      date: form.date,
      description: form.description.trim()
    });
    setBusy(false);
    setForm(initial);
  };

  return (
    <form className="card add-festival" onSubmit={handleSubmit}>
      <div className="row">
        <label>
          <span>Name</span>
          <input
            name="name"
            placeholder="Festival name (e.g., Diwali, Eid, Christmas, Vaisakhi)"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Type/Religion</span>
          <input
            name="religion"
            list="festival-types"
            placeholder="Any type (e.g., Hindu, Interfaith, Cultural)"
            value={form.religion}
            onChange={handleChange}
            required
          />
          <datalist id="festival-types">
            {SUGGESTED_TYPES.map((opt) => (
              <option key={opt} value={opt} />
            ))}
          </datalist>
        </label>
        <label>
          <span>Date</span>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>Description</span>
          <input
            name="description"
            placeholder="Festival description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="actions">
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Adding..." : "Add Festival"}
        </button>
      </div>



      
    </form>
  );
}
