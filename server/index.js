require("dotenv").config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = Number(process.env.SERVER_PORT || process.env.PORT || 5000);

mongoose.set("strictQuery", true);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const childSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    email: { type: String, required: true, trim: true, lowercase: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Child = mongoose.model("Child", childSchema);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

function validId(id) {
  return mongoose.isValidObjectId(id);
}

function wantsJson(req) {
  return req.is("application/json") || req.accepts(["html", "json"]) === "json";
}

function sendError(req, res, status, message) {
  if (wantsJson(req)) return res.status(status).json({ success: false, message });
  return res.status(status).render("error", { status, message });
}

function cleanRequired(body, fields) {
  const data = {};
  for (const field of fields) {
    const value = body[field];
    if (value === undefined || String(value).trim() === "") {
      return { error: `${field} is required.` };
    }
    data[field] = String(value).trim();
  }
  return { data };
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", port, app: "RV University BCA Department API" });
});

app.post("/api/inquiries", (req, res) => {
  const { name, email, phone, program, year, message } = req.body;
  console.log("New BCA admission inquiry received:", { name, email, phone, program, year, message });
  res.status(201).json({
    success: true,
    message: "Inquiry received successfully. An academic advisor will contact you shortly."
  });
});

app.get("/", async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render("users", { users, message: null });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { status: 500, message: "Could not load users." });
  }
});

app.get("/users", async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.render("users", { users, message: null });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { status: 500, message: "Could not load users." });
  }
});

app.get("/users/search/:name", async (req, res) => {
  try {
    const users = await User.find({ firstName: { $regex: req.params.name, $options: "i" } }).sort({ firstName: 1 });
    if (wantsJson(req)) return res.json({ success: true, users });
    res.render("users", { users, message: `Search results for “${req.params.name}”.` });
  } catch (error) {
    console.error(error);
    sendError(req, res, 500, "Could not search users.");
  }
});

app.post("/users", async (req, res) => {
  const parsed = cleanRequired(req.body, ["firstName", "lastName", "email", "phone"]);
  if (parsed.error) return sendError(req, res, 400, parsed.error);
  try {
    const user = await User.create(parsed.data);
    if (wantsJson(req)) return res.status(201).json({ success: true, message: "User created successfully.", user });
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") return sendError(req, res, 400, error.message);
    sendError(req, res, 500, "Could not create user.");
  }
});

app.get("/users/:id/children/count", async (req, res) => {
  if (!validId(req.params.id)) return sendError(req, res, 400, "Invalid user ID.");
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendError(req, res, 404, "User not found.");
    const count = await Child.countDocuments({ parentId: user._id });
    res.json({ success: true, count });
  } catch (error) {
    console.error(error);
    sendError(req, res, 500, "Could not count children.");
  }
});

// Keep the literal "new" route before the dynamic :childId route below.
app.get("/users/:id/children/new", async (req, res) => {
  if (!validId(req.params.id)) return sendError(req, res, 400, "Invalid user ID.");
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendError(req, res, 404, "User not found.");
    res.render("add-child", { user, error: null });
  } catch (error) {
    console.error(error);
    sendError(req, res, 500, "Could not open child form.");
  }
});

app.get("/users/:id/children/:childId", async (req, res) => {
  const { id, childId } = req.params;
  if (!validId(id) || !validId(childId)) return sendError(req, res, 400, "Invalid user or child ID.");
  try {
    const user = await User.findById(id);
    if (!user) return sendError(req, res, 404, "User not found.");
    const child = await Child.findOne({ _id: childId, parentId: user._id });
    if (!child) return sendError(req, res, 404, "Child not found for this user.");
    res.render("child", { user, child });
  } catch (error) {
    console.error(error);
    sendError(req, res, 500, "Could not load child.");
  }
});

