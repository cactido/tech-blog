//includes
const path = require('path');
const express =  require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
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

app.use(session(sess));
app.use(require('./controllers/'));
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Listening on port ', PORT));
});