import { Router } from 'express'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const userSchema = new Mongoose.Schema({
  name: 'string',
  uri: 'string',
  id: 'string',
  friends: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  pw: 'string',
  email: 'string',

  queues: [{
    to: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
    from: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: 'string',
    hasBeenExported: 'bool',
    tracks: [{
      name: 'string',
      artist: [{ name: 'string', uri: 'string', id: 'string' }],
      uri: 'string',
      id: 'string'
    }],
  }]

})

export const User = Mongoose.model('User', userSchema)
module.exports = User
// export const Connect = async () => {
//   try {
//     Mongoose.connect(process.env.MONGO_URI as string)
//     console.log(`connected to db`)
//   } catch (err) {
//     console.error(err)
//   }
// }
export const connectDB = async () => {
  try {
    await Mongoose.connect(process.env.MONGO_URI as string)
    console.log('MongoDB connected');
  } catch (err: any) {
    console.error(err.message);
    // process.exit(1);
  }
}

module.exports = { connectDB, User };
