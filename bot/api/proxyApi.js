import request from "../utils/request/index.js";

export const weather = (data) =>{
  return request({
    url: "/weather_forecast",
    method: "get",
    params: data
  })
}

export const geocode = (data) =>{
  return request({
    url: "/geocode",
    method: "get",
    params: data
  })
}