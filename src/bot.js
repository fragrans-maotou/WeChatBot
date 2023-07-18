/*
 * @Author: wangwendie
 * @Date: 2023-07-05 18:17:08
 * @LastEditors: wangwendie
 * @Description:
 */

import { WechatyBuilder } from "wechaty";
import {
  onLogin,
  onLogout,
  onMessage,
  onRoomMembersJoin,
  onRoomMembersLeave,
  onScan
} from "./listeners/index.js";


let botName = "botQingLuan";

const bot = WechatyBuilder.build({
  name: botName,
});

// call 与apply 使用了默认会调用一次，采用bind最合适
bot
  .on("scan", onScan.bind(null, bot))
  .on("login", onLogin.bind(null, bot))
  .on("logout", onLogout.bind(null, bot))
  .on("message", onMessage.bind(null, bot))
  .on("room-join", onRoomMembersJoin.bind(null, bot))
  .on("room-leave", onRoomMembersLeave.bind(null, bot))

bot
  .start()
  .then(() => {
    console.log(botName, "启动成功")
  })
  .catch((err) => {
    console.error(botName, "启动失败:", err);
  });