import mongoose from "mongoose"
import ModulesModel from "~~/server/models/modules";

export default defineEventHandler(
  async (ctx) => {
    // Find the module query based on the sectionName
    const sectionValue = await ModulesModel.findOne({ sectionName: ctx.context.params.module })

    // Create an object to define schema fields
    const schemaFields = {};

    // Iterate through the fields of the query and build the schemaFields object
    sectionValue.fields.forEach(field => {
      schemaFields[field.label] = {
        type: field.type
      };
    });

    // Define the SectionModel based on the module's sectionName
    const SectionModel =
        mongoose.models[ctx.context.params.module] ||
        mongoose.model(ctx.context.params.module, new mongoose.Schema(schemaFields));

    try {
      // Find all documents in the SectionModel
      const data = await SectionModel.find()

      // Return the data as an object
      return { data }
    } catch (e) {
      // Handle any errors that occur during the process and log them to the console
      console.log(e)
    }
  }
)