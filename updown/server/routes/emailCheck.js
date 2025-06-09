// // server/emailRoutes.js 또는 비슷한 경로
// const express = require("express");
// const nodemailer = require("nodemailer");
import express from 'express';
import nodemailer from 'nodemailer';
import { GMAIL_ID, GMAIL_PW } from '../config/envConfig.js';

const router = express.Router();
// 이메일-코드 저장소 (실제 프로젝트에서는 Redis 등 캐시 DB 권장)
const emailCodeMap = new Map(); // { email: { code: "123456", expires: Date } }

// transporter 설정 (예: Gmail)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_PW, // Gmail 앱 비밀번호
  },
});

// 6자리 코드 생성 함수
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✔️ [POST] /send-code
router.post("/send", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, msg: "이메일 없음" });

  const code = generateCode();
  const expires = Date.now() + 1000 * 60 * 3; // 3분 후 만료

  emailCodeMap.set(email, { code, expires });

  const mailOptions = {
    from: GMAIL_ID,
    to: email,
    subject: "회원가입 인증코드",
    text: `인증코드는 ${code} 입니다. (3분 내에 입력해주세요)`,
  };

  // console.log(code);

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (err) {
    console.error("이메일 전송 실패", err);
    res.status(500).json({ success: false });
  }
});

// ✔️ [POST] /verify-code
router.post("/verify", (req, res) => {
  const { email, code } = req.body;
  const record = emailCodeMap.get(email);

  if (!record || Date.now() > record.expires) {
    return res.json({ success: false, msg: "인증코드가 만료되었거나 없습니다." });
  }

  if (record.code === code) {
    emailCodeMap.delete(email); // 인증 후 삭제 (보안)
    return res.json({ success: true });
  } else {
    return res.json({ success: false, msg: "인증코드가 일치하지 않습니다." });
  }
});

// module.exports = router;
export { router };