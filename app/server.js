//modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const api = require('novelcovid');
const mongoose = require('mongoose');
const nodemail = require('nodemailer');

//routes
const routes = require('./routes/home');
const actu = require('./routes/actu');
const apropos = require('./routes/apropos');
const formscript = require('./routes/formscript');
const form = require('./routes/form');
const auth = require('./routes/formauth');
const User = require('./models/user');
const share = require('./routes/share');

const app = express(); //init

//middlewares
let urlParser = bodyParser.urlencoded({extended: false});

app.use(bodyParser.json());
app.use(urlParser);
app.use(morgan('tiny'));

//db con
const conURL = 'mongodb+srv://lowkey:root@cluster0.ejcts.mongodb.net/covidapp?retryWrites=true&w=majority';

const database = mongoose.connect(conURL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected!'))
    .catch(err => console.error('Something went wrong!', err));


//template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));!
app.use(express.json());


app.use('/', routes);
app.use('/actualites', actu);
app.use('/apropos', apropos);
app.use('/formscript', formscript);
app.use('/form', form);
app.use('/form/valid', form);
app.use('/formauth', auth);
app.use('/share', share);

/*
app.get('/view', (req, res, next) => { 
    let userMail = User.find().foreach(function (docs), ) => {
      if(err) return handlerError(err); else {res.json(userMail)};
    }
});
*/

//fetch actu api

app.get('/actualites', async (req, res) => {
  const senegal = await api.countries({country:'senegal'});
  const global = await api.all(); //all
  const afrique = await api.continents({continent:'africa'}); //africa
  const continents = await api.continents({sort:'cases'});
  const countries = await api.countries({sort:'cases'});
      res.render('actu', { senegal:senegal, global: global, afrique:afrique, continents:continents, countries:countries});
});

//send daily notif
/*
app.get('/', (req, res, next) =>{
    
})
*/


//port listening
const port = process.env.PORT || 3000;

app.listen(port, (err) => { 
    if(err) { console.log(err); };
    console.log(`Server working on port ${port}`);
})