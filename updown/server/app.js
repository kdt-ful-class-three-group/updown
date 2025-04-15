const express = require('express');
const router = require('./routes/user');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use('/', router);





app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});



