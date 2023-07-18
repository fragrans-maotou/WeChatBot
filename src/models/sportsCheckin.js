/*
 * @Author: wangwendie
 * @Date: 2023-07-14 09:22:45
 * @LastEditors: wangwendie
 * @Description:运动打卡
 */
import { FileBox } from 'file-box';
import FormData from "form-data";
import fs from "fs";
import { getTemplateCapture, registerUser, updataIntegral, updataSinginList, uploadUserProfile, userRankingList } from "../api/user.js";
import BaseClass from "./baseclass.js";

class SportsCheckin extends BaseClass {
  constructor(message, userinfo, mentionText) {
    super(message, userinfo, mentionText);
  }

  // 打卡用户注册
  registerSportsCheckin = async (ruleText) => {
    if (!this.activateRule(ruleText)) return;
    try {
      let res = await registerUser({ user_name: this.senderName, wx_id: this.senderWxId });
      if(res.code == 200){
        // 先注册，然后修改保存头像
        console.log("开启保存头像");
        await this.handleUploadUserProfile();
      }
      await this.message.say(res.message);
    } catch (err) {
      await this.message.say(err.message);
    }
    
    return;
  };

  // 打卡 开发凭证验证问题
  checkin = async (ruleText) => {
    if (!this.activateRule(ruleText)) return;
    const user = this.user;
    if (user) {
      const sing_in_string = user.sing_in_list.join(",");
      let updataResult =  await updataSinginList({ wx_id: this.senderWxId, sing_in_string: sing_in_string });
      if(!updataResult.result){
        await this.message.say(`@${this.senderName},${ updataResult.message}`);
        return ;
      }
      
      // 先用着这个打卡
      updataIntegral({ wx_id: this.senderWxId, tyep: 0 }).then(async (res) => {
        console.log(res);
        if (res.result.modifiedCount == 1) {
          let singInResult = await this.getTemplateCapture(user);
          let image_url = singInResult.result.url;
          let base_url = "http://localhost:8001/"
          console.log(base_url+ image_url);
          const fileBox = FileBox.fromUrl(base_url+ image_url)
          await this.message.say(fileBox)
        } else {
          await this.message.say(`@${this.senderName}, 我收到了你的打卡，但是打卡失败了，联系开发者`);
        }
      });

      return;

      // 先开始 异步函数处理打卡
      console.log(`${user.user_name} 发送了打卡请求`);
      console.log('等待凭证...');
      this.message.say(`@${this.senderName}, 请发送运动凭证！`);
      // 等待用户发送凭证
      const certificate = await waitForCertificate(user);  
      performCheckIn(user, certificate)
    } else {
      // this.user 为空就说明没有用户
      await this.message.say(`@${this.senderName}, 你都没有注册，先@我说：注册`);
    }

    const waitForCertificate = (user)=>{
      return new Promise((resolve, reject) => {
        // 这里可以监听消息事件，等待用户发送凭证

        // 假设在收到凭证后通过 resolve(certificate) 返回凭证

        // 如果超时或其他错误，通过 reject(error) 抛出错误
      })
    }

    // 执行打卡操作
    const performCheckIn = (user, certificate) =>{
      updataIntegral({ wx_id: this.senderWxId, tyep: 0 }).then(async (res) => {
        console.log(res);
        if (res.result.modifiedCount == 1) {
          await this.message.say(`@${this.senderName}, 我收到了你的打卡，你已打卡成功`);
        } else {
          await this.message.say(`@${this.senderName}, 我收到了你的打卡，但是打卡失败了，联系开发者`);
        }
      });
    }

    return;
  };

  // 获取用户的积分
  getMyIntegral = async (ruleText) => {
    if (!this.activateRule(ruleText)) return;
    
    if (!this.user) {
      await this.message.say(`@${this.senderName}, 发现你没有注册，请@我说: 注册`);
    } else {
      await this.message.say(`@${this.senderName}, \n你目前的积分为：${this.user.integral}`);
    }
    return;
  };

  // 获取全部排行榜
  getRankingList = async (ruleText) => {
    if (!this.activateRule(ruleText)) return;
    
    userRankingList().then(async (res) => {
      await this.message.say(res.result);
    });
    return;
  };

  // 获取用户头像
  handleUploadUserProfile = async () =>{
    const form = new FormData();
    const contact = this.message.talker();
    const FileBox = await contact.avatar();
    const fileName = FileBox.name;
    
    try {
      const savedPath = await this.saveBufferAsFile(FileBox.buffer, "/assets/images/"+fileName);
      form.append('files', fs.createReadStream(savedPath));
      form.append('user_name', this.senderName);
      form.append('wx_id', this.senderWxId);
      let base_url = "http://localhost:8001/"
      let result = await uploadUserProfile(form);
      console.log("urlurlurl",base_url+result.image_path);
      return true;
    } catch (err) {
      console.error('保存临时文件失败:', err);
    }
    //await this.message.say(FileBox)
    // console.log(FileBox);
    // const fileName = FileBox.name
    // await avatarFile.toFile(fileName, true)
  }

  // 获取打卡截图
  getTemplateCapture = async (user) => {
    const user_name = user.user_name;
    const wx_id = user.wx_id;
    const avatar = user.avatar;
    try {
      let filePathName =  await getTemplateCapture({user_name:user_name, wx_id:wx_id,avatar:avatar});
      return filePathName;
    } catch (err) {
      console.log(err);
    }
  } 
}

export default SportsCheckin;