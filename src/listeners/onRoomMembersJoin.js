/*
 * @Author: wangwendie
 * @Date: 2023-07-14 14:34:57
 * @LastEditors: wangwendie
 * @Description: 监听房间成员加入群，成为群的一员
 */


const onRoomMembersJoin = async (bot, room, inviteeList, inviter) => {
  console.log(bot, room, inviteeList, inviter);

  const topic = await room.topic(); // 被邀请人进来的群名称
  const inviterName = inviter.name(); // 这个是邀请人
  const InviteeMemberList = inviteeList.map(c => c.name()).join(','); // 被邀请人的列表
  console.log(`加入群聊：${topic}--,你的邀请人是：${inviterName},邀请列表：${InviteeMemberList}`)
  console.log('加入的群聊ID:', room.id)

  await room.say(`欢迎加入 "${topic}"!`, inviteeList[0])

}

export default onRoomMembersJoin;