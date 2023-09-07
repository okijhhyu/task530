import ModulesModel from "~~/server/models/modules";
import { readBody } from 'h3'

export default defineEventHandler(
  async (ctx) => {
    try {
      const body = await readBody(ctx)
      const newModule = new ModulesModel(body)
      return await newModule.save()
    } catch (e) {
      console.log(e)
    }
  }
)