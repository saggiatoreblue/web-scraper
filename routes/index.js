const express = require('express');
const router = express.Router();
const posts = require('../scraper');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IMDB Web Scraper', posts : posts });
});

module.exports = router;
