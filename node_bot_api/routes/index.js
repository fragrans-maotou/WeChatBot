/*
 * @Author: wangwendie
 * @Date: 2023-07-05 17:51:16
 * @LastEditors: wangwendie
 * @Description:
 */

import chatgpt from "./chatgpt.js";
import user from "./user.js";
import weather from "./weather.js";
export default (app) => {
  app.use(user);
  app.use(chatgpt);
  app.use(weather);
};