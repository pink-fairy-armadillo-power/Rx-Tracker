import express from 'express';
import { Medication } from '../models/medications.js';

const router = express.Router();

// Get all medicines for a user
router.get('/medicines/:userId', async (req, res) => {
  try {
    const medicines = await Medication.find({ userId: req.params.userId });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
});

// Add a new medicine
router.post('/medicines/:userId', async (req, res) => {
  try {
    const medicine = await Medication.create({
      userId: req.params.userId,
      ...req.body,
    });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add medicine' });
  }
});

// Update a medicine
router.put('/medicines/:userId/:medicineId', async (req, res) => {
  try {
    const medicine = await Medication.findOneAndUpdate(
      { _id: req.params.medicineId, userId: req.params.userId },
      req.body,
      { new: true }
    );
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update medicine' });
  }
});

// Delete a medicine
router.delete('/medicines/:userId/:medicineId', async (req, res) => {
  try {
    await Medication.findOneAndDelete({
      _id: req.params.medicineId,
      userId: req.params.userId,
    });
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete medicine' });
  }
});

export default router;
