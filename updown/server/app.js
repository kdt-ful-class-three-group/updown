import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import router from './routes/user.js';


const app = express();


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/users', router);

app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});
