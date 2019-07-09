require('dotenv').config();
const express = require('express');
const session = require('express-session');
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession');
const sc = require('./controllers/swagController');
const ac = require('./controllers/authController');
const cc = require('./controllers/cartController');
const search = require('./controllers/searchController');
const app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
})
);

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', sc.read);
app.get('/api/login', ac.login);
app.post('/api/register', ac.register);
app.post('/api/signout', ac.signout);
app.get('/api/user', ac.getUser);


app.post('/api/cart/checkout', cc.checkout);
app.post('/api/cart/:id', cc.add);
app.delete('/api/cart/:id', cc.delete);

app.get('/api/search', search.search);

app.listen(SERVER_PORT, () => {
    console.log(`Server port is listening on ${SERVER_PORT}`)
})