const User = require('../models/user');
const express = require('express');
const router = express.Router();

 router.post('/', async(req, res, next) => {
       // Check if this user already exisits
       let user = await User.findOne({ email: req.body.email });
       if (user) {
           return res.status(400).send('That user already exisits!');
       } else {
           // Insert the new user if they do not exist yet
           user = new User({
               prenom: req.body.prenom,
               nom: req.body.nom,
               telephone: req.body.telephone,
               email: req.body.email,
               password: req.body.password,
               sexe: req.body.sexe
           });

           await user.save()
           .then(user => {
               res.send(user);
           })

           .catch(error => {
               res.json({
                   message: 'Erreur! Compte non créé'
               })
           })
        
           
        }
 });

 module.exports = router;
