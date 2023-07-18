
import fs from "fs";
import { getSrcDirectory } from "../utils/common.js";
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

  saveBufferAsFile = (buffer, filePath)=>{
    let pathFullName = getSrcDirectory(filePath);
    console.log(pathFullName);
    return new Promise((resolve, reject) => {
      fs.writeFile(pathFullName, buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          // 成功返回临时路径文件
          resolve(pathFullName);
        }
      });
    })
  }
}

export default BaseClass;