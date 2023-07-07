/*
 * @Author: wangwendie
 * @Date: 2023-07-05 17:51:16
 * @LastEditors: wangwendie
 * @Description:
 */

import user from "./user.js";
import chatgpt from "./chatgpt.js";

export default (app) => {
  app.use(user);
  app.use(chatgpt);
}