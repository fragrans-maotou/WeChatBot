/*
 * @Author: wangwendie
 * @Date: 2023-07-04 13:20:45
 * @LastEditors: wangwendie
 * @Description:
 */
import dotenv from "dotenv";
import express from "express";
import db from "./mongodb/db.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

// 安排请求头
app.all("*", (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || "*";
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);

  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

const config = {
  port: 8001,
  url: 'mongodb://localhost:27017/weChat',
};

app.use(express.json());

// 給router路由送去app参数对象
router(app);

db(config);

app.listen(config.port, () => {
  console.log(`${config.port}端口：监听打开了`);
});