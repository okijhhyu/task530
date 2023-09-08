// Import the Mongoose library for MongoDB interactions
import mongoose from 'mongoose';

// Define an asynchronous function for database connection setup
export default async () => {
  // Retrieve configuration data using useRuntimeConfig
  const config = useRuntimeConfig();

  try {
    // Define database connection options
    const DB_OPTIONS = {
      dbName: config.dbName,
      user: config.user,
      pass: config.pass,
      authSource: config.authSource,
    };

    // Attempt to connect to the MongoDB database
    // using the provided URL and options
    await mongoose.connect(config.dburl, DB_OPTIONS);

    // Log a success message if the connection is established
    console.log('Connection successfully...');
  } catch (e) {
    // Log any errors that occur during the connection attempt
    console.log(e);
  }
};
