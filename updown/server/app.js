import express from 'express';
import { corsMiddleware } from './config/corsConfig.js';
import { sessionMiddleware } from './config/sessionConfig.js';

import { router as usersRouter } from './routes/users.js';
import { router as signupRouter } from './routes/signup.js';
import { router as loginRouter } from './routes/login.js';
import { router as logoutRouter } from './routes/logout.js';
import { router as recordRouter } from './routes/record.js';
import { router as rankingRouter } from './routes/ranking.js';
import { router as checkedRouter } from './routes/checked.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(corsMiddleware);
app.use(sessionMiddleware);
app.use(express.json());

// 라우터 등록
app.use("/login", loginRouter); // 로그인 라우터
app.use("/logout", logoutRouter); // 로그아웃 라우터
app.use("/signup", signupRouter); // 회원가입 라우터  
app.use("/", usersRouter); // 유저 정보 조회 라우터
app.use("/record", recordRouter); // 게임 기록 저장 라우터
app.use("/ranking", rankingRouter); // 랭킹 조회 라우터
app.use("/checked", checkedRouter); // 체크리스트 조회 라우터

app.use(express.static(join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'));
});

export default app;