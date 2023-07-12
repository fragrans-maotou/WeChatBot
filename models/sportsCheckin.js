import { registerUser, updataIntegral, userRankingList } from "../api/user.js";
import BaseClass from "./baseclass.js";


class SportsCheckin extends BaseClass{
  constructor(message, userinfo, mentionText){
    super(message, userinfo, mentionText);
  }

  registerSportsCheckin = async (ruleText) => {
    if(!this.activateRule(ruleText)) return ;
    // 打卡用户注册
    registerUser({ user_name: this.senderName , wx_id: this.senderWxId }).then(async (res) => {
      await this.message.say(res.message);
    });
    return;
  };

  checkin = async(ruleText) => {
    if(!this.activateRule(ruleText)) return ;
    if(this.user){
      console.log(this.senderWxId);
      updataIntegral({ wx_id: this.senderWxId, tyep: 0 }).then(async (res) => {
        console.log(res);
        if (res.result.modifiedCount == 1) {
          await this.message.say(`${this.senderName}, 我收到了你的打卡，你已打卡成功`);
        } else {
          await this.message.say(`${this.senderName}, 我收到了你的打卡，但是打卡失败了，联系开发者`);
        }
      });
    }else{
      // this.user 为空就说明没有用户
      await this.message.say(`${this.senderName}, 你都没有注册，先@我说：注册`);
    }

    return;
  };

  getMyIntegral = async (ruleText) => {
    if(!this.activateRule(ruleText)) return ;
    // 获取用户的积分
    if (!this.user) {
      await this.message.say(`${this.senderName}, 发现你没有注册，请@我说: 注册`);
    } else {
      await this.message.say(`${this.senderName}, \n你目前的积分为：${this.user.integral}`);
    }
    return;
  };

  getRankingList = async(ruleText) =>{
    if(!this.activateRule(ruleText)) return ;
    // 获取全部排行榜
    userRankingList().then(async (res) => {
      await this.message.say(res.result);
    });
    return;
  };
}

export default SportsCheckin;