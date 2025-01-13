import mongoose from 'mongoose';

async function connectToDb() {
  try {
    const uri = process.env.MONGO_URI;
    console.log('Connecting to database with URI:', uri); // Add this to debug
    await mongoose.connect(uri);
    console.log('Successfully connected to database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

export { connectToDb };
