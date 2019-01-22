const mongoose = require('mongoose')
const { mongoUri } = require('../config')

module.exports = async (res) => {
  //need to add userSub (cognito user id) as header 
  //after verification search for user here and add its id to req.user
  const connected = await mongoose.connect(mongoUri, { useNewUrlParser: true })
  if (!connected) {
    res.end('couldnt connect to database')
  }
  return connected
}