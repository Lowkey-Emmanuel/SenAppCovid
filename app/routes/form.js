const User = require('../models/user');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

let urlParser = bodyParser.urlencoded({extended: false});

//route
 router.get('/', function(req, res, next){
   res.render('form', {});
 });

 
 //register
 router.post('/', urlParser, async(req, res, next) => {
     // Check if this user already exisits
     let user = await User.findOne({ email: req.body.email });
     if (user) {
         return res.status(400).send('Ce compte existe déjà! Veuillez ré-essayer');
        }else {
            // Insert the new user if they do not exist yet
            user = new User({
                prenom: req.body.prenom,
                nom: req.body.nom,
                telephone: req.body.telephone,
                email: req.body.email,
                password: req.body.password
            });
            
            await user.save ( (err) => {
                if (err) return handleError(err) 
                else { res.redirect('/') }
            }); 
            
        };
        
});
    
//redirect
router.get('/', (req, res, next)=> {

const log = console.log;

// Step 1
let transporter = nodemail.createTransport({
    service: 'gmail',
    auth: {
        user: 'senappcovid@gmail.com', // TODO: your gmail account
        pass: 'emdfrommb' // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'senappcovid@gmail.com', // TODO: email sender
    to: 'emmanueldiatta21@gmail.com', // TODO: email receiver
    subject: 'WAAAASUUUUUUUP',
    text: 'MAIS BIAAAAAAN SUUUUUUUUURRR!!'
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log(err);
    }
    return log('Email sent!!!');
});
    res.json('Success!')
});
    

module.exports = router;
    