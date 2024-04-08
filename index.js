const initDb = require('../js/config/db')
const express = require('express');
const userRoutes = require('./routes/user.js')
const app = express();
const port = 3000;

//middleware
app.use(express.json())
app.use('/api', userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

initDb()