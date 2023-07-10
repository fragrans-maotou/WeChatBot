import { weather } from "../api/proxyApi.js";
import { parseTime } from "../utils/common.js";

class Weather {

  constructor(message, userinfo) {
    this.message = message;
    this.userinfo = userinfo;
  }

  // 改为箭头函数，以自动绑定上下文
  activateRule = async (ruleText, mentionText, address, location = "") => {
    let rultRegex = new RegExp(ruleText, 'gm');
    if (rultRegex.test(mentionText)) {
      this.messageWeather();
      return
    }
  }

  // 天气
  messageWeather = async (address, location = "") => {

    if (!this.userinfo.result) {
      await this.message.say("哦~~~，你是不是没有告诉我，你的位置")
      return;
    }
    let userCity = this.userinfo.result.city;
    if (location.length != 0) {
      const [lon, lat] = location.split(",");
      userCity.name = address;
      userCity.latitude = lat;
      userCity.longitude = lon;
    }
    try {
      let weatherInfo = await weather({
        lat: userCity.latitude,
        lon: userCity.longitude
      })

      let current = weatherInfo.result.current;
      let hourly = weatherInfo.result.hourly;
      let daily = weatherInfo.result.daily;
      let messageDailyTemplate = this.weatherText(daily[0], "daily")
      let messageHourlyTemplate = this.weatherText(hourly[1], "hourly")
      console.log(messageDailyTemplate + "\n" + messageHourlyTemplate);
      await this.message.say(messageDailyTemplate + "\n" + messageHourlyTemplate);

    } catch (err) {
      await this.message.say("哼狗天气api，出问题了，🐎")
    }
  }

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
    let temp = `当前温度:${item.temp} ℃ `; // 温度范围
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
    let baseMessage = `坐标：${userCity.name}\n日期：${baseTime}\n今日预计天气：${weatherDescription} ${icon}`;

    console.log(baseMessage, type);
    if (type == "daily") {
      return `${baseMessage}\n日出:${sunriseTime},日落:${sunset}\n${tempRange}\n${wind_speed}\n${wind_deg}\n${pop}\n${rain}\n${uvi}\n\n`
    } else if (type == "hourly") {
      return `一小时后预计天气：${weatherDescription} ${icon}\n${temp}\n${wind_speed}\n${wind_deg}\n${pop}\n\n`
    }
  }
}


export default Weather;

