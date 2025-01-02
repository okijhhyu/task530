import {readBody} from 'h3';
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
            kicked: {type: Boolean, required: false},
            profession: {type: Object, required: false},
            bio: {type: Object, required: false},
            health: {type: Object, required: false},
            character: {type: Object, required: false},
            hobby: {type: Object, required: false},
            phobia: {type: Object, required: false},
            fact: {type: Object, required: false},
            baggage: {type: Object, required: false},
            name: {type: String, required: false},
            action1: {type: Object, required: false},
            action2: {type: Object, required: false},
          }));
        // Read the request body
        const body = await readBody(ctx);

        // Create a new module instance using the SectionModel schema
        const newModule = new SectionModel(body);

        // Save the new module to the database
        return await newModule.save();
      } catch (e) {
      // Handle any errors
      // that occur during the process and log them to the console
        console.log(e);
      }
    },
);
