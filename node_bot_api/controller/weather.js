/*
 * @Author: wangwendie
 * @Date: 2023-07-10 09:36:38
 * @LastEditors: wangwendie
 * @Description:
 */
import request from "../utils/request.js";

class Weather {
  constructor() {
    this.location = "120.151667,30.169379";
    this.weatherkey = process.env.OPENWEATHER_API_KEY;
    this.gaodekey = process.env.OPENGAODE_WEB_SERVICE_API_KEY; // 搞得web API 密钥
    // this.weatherForecast = this.weatherForecast.bind(this);
  }

  async weatherForecast (req, res, next) {
    let openweatherapi = "https://api.openweathermap.org/data/3.0/onecall";
    const { lat, lon } = req.query;
    const weatherkey = process.env.OPENWEATHER_API_KEY;// 天气 API 密钥

    try {
      const response = await request({
        url: openweatherapi,
        method: "get",
        params: {
          appid: weatherkey,
          lat: lat || "30.169379",
          lon: lon || "120.151667",
          exclude: "minutely", // current,minutely,hourly,daily,alerts
          units: "metric",
          lang: "zh_cn"
        }
      });
      res.send({
        code: 200,
        result: response
      });
    } catch (err) {
      res.send({
        code: 200,
        message: "请求天气报错了"
      });
      return;
    }
  }

  async latitudeAndLongitude (req, res, next) {
    const gaodeapi = "https://restapi.amap.com/v3/geocode/geo";
    const gaodekey = process.env.OPENGAODE_WEB_SERVICE_API_KEY; // 搞得web API 密钥
    const { area } = req.query;
    try {

      let areaTrim = area.trim();
      const response = await request({
        url: gaodeapi,
        method: "get",
        params: {
          key: gaodekey,
          address: areaTrim
        }
      });

      let geocodes = response.geocodes[0];

      res.send({
        code: 200,
        message: "我已经记录下来啦！",
        result: geocodes
      });
    } catch (err) {
      console.log(err);
      res.send({
        code: 10001,
        message: "请求经纬度报错了！,你没有骗我吧，你确定有这个地名"
      });
      return;
    }

  }
}



export default new Weather();