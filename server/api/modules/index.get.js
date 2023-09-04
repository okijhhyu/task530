import ModulesModel from "~~/server/models/modules";

export default defineEventHandler(
  async (ctx) => {
    try {
      const result = await ModulesModel.find({published: true})
      return { result, ctx }
    } catch (e) {
      console.log(e)
    }
  }
)