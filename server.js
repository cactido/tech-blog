//includes
const path = require('path');
const express =  require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const helpers = require('./utils/helpers');
//initialize express
const app = express();
app.use(express.json());
//get port from .env or default to 3001
const PORT = process.env.PORT || 3001;
//sequelize includes
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//initialize session
const sess = {
    secret: 'frog luggage shorts attack',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize })
};
//handlebars
const hbs = handlebars.create({ helpers });
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine);
app.use(express.static('public'));
//sessions
app.use(session(sess));
app.use(require('./controllers/'));
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Listening on port ', PORT));
});