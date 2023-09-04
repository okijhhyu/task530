import mongoose from "mongoose"
export default async () => {
  const config = useRuntimeConfig()
  try {
    const DB_OPTIONS = {
      dbName: config.dbName,
      user: config.user,
      pass: config.pass,
      authSource: config.authSource
    }
    await mongoose.connect(config.dburl, DB_OPTIONS)
    console.log('Connection successfully...')
  } catch (e) {
    console.log(e)
  }
}