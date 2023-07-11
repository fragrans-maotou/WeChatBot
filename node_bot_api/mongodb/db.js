/*
 * @Author: wangwendie
 * @Date: 2023-06-14 16:13:16
 * @LastEditors: wangwendie
 * @Description: mongodb的连接
 */

import mongoose from "mongoose";

export default (config) => {

  mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.Promise = global.Promise;

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('连接数据库成功');
  });

  db.on('error', (error) => {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });

  db.on('close', () => {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect(config.url, { server: { auto_reconnect: true } });
  });
};