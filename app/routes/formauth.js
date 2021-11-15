const User = require('../models/user');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

let urlParser = bodyParser.urlencoded({extended: false});


//route
 router.get('/', (req, res, next)=>{
   res.render('formauth', {});
 });

 router.post('/', urlParser, async(req, res, next) => {
  // Check if this user already exisits
  let user = await User.findOne({ email: req.body.email });
  if (user) {
      user.delete(function (err) {
        if (err) return handleError(err) 
        else { res.redirect('/valid')}
      });
  }
});



//redirect
router.get('/valid', (req, res, next)=> {
  res.json('Success!')
});



 module.exports = router;
