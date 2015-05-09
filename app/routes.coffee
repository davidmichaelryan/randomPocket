request = require 'request'
require('dotenv').load();
consumerKey = process.env.CONSUMER_KEY

module.exports = (app) ->
  app.use (req, res, next) ->
    console.log "%s %s", req.method, req.url
    next()
    return

  app.get "/", (req, res) ->  
    res.render "index"

  app.post '/request', (req, res) ->
    request.post 'https://getpocket.com/v3/oauth/request',
      form: 
        consumer_key: consumerKey
        redirect_uri: '/random'
    , (error, response, body) ->
      if error
        console.log "there was an error"
      else
        request_token = body.split("=")[1]
        url = "https://getpocket.com/auth/authorize?request_token=" + request_token + "&redirect_uri=http://" + req.headers.host + "/random"
        res.cookie 'token', request_token, {maxAge: 900000}
        res.redirect url
      return
    return

  app.get "/random", (req, res) ->
    res.render "random"
    return

  app.post "/random", (req, res) ->
    accessToken = req.cookies.access_token
    request.post "https://getpocket.com/v3/get",
      form:
        consumer_key: consumerKey
        access_token: accessToken
    , (error, response, body) ->
      data = JSON.parse body
      articles = data.list
      articles = Object.keys(articles).map((k) -> return articles[k] );
      rand = Math.floor(Math.random() * articles.length)
      randomArticle = articles[rand]
      res.send randomArticle
      return
    return


  app.post "/authorize", (req, res) ->
    if req.cookies.access_token
      res.send "success"
      return
    token_cookie = req.cookies.token
    request.post "https://getpocket.com/v3/oauth/authorize",
      form: 
        consumer_key: consumerKey
        code: token_cookie
    , (error, response, body) ->
      res.clearCookie 'token'
      [access_token, username] = body.split "&"
      access_token = access_token.split("=")[1]
      username = username.split("=")[1] 
      res.cookie 'access_token', access_token, {maxAge: 900000}
      res.cookie 'username', username, {maxAge: 900000}
      res.send "success"
      return
    return 