/*import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  medication: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Patient = mongoose.model("Patient", patientSchema);
export { Patient };
*/

import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  medication: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export const Patient = mongoose.model("Patient", patientSchema);
