const { send } = require('micro')

const Project = require('../../models/project')
const router = require('../../services/router')

const post = async (req, res) => {  
  try {
    const project = new Project({
      _uid: req.user,
      ...req.body
    })
    await project.save()
    send(res, 200, project)
  } catch (error) {
    send(res, 400, {
      message: {
        text: 'Couldnt create new project',
        headers: req.headers,
        body: req.body
      },
      error      
    })
  } 
}

const get = async (req, res) => {
  try {
    const { ids } = req.body
    const projects = await Project.find({ 
      _id: { 
        $in: ids 
      } 
    })
    send(res, 200, projects)
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt get projects',
      id: req.user,
      error
    })
  } 
}

const patch = async (req, res) => {  
  try {
    const { _id, ...props } = req.body
    const project = await Project.findOneAndUpdate({ 
      _id 
    }, {
      ...props
    }, { new: true })
    send(res, 200, project)
  } catch (error) {
    send(res, 400, {
      message: {
        text: 'Couldnt patch project',
        headers: req.headers,
        body: req.body
      },
      error      
    })
  } 
}

const remove = async (req, res) => { 
  try {
    await Project.remove({ 
      _id: req.body._id 
    })
    send(res, 200, req.body._id)
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt remove project',
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

module.exports = async (req, res) => {
  await router(req, res, actions)
}