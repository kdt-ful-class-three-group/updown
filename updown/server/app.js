import express from 'express';
import cors from 'cors';
import { router as usersRouter } from './routes/users.js';
import { router as signupRouter } from './routes/signup.js';
import { router as loginRouter } from './routes/login.js';

const app = express();
app.use(cors());
app.use(express.json());

// 라우터 등록
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/", usersRouter); //




app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});
