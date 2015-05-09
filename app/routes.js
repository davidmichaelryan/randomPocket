(function() {
  var consumerKey, request;

  request = require('request');

  require('dotenv').load();

  consumerKey = process.env.CONSUMER_KEY;

  module.exports = function(app) {
    app.use(function(req, res, next) {
      console.log("%s %s", req.method, req.url);
      next();
    });
    app.get("/", function(req, res) {
      return res.render("index");
    });
    app.post('/request', function(req, res) {
      request.post('https://getpocket.com/v3/oauth/request', {
        form: {
          consumer_key: consumerKey,
          redirect_uri: '/random'
        }
      }, function(error, response, body) {
        var request_token, url;
        if (error) {
          console.log("there was an error");
        } else {
          request_token = body.split("=")[1];
          url = "https://getpocket.com/auth/authorize?request_token=" + request_token + "&redirect_uri=http://" + req.headers.host + "/random";
          res.cookie('token', request_token, {
            maxAge: 900000
          });
          res.redirect(url);
        }
      });
    });
    app.get("/random", function(req, res) {
      res.render("random");
    });
    app.post("/random", function(req, res) {
      var accessToken;
      accessToken = req.cookies.access_token;
      request.post("https://getpocket.com/v3/get", {
        form: {
          consumer_key: consumerKey,
          access_token: accessToken
        }
      }, function(error, response, body) {
        var articles, data, rand, randomArticle;
        data = JSON.parse(body);
        articles = data.list;
        articles = Object.keys(articles).map(function(k) {
          return articles[k];
        });
        rand = Math.floor(Math.random() * articles.length);
        randomArticle = articles[rand];
        res.send(randomArticle);
      });
    });
    return app.post("/authorize", function(req, res) {
      var token_cookie;
      if (req.cookies.access_token) {
        res.send("success");
        return;
      }
      token_cookie = req.cookies.token;
      request.post("https://getpocket.com/v3/oauth/authorize", {
        form: {
          consumer_key: consumerKey,
          code: token_cookie
        }
      }, function(error, response, body) {
        var access_token, username, _ref;
        res.clearCookie('token');
        _ref = body.split("&"), access_token = _ref[0], username = _ref[1];
        access_token = access_token.split("=")[1];
        username = username.split("=")[1];
        res.cookie('access_token', access_token, {
          maxAge: 900000
        });
        res.cookie('username', username, {
          maxAge: 900000
        });
        res.send("success");
      });
    });
  };

}).call(this);
