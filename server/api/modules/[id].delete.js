import ModulesModel from "~~/server/models/modules";

export default defineEventHandler(
  async (ctx) => {
    try {
      // Attempt to find a document by its ID and remove it from the ModulesModel
      const result = await ModulesModel.findByIdAndRemove(ctx.context.params.id)

      // Return the removed data as a response
      return { data: result }
    } catch (e) {
      // Handle any errors that occur during the removal process
      console.log(e)
    }
  }
)