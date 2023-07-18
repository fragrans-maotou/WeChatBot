/*
 * @Author: wangwendie
 * @Date: 2023-07-14 13:07:11
 * @LastEditors: wangwendie
 * @Description:特定的回复消息
 */
import chalk from 'chalk';
import { openAI_2D_chatGPT } from "../api/proxyApi.js";
import { userInfo } from "../api/user.js";
import { SportsCheckin, Weather } from "../models/index.js";
const onRoomMessage = (bot, message) => {
  // console.log("bot类型", bot.Message);
  // console.log("message---------", message);
  let messageType = bot.Message.Type[message.type()];
  console.log("接受消息的类型为：", messageType);
  const handlerMessage = messageTypeHandlers[messageType];
  if (handlerMessage) {
    handlerMessage(bot, message)
  } else {
    console.log("暂未又该消息的处理事件");
  }
}


const textMessage = async (bot, message) => {
  const botName = bot.name();
  const contact = message.talker();
  const sendName = contact.payload.name;
  const sendWxId = contact.payload.id;
  const text = message.text(); // 获取发送人的消息
  const room = message.room(); // 获取发送人的房间
  const messageType = message.type(); // 消息类型
  const isByMention = await message.mentionSelf(); //是否被@了
  const isRecalled = (/「.*.：@.*.」/g).test(text); //引用中带有@

  console.log("contact", message);
  console.log(botName, chalk.blue(`Message: 发送人${sendName} -- ${text} -- ${room} ---${messageType} `));

  if (isByMention && !isRecalled) {
     // 发送消息，搜索到该用户，直接给提及的人发单独消息
    // const aiteName = await contact.name();
    // const userContent = await bot.Contact.find({name: aiteName}) 
    // await userContent.say(`@${aiteName} 你好`);
    
    // 获取用户的消息+用户@的诉求
    let mentionText = await message.mentionText();
    let userinfo = await userInfo({ wx_id: sendWxId });
    // console.log("userinfo",userinfo);
    if (/GPT/gm.test(mentionText)) {
      if (sendName != '🐯') {
        message.say("很抱歉，你权限不足！");
        return;
      }

      let mentionTextReplace = mentionText.replace(/GPT/g, "").trim();
      let chatText = await openAI_2D_chatGPT({
        text: mentionTextReplace
      });
      await message.say(chatText.result);
      return;
    }


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

  } else {
    console.log("不理会不@我的+不处理引用消息");
    // await message.say(`${sendName}, 我不处理引用消息`);
  }
}

const messageTypeHandlers = {
  Text: textMessage,
  Image: "",
  Video: "",
  Url: "",
  Recalled: "",
  RedEnvelope: "",
  Transfer: "",
  GroupNote: "",
  MiniProgram: "",
  Location: "",
  Emoticon: "",
  ChatHistory: "",
  Contact: "",
  Audio: "",
  Attachment: "",
  Post: "",
  Unknown: ""
}

export default onRoomMessage