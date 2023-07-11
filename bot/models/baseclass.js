class BaseClass{

  constructor(message, userinfo, mentionText){
    this.message = message;
    this.senderName = message.talker().payload.name;
    this.senderWxId = message.talker().payload.id;
    this.user = userinfo.result;
    this.mentionText = mentionText;
  }
 // 改为箭头函数，以自动绑定上下文
  activateRule = (ruleText) => {
    let rultRegex = new RegExp(ruleText, 'gm');
    return rultRegex.test(this.mentionText);
  };

}

export default BaseClass;