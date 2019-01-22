const { send } = require('micro')

const auth = require('./auth')
const connect = require('./connect')
const parse = require('./parse')

const routes = {
  "/api/project": {
    GET: {
      secure: false,
      db: true
    },
    POST: {
      secure: true,
      dn: true
    },
    PATCH: {
      secure: true,
      db: true
    },
    DELETE: {
      secure: true,
      db: true
    }
  },
  "/api/folder": {
    GET: {
      secure: true,
      db: true
    },
    POST: {
      secure: true,
      db: true
    },
    PATCH: {
      secure: true,
      db: true
    },
    DELETE: {
      secure: true,
      db: true
    },
  },
  "/api/user": {
    GET: {
      secure: true,
      db: true
    },
    POST: {
      secure: false,
      db: true
    },
    PATCH: {
      secure: true,
      db: true
    }
  },
  "/api/user/career": {
    POST: {
      secure: true,
      db: true
    },
    PATCH: {
      secure: true,
      db: true
    },
    DELETE: {
      secure: true,
      db: true
    }
  }
}

module.exports = async (req, res, actions) => {
  const { url, method } = req
  try {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accesstoken, cognitoid, Access-Control-Allow-Origin");
    if (req.method === 'OPTIONS') {
      send(res, 200, {})
      return
    }
  } catch (error) {
    send(res, 400, { message: "couldnt set headers" })
  }
  
  let route, secure, db

  try {
    route = routes[url.split('?')[0]][method]
    db = route.db
    secure = route.secure
  } catch (error) {
    send(res, 400, {
      error,
      message: "route is not defined",
      url,
      method
    })
  }

  try {
    if (db) { 
      await connect(res)
    }
  } catch (error) {
    send(res, 400, {
      error,
      message: 'could not connect to db'
    })
  }
  
  if (secure) {
    try { 
      await auth(req, res)
    } catch (error) {
      send(res, 400, {
        error,
        message: 'could not authenticate anythig'
      })
    }
  }

  try {
    await parse(req, res)
  } catch (error) {
    send(res, 400, {
      error,
      message: "couldn parse request"
    })
  }

  try {
    return actions[method](req, res)
  } catch (error) {
    send(res, 400, {
      error,
      message: "couldnt run action method"
    })
  }
}