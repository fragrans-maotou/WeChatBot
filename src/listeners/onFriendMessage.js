/*
 * @Author: wangwendie
 * @Date: 2023-07-14 16:19:40
 * @LastEditors: wangwendie
 * @Description: 来着与好友的单独消息
 */

const onFriendMessage = (bot, message) => {


  let messageType = bot.Message.Type[message.type()];
  const handlerMessage = messageTypeHandlers[messageType];
  if (handlerMessage) {
    handlerMessage(bot, message)
  } else {
    console.log("暂未有该消息的处理事件");
  }

}


const textMessage = async (bot, message) => {
  await message.say("暂未开启个人聊天功能")
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

export default onFriendMessage;