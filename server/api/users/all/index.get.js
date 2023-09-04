import UsersModel from "~~/server/models/users";

export default defineEventHandler(
  async () => {
    try {
      const result = await UsersModel.find()
      return result
    } catch (e) {
      console.log(e)
    }
  }
)