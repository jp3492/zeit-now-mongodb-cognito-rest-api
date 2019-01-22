const { json, send } = require('micro')
const cors = require('micro-cors')()

const Folder = require('../../models/folder')
const router = require('../../services/router')

const get = async (req, res) => {
  try {
    const folders = await Folder.find({ _uid: req.user })
    send(res, 200, folders)
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt get folders',
      error
    })
  }
}

const remove = async (req, res) => {
  try {
    const _id = req.params
  	await Folder.remove({ _id })
    send(res, 200, _id)
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt remove folder',
      error
    })
  } 
}

const patch = async (req, res) => {
  try {
    const { name, folder, _id } = req.body
    const newFolder = await Folder.findOneAndUpdate({ _id }, { 
      name, 
      folder 
    }, { new: true })
    send(res, 200, newFolder)
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt update folder',
      error
    })
  } 
}

const post = async (req, res) => {
  try {
    const { name, folder, type } = req.body
    const newFolder = new Folder({
      _uid: req.user,
      name, 
      folder,
      type
    }) 
    await newFolder.save()
    send(res, 200, newFolder)
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt create folder',
      error
    })
  } 
}

const actions = {
  POST: post,
  GET: get,
  PATCH: patch,
  DELETE: remove
}

module.exports = cors(async (req, res) => {
  await router(req, res, actions)
})