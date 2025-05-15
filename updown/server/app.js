import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();

import { router as usersRouter } from './routes/users.js';
import { router as signupRouter } from './routes/signup.js';
import { router as loginRouter } from './routes/login.js';
import { router as logoutRouter } from './routes/logout.js';
import { router as recordRouter } from './routes/record.js';
import { router as rankingRouter } from './routes/ranking.js';
import { router as checkedRouter } from './routes/checked.js';


const PORT = process.env.PORT;
const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
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
app.use("/ranking", rankingRouter); // 랭킹 조회 라우터
app.use("/checked", checkedRouter);

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
