const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema({
  link: Number,
  start: Number,
  stop: Number,
  code: String
})

const projectSchema = new Schema({
  _uid: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: String,
  description: String,
  keyWords: [String],
  links: [String],
  public: {
    type: Boolean,
    default: true
  },
  access: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  tags: [tagSchema],
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'folder'
  }
}, { timestamps: true });

const ModelClass = mongoose.model('project', projectSchema)
module.exports = ModelClass
