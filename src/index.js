const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const route = require('./routes');
const db = require('./config/db');

//connect to DB
db.connect();

const app = express();
const port = 3001;

// Body parsing middleware should come before static files
app.use(express.json()); // Để parse body dạng JSON
app.use(express.urlencoded({ extended: true })); // Để parse form-data (application/x-www-form-urlencoded)

app.use(express.static(path.join(__dirname, 'public')));
//HTTP logger
app.use(morgan('combined'));

//Method override
app.use(methodOverride('_method'));

//Template engine
app.engine(
    '.hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
