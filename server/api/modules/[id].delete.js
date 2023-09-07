import ModulesModel from "~~/server/models/modules";

export default defineEventHandler(
  async (ctx) => {
    try {
      const result = await ModulesModel.findByIdAndRemove(ctx.context.params.id)
      return { data: result }
    } catch (e) {
      console.log(e)
    }
  }
)