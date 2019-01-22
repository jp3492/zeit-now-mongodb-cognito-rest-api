const { json, send } = require('micro')
const query = require('micro-query')

module.exports = async (req, res) => {
  try { 
    req.body = await json(req)
  } catch (error) {
    req.body = {}
  }
  req.params = {}
  try {
    req.params = query(req)
  } catch (error) {
    send(res, 400, {
      error,
      message: "couldnt query params"
    })
  }
  return 
}