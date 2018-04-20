const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const mongo = 'mongodb://mongo:27017';

const User = require('./models/user');
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/project');



mongoose.connect(mongo);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(`DB Error -> ${err}`);
});

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', router)
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);


router.get('/', (req, res) => {
  res.json({ message: 'welcome to the api' });
});


db.once('open', () => {
  app.listen(port, () => {
    console.log(`App is listening on ${port}`);
  });
});