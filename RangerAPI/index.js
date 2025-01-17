const express = require('express');

const authRouter = require('./routes/auth');
const groupRouter = require('./routes/group');
const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');
const inviteRouter = require('./routes/invite');
const reviewRouter = require('./routes/review');

const bodyParser = require('body-parser');

const morgan = require('morgan');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const sequelize = require('./config/database');

const passport = require('passport');

const app = express();
app.use(passport.initialize())
require('./middleware/passport')(passport);

let corsOpts = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cookieParser());
app.use(cors(corsOpts));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

(async () => {
    try {
        await sequelize.sync()
        console.log('Db synchronization successful')
    }
    catch(err) {
        console.log('Db synchronization error: ', err)
    }
})();

app.use('/auth', authRouter);
app.use('/groups', groupRouter);
app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/invites', inviteRouter);
app.use('/reviews', reviewRouter);

app.get('/', (req, res) => {
    res.end("If you're seeing this... YIPPEEEEE!!")
});

const port = 7000
app.listen(port, () => console.log(`Server started on port ${port}`))