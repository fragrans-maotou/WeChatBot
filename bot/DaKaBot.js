/*
 * @Author: wangwendie
 * @Date: 2023-07-05 18:17:08
 * @LastEditors: wangwendie
 * @Description:
 */
import { ScanStatus, log, WechatyBuilder } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";
import { registerUser, userInfo, userRankingList, updataIntegral } from "./api/user.js";

let botName = "DaKaBot";
// 展示终端
function onScan (qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrcodeTerminal.generate(qrcode, { small: true });
  }
}


// 登录
function onLogin (user) {
  log.info(botName, `user: ${user}`);
}


// 退出
function onLogout (user) {
  log.info(botName, `user: ${user}`);
}


// 特定的回复消息

async function onMessage (message) {
  log.info(botName, `Message: ${message}`);
  const contact = message.talker();
  // 获取发送人的姓名
  const sendName = contact.payload.name;
  const text = message.text(); // 获取发送人的消息
  const room = message.room(); // 获取发送人的房间
  const toContact = message.to() // 获取接收人的匿名
  const isByMention = await message.mentionSelf(); //是否被@了

  log.info(botName, `Message:${contact}--- ${sendName} -- ${text} -- ${room} ---${toContact} `);

  if (text === "打卡") {
    updataIntegral({ user_name: sendName, tyep: 0 }).then(async (res) => {
      if (res.result.modifiedCount == 1) {
        await message.say(`${sendName}, 收到了，你的打卡，已打卡成功`);
      } else {
        await message.say(`${sendName}, 你都没有注册，你打什么卡`);
      }
    })
  }

  if (isByMention) {
    console.log(` ${sendName}，艾特我，是有什么事情？`)
    let userinfo = await userInfo({ user_name: sendName });

    if (/我的积分/gm.test(text)) {
      if (!userinfo.result) {
        await message.say(`${sendName}, 你都没有注册，你打什么卡`);
      } else {
        await message.say(`${sendName}, 你目前的积分为：${userinfo.result.integral}`);
      }
      return
    }

    if (/排名/gm.test(text)) {
      userRankingList().then(async (res) => {
        await message.say(res.result)
      })
      return
    }
    if (/注册/gm.test(text)) {
      registerUser({ user_name: sendName }).then(async (res) => {
        await message.say(res.message)
      })
      return
    }

  }


}

const bot = WechatyBuilder.build({
  name: botName,
}) // get a Wechaty instance

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
