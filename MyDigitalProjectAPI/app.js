// Configuration de express
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
// Lecture du fichier .env
require('dotenv').config()

// Lecture du fichier models/index.js afin de lancer la synchronisation de Sequelize
require('./models/index.js');

// Importation des routeurs
const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/auth.js');
const voyageRouter = require('./routes/voyage.js');
const activiteRouter = require('./routes/activite.js');
const blogRouter = require('./routes/blog.js');
const socialRouter = require('./routes/social.js');
const evaluationRouter = require('./routes/evaluation.js');
const photoRouter = require('./routes/photo.js');
const userRouter = require('./routes/user.js');
const listeSouhaitRouter = require('./routes/liste_souhait.js');
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET, // Utilisez une variable d'environnement pour le secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: app.get('env') === 'production' // Activez secure cookies en production
    }
  }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/voyage', voyageRouter);
app.use('/activite', activiteRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/social', socialRouter);
app.use('/evaluation', evaluationRouter);
app.use('/liste_souhait', listeSouhaitRouter);
app.use('/photo', photoRouter);





module.exports = app;
