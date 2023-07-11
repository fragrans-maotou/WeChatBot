import { geocode, weather_api } from "../api/proxyApi.js";
import { updataCity } from "../api/user.js";
import { parseTime } from "../utils/common.js";
import BaseClass from "./baseclass.js";

class Weather extends BaseClass{

  constructor(message, userinfo, mentionText) {
    super(message, userinfo, mentionText);
  }

  // 天气
  messageWeather = async (ruleText, address, location = "") => {
    if(!this.activateRule(ruleText)) return ;

    if (!this.user) {
      await this.message.say("哦~~~，你是不是没有告诉我，你的位置，还有你根本没有注册？");
      return;
    }
    let userCity = this.user.city;
    if (location.length != 0) {
      const [lon, lat] = location.split(",");
      userCity.name = address;
      userCity.latitude = lat;
      userCity.longitude = lon;
    }

    // 如果本身没有就没有，从被调用传递了address就有了，就不阻止去调用api
    if(this.user.city.name == "") {
      await this.message.say("你还没有告诉我，您的位置。@我说：我的位置是XXXXXX");
      return;
    }

    try {
      let weatherInfo = await weather_api({
        lat: userCity.latitude,
        lon: userCity.longitude
      });

      let current = weatherInfo.result.current;
      let hourly = weatherInfo.result.hourly;
      let daily = weatherInfo.result.daily;
      let messageDailyTemplate = this.weatherText(daily[0], "daily");
      let messageHourlyTemplate = this.weatherText(hourly[1], "hourly");
      await this.message.say(messageDailyTemplate + "\n" + messageHourlyTemplate);

    } catch (err) {

      await this.message.say("哼狗天气api，出问题了，🐎");

    }
  };

  // 获取天气String
  weatherText = (item, type) => {

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

    let baseTime = parseTime(item.dt, "{y}年{m}月{d}日"); // 日期
    let sunriseTime = parseTime(item.sunrise, "{h}:{i}:{s}"); // 日出
    let sunset = parseTime(item.sunset, "{h}:{i}:{s}"); // 日落
    let temp = `温度:${item.temp} ℃ `; // 温度
    let tempRange = `温度范围:${item.temp.min} ℃ -- ${item.temp.max} ℃ `; // 温度范围
    let wind_speed = `风速度${item.wind_speed}米/秒`; // 风速
    let wind_deg = `吹风角度,北偏南${item.wind_deg}°`; // 吹风的角度
    let pop = `降雨概率: ${(item.pop * 100).toFixed(2)}%`; // 下雨的概率
    let rain = `降雨量: ${item.rain != undefined ? item.rain : 0}毫米/小时`; // 下雨的概率
    let uvi = `当日紫外线指数最大值: ${item.uvi}`; // 下雨的概率
    // weather
    let weatherDescription = item.weather[0].description;
    let icon = Status[item.weather[0].icon.slice(0, 2)];
    // console.log(item.weather[0].icon, icon);
    let baseMessage = `坐标：${this.user.city.name}\n日期：${baseTime}\n今日预计天气：${weatherDescription} ${icon}`;

    if (type == "daily") {
      return `${baseMessage}\n日出:${sunriseTime},日落:${sunset}\n${tempRange}\n${wind_speed}\n${wind_deg}\n${pop}\n${rain}\n${uvi}\n\n`;
    } else if (type == "hourly") {
      return `一小时后预计天气：${weatherDescription} ${icon}\n${temp}\n${wind_speed}\n${wind_deg}\n${pop}\n\n`;
    }
  };

  // 获取地理位置
  getGeoLocation = async (ruleText) =>{

    if(!this.activateRule(ruleText)) return ;

    try {
      let resultGeo = await geocode({ area: this.mentionText });

      if (resultGeo.code == 10001) {
        // 10001 请求数据失败
        await this.message.say(resultGeo.message);
        return;
      }
      let location = resultGeo.result.location;
      let formatted_address = resultGeo.result.formatted_address;

      let resultUpdataCity = await updataCity({
        wx_id: this.senderWxId,
        area: formatted_address,
        location: location,
      });

      await this.message.say(resultUpdataCity.message);
      // 直接调用，ruleText = “我的位置” this.mentionText中含有“我的位置”
      await this.messageWeather(ruleText, formatted_address, location);

    } catch (error) {
      await this.message.say("哈，不怪我，位置报错失败了！");
    }
    return;
  };

}


export default Weather;

