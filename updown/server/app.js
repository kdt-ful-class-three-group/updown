const express = require('express');
// const router = express.Router();
const path = require('path');
const app = express();



app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));















app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});



