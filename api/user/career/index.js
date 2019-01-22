const { json, send } = require('micro')

const User = require('../../../models/user')
const router = require('../../../services/router')

const post = async (req, res) => {  
  try {
    const { from, till, title, body } = req.body
    const user = await User.findOneAndUpdate({ 
      _id: req.user 
    }, { 
      $push: { 
        career: {
          from, 
          till, 
          title, 
          body
    }}}, { new: true })
    send(res, 200, {
      career: user.career
    })
  } catch (error) {
    send(res, 400, {
      message: 'Error posting new career step',
      error
    })
  }
}

const patch = async (req, res) => {
  try {
    const { _id, from, till, title, body } = req.body
    const user = await User.findOneAndUpdate({ 
      _id: req.user, 
      "career._id": _id 
    }, { 
      $set: { 
        "career.$": {
          from, 
          till, 
          title, 
          body
    }}}, { new: true })
    send(res, 200, {
      career: user.career
    })
  } catch (error) {
    send(res, 400, {
      message: 'Error updating career step',
      error
    })
  }
}

const remove = async (req, res) => {
  try {
    const { _id } = req.params
    const user = await User.findOneAndUpdate({ 
      _id: req.user 
    }, { 
      $pull: { 
        career: { 
          _id 
    }}}, { new: true })
    send(res, 200, {
      career: user.career
    })
  } catch (error) {
    send(res, 400, {
      message: 'Error removing new career step',
      error
    })
  }
}

const actions = {
  POST: post,
  PATCH: patch,
  DELETE: remove
}

module.exports = async (req, res) => {
  await router(req, res, actions)
}