import mongoose from "mongoose"
import ModulesModel from "~~/server/models/modules";

export default defineEventHandler(
  async (ctx) => {
    const query = await ModulesModel.findOne({ sectionName: ctx.context.params.module })
    const schemaFields = {};
    query.fields.forEach(field => {
      schemaFields[field.label] = {
        type: field.type
      };
    });
    const SectionModel =
        mongoose.models[ctx.context.params.module] ||
        mongoose.model(ctx.context.params.module  , new mongoose.Schema(schemaFields));
    try {
      const result = await SectionModel.find()
      return { data: result }
    } catch (e) {
      console.log(e)
    }
  }
)