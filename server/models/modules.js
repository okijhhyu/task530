// Import the Mongoose library for MongoDB interactions
import mongoose from 'mongoose';

// Define a Mongoose schema for the "modules" collection
const modulesSchema = new mongoose.Schema({
  // Field for the section name, which should be a string and is required
  sectionName: {type: String, required: true, trim: true},

  // Field for storing an array of fields, data structure not explicitly defined
  players: {type: Number, required: true},
  catastrophe: {type: String, required: true},
  threat: {type: String, required: true},
  bunker: {type: String, required: true}
});

// Create a Mongoose model named "modules" based on the defined schema
const modulesModel = mongoose.model('games', modulesSchema);

// Export the "modulesModel" for use in other parts of the application
export default modulesModel;
