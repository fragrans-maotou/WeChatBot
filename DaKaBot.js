/*
 * @Author: wangwendie
 * @Date: 2023-07-05 18:17:08
 * @LastEditors: wangwendie
 * @Description:
 */
import { Wechaty, ScanStatus, log } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";

let botName = "DaKaBot";
// 展示终端
function onScan (qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrcodeTerminal.generate(qrcode, { small: true });
  }
}


// 登录
function onLogin (user) {
  log.info(botName, "s% login", user);
}


// 退出
function onLogout (user) {
  log.info(botName, "s% logout", user);
}


// 特定的回复消息

async function onMessage (message) {
  log.info(botName, message.toSting());

  if (message.text() === "打卡") {
    await message.say("收到了，你的打卡")
  }
}


const bot = new Wechaty({
  name: botName,
});

bot
  .on("scan", onScan)
  .on("login", onLogin)
  .on("logout", onLogout)
  .on("message", onMessage);


bot
  .start()
  .then(() => {
    log.info(botName, "启动成功")
  })
  .catch((err) => {
    log.info(botName, "启动失败:", err)
  })