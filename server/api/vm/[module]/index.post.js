import { readBody } from 'h3'
import mongoose from "mongoose"
import ModulesModel from "~~/server/models/modules";

export default defineEventHandler(
  async (ctx) => {
    try {
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
      console.log(SectionModel)
      const body = await readBody(ctx)
      const newModule = new SectionModel(body)
      return await newModule.save()
    } catch (e) {
      console.log(e)
    }
  }
)