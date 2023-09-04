import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, trim: true },
  password: { type: String, require: true, trim: true },
  email: { type: String, require: true, trim: true },
})

const userModel = mongoose.model('users', userSchema)

export default userModel  