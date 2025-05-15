import session from "express-session"
import { SESSION_SECRET } from "./envConfig.js"

export const sessionMiddleware = session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
  }
})