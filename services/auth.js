const Verifier = require('verify-cognito-token')
const { send, json } = require('micro')
const User = require('../models/user')

const { cognitoPool } = require('../config')

const params = {
  region: 'eu-west-1',
  userPoolId: cognitoPool
}

const verifier = new Verifier(params);

module.exports = async (req, res) => {
  const { accesstoken, cognitoid } = req.headers
  let verified 
  try {
    verified = await verifier.verify(accesstoken)
  } catch (error) {
    send(res, 400, {
      message: 'Couldnt verify accesstoken',
      error
    })
    return
  }
  if (!verified) {
    send(res, 400, { message: "You shall not pass - Gandalf"})
  } else {
    try {
      const user = await User.findOne({ cognitoId: cognitoid })
      req.user = user._id
    } catch (error) {
      send(res, 400, {
        error,
        message: "Problem getting user from db"
      })
    }
  }
  return
}