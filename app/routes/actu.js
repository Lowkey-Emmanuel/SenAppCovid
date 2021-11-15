 const express = require('express');
 const router = express.Router();

  router.get('/actualites', function(req, res, next){
    res.render('actu', {});
  });

  module.exports = router;
