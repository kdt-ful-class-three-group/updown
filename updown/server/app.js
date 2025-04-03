const express = require('express');
const router = express.Router();
const app = express();



app.use(express.json());
















app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});



