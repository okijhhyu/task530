import ModulesModel from "~~/server/models/modules";
import { readBody } from 'h3'

export default defineEventHandler(
  async (ctx) => {
    try {
      const body = await readBody(ctx)
      const result = await ModulesModel.find()
      return { data: result}
    } catch (e) {
      console.log(e)
    }
  }
)