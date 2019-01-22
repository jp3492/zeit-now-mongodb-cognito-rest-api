const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderSchema = new Schema({
  _uid: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: String,
  type: String,
  description: String,
  keyWords: [String],
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'project'
  }],
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'folder',
    default: null
  }
}, { timestamps: true });

const ModelClass = mongoose.model('folder', folderSchema)
module.exports = ModelClass
