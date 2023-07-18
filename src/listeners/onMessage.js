

import onRoomMessage from "./onRoomMessage.js";
import onFriendMessage from "./onFriendMessage.js";

export const onMessage = (bot, message) => {
  const room = message.room(); // 获取发送人的房间
  const messageType = message.type(); // 消息类型
  if (messageType == 0) return -1;
  if (room) {
    onRoomMessage(bot, message);
  } else {
    onFriendMessage(bot, message)
  }

}