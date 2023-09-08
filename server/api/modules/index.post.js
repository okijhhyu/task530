import ModulesModel from "~~/server/models/modules";
import { readBody } from 'h3'

export default defineEventHandler(
  async (ctx) => {
    try {
      // Read the request body using the "readBody" function
      const body = await readBody(ctx)

      // Create a new instance of ModulesModel with the request body
      const newModule = new ModulesModel(body)

      // Save the new module document to the database
      return await newModule.save()
    } catch (e) {
      // Handle any errors that occur during the process and log them to the console
      console.log(e)
    }
  }
)