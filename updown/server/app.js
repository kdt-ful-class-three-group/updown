import express from 'express';
import cors from 'cors';
import session from 'express-session';

import { router as usersRouter } from './routes/users.js';
import { router as signupRouter } from './routes/signup.js';
import { router as loginRouter } from './routes/login.js';
import { router as logoutRouter } from './routes/logout.js';
import { router as recordRouter } from './routes/record.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use(session({
    secret: 'updown',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    }
  })
)


// 라우터 등록
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/signup", signupRouter);
app.use("/", usersRouter); //
app.use("/record", recordRouter); // 게임 기록 저장 라우터




app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});
