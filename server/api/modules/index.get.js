import ModulesModel from "~~/server/models/modules";

export default defineEventHandler(
  async (ctx) => {
    try {
      const result = await ModulesModel.find()
      return { data: result }
    } catch (e) {
      console.log(e)
    }
  }
)