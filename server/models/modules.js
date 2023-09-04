import mongoose from "mongoose"

const modulesSchema = new mongoose.Schema({
  sectionName: { type: String, require: true, trim: true },
  fields: { type: Array }
})

const modulesModel = mongoose.model('modules', modulesSchema)

export default modulesModel  