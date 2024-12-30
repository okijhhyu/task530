import mongoose from 'mongoose';
import ModulesModel from '~~/server/models/modules';

export default defineEventHandler(
    async (ctx) => {
      try {

        const SectionModel =
        mongoose.models[ctx.context.params.module] ||
        mongoose.model(ctx.context.params.module,
          new mongoose.Schema({
            // Field for the section name, which should be a string and is required
            player: {type: Number, required: true},
            xod: {type: Boolean, required: true},
            profession: {type: Object, required: true},
            bio: {type: Object, required: true},
            health: {type: Object, required: true},
            character: {type: Object, required: true},
            hobby: {type: Object, required: true},
            phobia: {type: Object, required: true},
            fact: {type: Object, required: true},
            baggage: {type: Object, required: true},
            name: {type: String, required: false},
          }));
        // Find and remove a document by its ID
        return await SectionModel.findByIdAndRemove(ctx.context.params.id);
      } catch (e) {
      // Handle any errors
      // that occur during the process and log them to the console
        console.log(e);
      }
    },
);