app.get("/users/:id/children", async (req, res) => {
  if (!validId(req.params.id)) return sendError(req, res, 400, "Invalid user ID.");
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendError(req, res, 404, "User not found.");
    const children = await Child.find({ parentId: user._id }).sort({ firstName: 1 });
    if (wantsJson(req)) return res.json({ success: true, children });
    res.render("profile", { user, children });
  } catch (error) {
    console.error(error);
    sendError(req, res, 500, "Could not load children.");
  }
});

app.get("/users/:id", async (req, res) => {
  if (!validId(req.params.id)) return sendError(req, res, 404, "User not found.");
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendError(req, res, 404, "User not found.");
    const children = await Child.find({ parentId: user._id }).sort({ firstName: 1 });
    res.render("profile", { user, children });
  } catch (error) {
    console.error(error);
    sendError(req, res, 500, "Could not load user profile.");
  }
});

app.post("/users/:id/children", async (req, res) => {
  if (!validId(req.params.id)) return sendError(req, res, 400, "Invalid user ID.");
  const parsed = cleanRequired(req.body, ["firstName", "lastName", "age", "email"]);
  if (parsed.error) return sendError(req, res, 400, parsed.error);
  const age = Number(parsed.data.age);
  if (!Number.isInteger(age) || age < 0) return sendError(req, res, 400, "Age must be a non-negative whole number.");
  try {
    const user = await User.findById(req.params.id);
    if (!user) return sendError(req, res, 404, "User not found.");
    const child = await Child.create({ ...parsed.data, age, parentId: user._id });
    if (wantsJson(req)) return res.status(201).json({ success: true, message: "Child added successfully.", child });
    res.redirect(`/users/${user._id}`);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") return sendError(req, res, 400, error.message);
    sendError(req, res, 500, "Could not add child.");
  }
});

app.patch("/children/:id", async (req, res) => {
  if (!validId(req.params.id)) return sendError(req, res, 400, "Invalid child ID.");
  const allowed = ["firstName", "lastName", "age", "email"];
  const updates = {};
  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      const value = String(req.body[field]).trim();
      if (!value) return sendError(req, res, 400, `${field} cannot be empty.`);
      updates[field] = field === "age" ? Number(value) : value;
    }
  }
  if (Object.keys(updates).length === 0) return sendError(req, res, 400, "Provide at least one child field to update.");
  if (updates.age !== undefined && (!Number.isInteger(updates.age) || updates.age < 0)) {
    return sendError(req, res, 400, "Age must be a non-negative whole number.");
  }
  try {
    const child = await Child.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!child) return sendError(req, res, 404, "Child not found.");
    res.json({ success: true, message: "Child updated successfully.", child });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError" || error.name === "CastError") return sendError(req, res, 400, error.message);
    sendError(req, res, 500, "Could not update child.");
  }
});

app.delete("/children/:id", async (req, res) => {
  if (!validId(req.params.id)) return sendError(req, res, 400, "Invalid child ID.");
  try {
    const child = await Child.findByIdAndDelete(req.params.id);
    if (!child) return sendError(req, res, 404, "Child not found.");
    res.json({ success: true, message: "Child deleted successfully." });
  } catch (error) {
    console.error(error);
    sendError(req, res, 500, "Could not delete child.");
  }
});

app.use((_req, res) => res.status(404).render("error", { status: 404, message: "Page not found." }));

app.use((error, _req, res, _next) => {
  console.error(error);
  if (res.headersSent) return;
  res.status(500).render("error", { status: 500, message: "An unexpected server error occurred." });
});

if (!process.env.MONGODB_URL) {
  console.log(`Starting RV University BCA API server without MongoDB on http://localhost:${port}`);
  app.listen(port, () => console.log(`RV University BCA server listening on http://localhost:${port}`));
} else {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => app.listen(port, () => console.log(`RV University BCA server listening with MongoDB on http://localhost:${port}`)))
    .catch((error) => {
      console.warn(`MongoDB connection skipped (${error.message}). Starting server in standalone mode on port ${port}...`);
      app.listen(port, () => console.log(`RV University BCA server listening on http://localhost:${port}`));
    });
}
