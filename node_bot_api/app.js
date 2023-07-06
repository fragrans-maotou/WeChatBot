/*
 * @Author: wangwendie
 * @Date: 2023-07-04 13:20:45
 * @LastEditors: wangwendie
 * @Description:
 */
const express = require("express");
const router = require("./routes/index.js");
const db = require("./mongodb/db.js");
const app = express();

const config = {
  port: 8001,
  url: 'mongodb://localhost:27017/weChat',
}

app.use(express.json());

// 給router路由送去app参数对象
router(app);

db(config);

app.listen(config.port, () => {
  console.log(`${config.port}端口：监听打开了`);
})