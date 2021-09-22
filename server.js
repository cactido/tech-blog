//includes
const path = require('path');
const express =  require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
//initialize express
const app = express();
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
    store: new SequelizeStore({
        db: sequelize
    })
};
//handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    //layoutsDir: __dirname + '/views/layouts',
}));
app.use(express.static('public'))
//sessions
app.use(session(sess));
app.use(require('./controllers/'));
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Listening on port ', PORT));
});