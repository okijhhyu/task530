import ModulesModel from "~~/server/models/modules";

export default defineEventHandler(
  async (ctx) => {
    try {
      const query = getQuery(ctx)
      let data
      if (query.sectionName) {
        data = await ModulesModel.findOne({ sectionName: query.sectionName })
        return data
      } else {
        data = await ModulesModel.find()
        return data
      }
    } catch (e) {
      console.log(e)
    }
  }
)