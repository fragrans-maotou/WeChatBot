/*
 * @Author: wangwendie
 * @Date: 2023-07-05 18:17:08
 * @LastEditors: wangwendie
 * @Description:
 */
import qrcodeTerminal from "qrcode-terminal";
import { ScanStatus, WechatyBuilder, log } from "wechaty";
import { geocode, weather } from "./api/proxyApi.js";
import { registerUser, updataCity, updataIntegral, userInfo, userRankingList } from "./api/user.js";
import { parseTime } from "./utils/common.js";
let botName = "DaKaBot";
// 展示终端
function onScan (qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrcodeTerminal.generate(qrcode, { small: true });
  }
}

// 登录
function onLogin (user) {
  log.info(botName, `user: ${user}`);
}

// 退出
function onLogout (user) {
  log.info(botName, `user: ${user}`);
}

// 特定的回复消息
async function onMessage (message) {
  log.info(botName, `Message: ${message}`);
  const contact = message.talker();
  console.log(contact);
  // 获取发送人的姓名
  const sendName = contact.payload.name;
  const text = message.text(); // 获取发送人的消息
  const room = message.room(); // 获取发送人的房间
  const messageType = message.type(); // 消息类型
  const isByMention = await message.mentionSelf(); //是否被@了

  log.info(botName, `Message: 发送人${sendName} -- ${text} -- ${room} ---${messageType} `);

  if (text === "打卡") {
    updataIntegral({ user_name: sendName, tyep: 0 }).then(async (res) => {
      if (res.result.modifiedCount == 1) {
        await message.say(`${sendName}, 收到了，你的打卡，已打卡成功`);
      } else {
        await message.say(`${sendName}, 你都没有注册，你打什么卡`);
      }
    })
  }

  if (isByMention) {
    console.log(` ${sendName}，艾特我，是有什么事情？`)
    let userinfo = await userInfo({ user_name: sendName });

    if (/我的积分/gm.test(text)) {
      if (!userinfo.result) {
        await message.say(`${sendName}, 你都没有注册，你打什么卡`);
      } else {
        await message.say(`${sendName}, 你目前的积分为：${userinfo.result.integral}`);
      }
      return
    }

    if (/排名/gm.test(text)) {
      userRankingList().then(async (res) => {
        await message.say(res.result)
      })
      return
    }
    if (/注册/gm.test(text)) {
      registerUser({ user_name: sendName }).then(async (res) => {
        await message.say(res.message)
      })
      return
    }
    
    if(/我的位置/gm.test(text)){
      try {
        let resultGeo = await geocode({area:text});
        if(resultGeo.code == 10001) {
          await message.say(resultGeo.message)
          return 
        }
        let location = resultGeo.result.location;
        let formatted_address = resultGeo.result.formatted_address;
        
        let resultUpdataCity = await updataCity({
          user_name: sendName, 
          area:formatted_address, 
          location:location,
        });
        await message.say(resultUpdataCity.message)
      } catch (error) {
        await message.say("哈，不怪我，位置报错失败了！")
      }
    }

    if(/天气/gm.test(text)){
      console.log(userinfo.result);
      if(!userinfo.result){
        await message.say("哦~~~，你是不是没有告诉我，你的位置")
        return ;
      }
      let userCity =  userinfo.result.city;
      const weatherText = (item, type) =>{
        const Status = {
          "01": '☀',
          "02": '🌤️',
          "03": '🌥️',
          "04": '☁️',
          "09": '🌦️',
          "10": '🌧️',
          "11": '🌩️',
          "13": '🌨️',
          "50": '🌪️',
        };
       
        let baseTime = parseTime(item.dt,"{y}年{m}月{d}日") ; // 日期
        let sunriseTime = parseTime(item.sunrise,"{h}:{i}:{s}") ; // 日出
        let sunset = parseTime(item.sunset,"{h}:{i}:{s}"); // 日落
        let temp = `当前温度:${item.temp} ℃ `; // 温度范围
        let tempRange = `温度范围:${item.temp.min} ℃ -- ${item.temp.max} ℃ `; // 温度范围
        let wind_speed = `风速度${item.wind_speed}米/秒`; // 风速
        let wind_deg = `吹风角度,北偏南${item.wind_deg}°`; // 吹风的角度
        let pop = `降雨概率: ${item.pop*100}%`; // 下雨的概率
        let rain = `降雨量: ${item.rain != undefined ? item.rain : 0}毫米/小时`; // 下雨的概率
        let uvi = `当日紫外线指数最大值: ${item.uvi}`; // 下雨的概率
        // weather
        let weatherDescription = item.weather[0].description;
        let icon = Status[item.weather[0].icon.slice(0,2)];
        console.log(item.weather[0].icon, icon);
        let baseMessage = `坐标：${userCity.name}\n日期：${baseTime}\n今日预计天气：${weatherDescription} ${icon}`
        if(type == "daily"){
          return `${baseMessage}\n日出:${sunriseTime},日落:${sunset}\n${tempRange}\n${wind_speed}\n${wind_deg}\n${pop}\n${rain}\n${uvi}\n\n`
        }else if(type == "hourly"){
          return `一小时后预计天气：${weatherDescription} ${icon}\n${temp}\n${wind_speed}\n${wind_deg}\n${pop}\n\n`
        }

      }
      try {
        let weatherInfo = await weather({
          lat:userCity.latitude,
          lon:userCity.longitude
        })
        let current = weatherInfo.result.current;
        let hourly = weatherInfo.result.hourly;
        let daily = weatherInfo.result.daily;
        let messageDailyTemplate = weatherText(daily[0],"daily")
        let messageHourlyTemplate = weatherText(hourly[1], "hourly")
        await message.say(messageDailyTemplate+"\n"+messageHourlyTemplate);
      } catch (err) {
        await message.say("哼狗天气api，出问题了，🐎")
      }
      
    }

  }


}

const bot = WechatyBuilder.build({
  name: botName,
}) // get a Wechaty instance

bot
  .on("scan", onScan)
  .on("login", onLogin)
  .on("logout", onLogout)
  .on("message", onMessage);


bot
  .start()
  .then(() => {
    log.info(botName, "启动成功")
  })
  .catch((err) => {
    log.info(botName, "启动失败:", err)
  })
