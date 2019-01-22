const { send } = require('micro')

const User = require('../../models/user')
const Folder = require('../../models/folder')
const router = require('../../services/router')

const patch = async (req, res) => { 
  try {
    const _id = req.user
    const newUser = await User.findOneAndUpdate({ 
      _id 
    }, { 
      ...req.body 
    }, { new: true })
    send(res, 200, newUser)
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt update user',
      error
    })
  }
}

const post = async (req, res) => {  
  try {
    const { cognitoid, email } = req.body
    const newUser = new User({
      cognitoId: cognitoid,
      email
    })
    await newUser.save()
    send(res, 200, {newUser})
  } catch (error) {
    send(res, 400, {
      message: {
        text: 'Couldnt create new user',
        headers: req.headers,
        body: req.body
      },
      error      
    })
  } 
}

const get = async (req, res) => {
  try {
    const thisUser = await User.findById(req.user)
    const folders = await Folder.find({ _uid: thisUser._id })
    send(res, 200, {
      user: thisUser,
      folders
    })
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt get user',
      id: req.user,
      error
    })
  } 
}

const actions = {
  POST: post,
  GET: get,
  PATCH: patch
}

module.exports = async (req, res) => {
  await router(req, res, actions)
}