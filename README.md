<!--
 * @Author: wangwendie
 * @Date: 2023-07-05 18:12:15
 * @LastEditors: wangwendie
 * @Description:
-->
# WeChatBot
微信使用的小机器人


wechaty监听事件
Wechaty 的 bot 可以监听多种事件，以便在不同的情况下做出相应的响应和处理。以下是 Wechaty bot 可以监听的一些常见事件：

1. `scan`：监听二维码扫描事件，当 bot 需要扫描二维码时触发。
2. `login`：监听登录事件，当 bot 成功登录时触发。
3. `logout`：监听登出事件，当 bot 登出时触发。
4. `message`：监听消息事件，当 bot 收到消息时触发。
5. `friendship`：监听好友添加事件，当有好友添加请求时触发。
6. `room-invite`：监听群邀请事件，当收到加入群聊的邀请时触发。
7. `room-join`：监听群成员加入事件，当有新成员加入群聊时触发。
8. `room-leave`：监听群成员离开事件，当有成员离开群聊时触发。
9. `room-topic`：监听群聊主题变更事件，当群聊的主题发生变更时触发。
10. `room-mention`：监听被提及事件，当 bot 被@提及时触发。
11. `room-join-request`：监听群聊加入请求事件，当有人请求加入群聊时触发。
12. `error`：监听错误事件，当发生错误时触发。

这只是 Wechaty bot 可以监听的一些常见事件，还有其他更多的事件可供监听。你可以根据需要选择监听的事件，编写对应的处理逻辑。