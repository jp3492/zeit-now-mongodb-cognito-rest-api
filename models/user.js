const mongoose = require('mongoose')
const Schema = mongoose.Schema

const careerSchema = new Schema({
  from: String,
  till: String,
  title: String,
  body: String
}, { timestamps: true });

const userSchema = new Schema({
  cognitoId: {
    type: String,
    unique: true
  },
  username: String,
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  nationality: String,
  birthDate: String,
  apiKey: {
    type: String,
    default: ''
  },
  subscription: {
    type: String,
    default: 'free'
  },
  career: [careerSchema],
  email: String,
  facebook: String,
  instagram: String,
  linkedin: String,
  twitter: String,
  website: String,
  currentlyEmployed: Boolean,
  lookingForContract: Boolean,
  withAgent: Boolean
}, { timestamps: true })

const ModelClass = mongoose.model('user', userSchema)
module.exports = ModelClass
