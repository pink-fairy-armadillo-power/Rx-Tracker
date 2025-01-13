// models/medication.js
import mongoose from 'mongoose';

const medicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  MedicineName: {
    type: String,
    required: true,
  },
  Dosage: {
    type: String,
    required: true,
  },
  NumberOfPills: {
    type: String,
    required: true,
  },
  MedicalReason: {
    type: String,
    required: true,
  },
  Frequency: {
    type: String,
    required: true,
  },
  Notes: {
    type: String,
    required: true,
  },
});

export const Medication = mongoose.model('Medication', medicationSchema);
