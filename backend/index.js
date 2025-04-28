const connectToMongo = require("./database");
const express = require("express");
var cors = require('cors') 

connectToMongo();

const app = express();
const port = 5001;
app.use(cors())
app.use(express.json())
//available routes
app.use('/api/auth', require('./routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
