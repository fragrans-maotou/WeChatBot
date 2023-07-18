/*
 * @Author: wangwendie
 * @Date: 2023-07-14 14:34:57
 * @LastEditors: wangwendie
 * @Description: 监听房间成员离开该群事件
 */
const onRoomMembersLeave = async (bot, room, leaverList) => {
  console.log(bot, room, leaverList);

  const topic = await room.topic(); // 离开的群名称
  const leaverMemberList = leaverList.map(c => c.name()).join(',');
  console.log(`${leaverMemberList}离开了${topic}的群，`);

  const name = leaverList[0] ? leaverList[0].name() : 'no contact!'

  await room.say(`${name}离开了${topic}"!`)
}


export default onRoomMembersLeave;