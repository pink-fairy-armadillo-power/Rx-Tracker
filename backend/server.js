import dotenv from "dotenv";
//import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Use cookie-parser middleware to parse cookies in requests

import express from "express";
import { connectToDb } from "./config/connectToDb.js";
import { Patient } from "./models/patient.js";
import cors from "cors";
import { signup, login, logout } from "./controllers/userControllers.js";
// Load environment variables from .env file if not in production
import authenticate from "./middleware/authenticate.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Create express app
const app = express();
// Configure express app to parse JSON
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connect to the database and start the server after successful connection
connectToDb().then(() => {
  console.log("Successfully connected to the database.");

  // Routes
});

app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.get("/about", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patients." });
  }
});

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Welcome to the protected route!", user: req.user });
});
app.post("/about", async (req, res) => {
  try {
    console.log(req.body); // Log the request body to check the fields

    let { name, age, medication, date } = req.body;

    if (date === "today") {
      date = new Date(); // Convert "today" to the current date
    } else {
      date = new Date(date); // Ensure date is in a valid format
    }

    // Create a new patient document
    const patient = await Patient.create({
      name,
      age,
      medication,
      date,
    });

    res.json({
      message: `Patient ${patient.name} is ${patient.age} years old and takes ${patient.medication}.`,
      patient,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Failed to create patient." });
  }
});

/*app.post("/about", async (req, res) => {
  try {
    let { name, age, medication, date } = req.body;

    // If the date is "today", set it to the current date
    if (date === "today") {
      date = new Date(); // This will give the current date and time
    } else {
      // Ensure date is in a valid format (if it's not "today")
      date = new Date(date); // This converts the provided date string to a Date object
    }

    // Create a new patient document in the database
    const patient = await Patient.create({
      name,
      age,
      medication,
      date,
    });

    // Respond with the created patient's details
    res.json({
      message: `Patient ${patient.name} is ${patient.age} years old and takes ${patient.medication}.`,
      patient,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Failed to create patient." });
  }
});
*/
/*app.post("/about", async (req, res) => {
  try {
    // Extract patient information from the request body
    let { name, age, medication, date } = req.body;

    // If the date is "today", set it to the current date
    if (date === "today") {
      date = new Date();
    }

    // Create a new patient document in the database
    const patient = await Patient.create({
      name,
      age,
      medication,
      date,
    });

    // Respond with the created patient's details
    console.log(req.body);

    res.json({
      message: `Patient ${patient.name} is ${patient.age} years old and taking ${patient.medication}`,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Failed to create patient." });
  }
});
*/
app.delete("/about/:id", async (req, res) => {
  try {
    // Extract the patient ID from the route parameters
    const patientId = req.params.id;

    // Find the patient by ID and delete it
    const deletedPatient = await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Respond with a success message
    res.json({
      message: `Patient with ID ${patientId} has been successfully deleted.`,
    });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Failed to delete patient." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

/*import dotenv from "dotenv";
import express from "express";
import { connectToDb } from "./config/connectToDb.js";
import { Patient } from "./models/patient.js";
import cors from "cors";
import { signup, login, logout } from "./controllers/userControllers.js";
// Load environment variables from .env file if not in production
import authenticate from "./middleware/authenticate.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Create express app
const app = express();
// Configure express app to parse JSON
app.use(express.json());
app.use(cors());
// Connect to the database and start the server after successful connection
connectToDb().then(() => {
  console.log("Successfully connected to the database.");

  // Routes
});

app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.get("/about", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patients." });
  }
});

app.get("/protected", authenticate, (req, res) => {
  res.json({ message: "Welcome to the protected route!", user: req.user });
});

/*app.post("/about", async (req, res) => {
  try {
    // Extract patient information from the request body
    let { name, age, medication, date } = req.body;

    // If the date is "today", set it to the current date
    if (date === "today") {
      date = new Date();
    }

    // Create a new patient document in the database
    const patient = await Patient.create({
      name,
      age,
      medication,
      date,
    });

    // Respond with the created patient's details
    console.log(req.body);

    res.json({
      message: `Patient ${patient.name} is ${patient.age} years old and is taking ${patient.medication}. The date is ${patient.date}.`,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Failed to create patient." });
  }
});
*/
/*app.post("/about", async (req, res) => {
  try {
    // Extract patient information from the request body
    let { name, age, medication, date } = req.body;

    // If the date is "today", set it to the current date
    if (date === "today") {
      date = new Date();
    }

    // Create a new patient document in the database
    const patient = await Patient.create({
      name,
      age,
      medication,
      date,
    });

    // Respond with the created patient's details
    console.log(req.body);

    res.json({
      message: `Patient ${patient.name} is ${patient.age} years old and taking ${patient.medication}`,
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Failed to create patient." });
  }
});

app.delete("/about/:id", async (req, res) => {
  try {
    // Extract the patient ID from the route parameters
    const patientId = req.params.id;

    // Find the patient by ID and delete it
    const deletedPatient = await Patient.findByIdAndDelete(patientId);

    if (!deletedPatient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Respond with a success message
    res.json({
      message: `Patient with ID ${patientId} has been successfully deleted.`,
    });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Failed to delete patient." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
*/
