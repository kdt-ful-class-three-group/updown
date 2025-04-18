const express = require('express');
const router = require('./routes/user');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: `http://localhost:5173`, // 특정 출처 허용
  methods: 'GET, POST, PUT, DELETE, OPTIONS', // 특정 HTTP 메서드 허용
  allowedHeaders: ['Content-Type'], // 특정 헤더 허용
})
);

app.use(express.json());
app.use('/', router);





app.listen(8003, () => {
  console.log('Server running on http://localhost:8003');
});



