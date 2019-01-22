const { send, json } = require('micro')
const query = require('micro-query')
const parse = require('./services/parse')

module.exports = async (req, res) => {
  // const params = await query(req)
  // const path = req.url.split('/')
  // console.log(path);
  
  
  
  // const url = req.url
  // if (url == '/favicon.ico') {
  //   console.log('shit');
    
  //   res.end('fuck this')
  // } else {
  //   console.log(req.url);
  //   const thisRoute = routes[req.url][req.method];
  //   console.log(thisRoute.db);
    
  //   res.end(req.url)
  // }
  // try { 
  //   req.body = await json(req)
  // } catch (error) {
  //   req.body = {}
  // }
  // req.body.user = 'me'
  // console.log(req.body);
  req.params = query(req)
  console.log(req.params);
  
  res.end()
  
}