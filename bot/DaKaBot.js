/*
 * @Author: wangwendie
 * @Date: 2023-07-05 18:17:08
 * @LastEditors: wangwendie
 * @Description:
 */
import qrcodeTerminal from "qrcode-terminal";
import { ScanStatus, WechatyBuilder, log } from "wechaty";
import { openAI_2D_chatGPT } from "./api/proxyApi.js";
import { userInfo } from "./api/user.js";
import { SportsCheckin, Weather } from "./models/index.js";

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

  if (message.type() === bot.Message.Type.Text) {
    // log.info(botName, `Message: ${message}`);
    const contact = message.talker();
    // console.log("message", message);
    // console.log("contact", contact);
    // 获取发送人的姓名
    const sendName = contact.payload.name;
    const sendWxId = contact.payload.id;
    const text = message.text(); // 获取发送人的消息
    const room = message.room(); // 获取发送人的房间
    const messageType = message.type(); // 消息类型
    const isByMention = await message.mentionSelf(); //是否被@了
    const isRecalled = (/「.*.：@.*.」/g).test(text); //引用中带有@

    log.info(botName, `Message: 发送人${sendName} -- ${text} -- ${room} ---${messageType} `);

    if (isByMention) {
      // console.log(` ${sendName}，艾特我，是有什么事情？`)
      if (isRecalled) {
        await message.say(`${sendName}, 我不处理引用消息`);
        return
      }

      // 获取用户的消息+用户@的诉求
      let mentionText = await message.mentionText();
      let userinfo = await userInfo({ wx_id: sendWxId });
      
      // 天气模块
      let newWeather = new Weather(message, userinfo, mentionText);
      newWeather.messageWeather("天气");
      newWeather.getGeoLocation("我的位置");
      
      // 打卡模块
      let newSportsCheckin = new SportsCheckin(message, userinfo, mentionText);
      newSportsCheckin.checkin("打卡");
      newSportsCheckin.getMyIntegral("我的积分");
      newSportsCheckin.getRankingList("排名");
      newSportsCheckin.registerSportsCheckin("注册");

      if (/GPT/gm.test(mentionText)) {
        if (sendName != '🐯') {
          message.say("很抱歉，你权限不足！")
          return;
        }
        let mentionTextReplace = mentionText.replace(/GPT/g, "").trim()
        let chatText = await openAI_2D_chatGPT({
          text: mentionTextReplace
        });
        await message.say(chatText.result)
        return
      }

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