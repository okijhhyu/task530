import mongoose from 'mongoose';

export default defineEventHandler(
    async (ctx) => {
      // Iterate through the fields of the query and
      // build the schemaFields object

      // Define the SectionModel based on the module's sectionName
      const SectionModel =
        mongoose.models[ctx.context.params.module] ||
        mongoose.model(ctx.context.params.module,
          new mongoose.Schema({
            // Field for the section name, which should be a string and is required
            player: {type: Number, required: true},
            xod: {type: Boolean, required: true},
            kicked: {type: Boolean, required: false},
            profession: {type: Object, required: true},
            bio: {type: Object, required: true},
            health: {type: Object, required: true},
            character: {type: Object, required: true},
            hobby: {type: Object, required: true},
            phobia: {type: Object, required: true},
            fact: {type: Object, required: true},
            baggage: {type: Object, required: true},
            name: {type: String, required: false},
            action1: {type: Object, required: false},
            action2: {type: Object, required: false},
          }));
      try {
      // Find all documents in the SectionModel
        const data = await SectionModel.find().sort({ player: 1 });

        // Return the data as an object
        return {data};
      } catch (e) {
      // Handle any errors
      // that occur during the process and log them to the console
        console.log(e);
      }
    },
);
