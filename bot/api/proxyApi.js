import request from "../utils/request/index.js";

export const weather_api = (data) => {
  return request({
    url: "/weather_forecast",
    method: "get",
    params: data
  });
};

export const geocode = (data) => {
  return request({
    url: "/geocode",
    method: "get",
    params: data
  });
};

export const openAI_2D_chatGPT = (data) => {
  return request({
    url: "/open_ai2d_chatgpt",
    method: "get",
    params: data
  });
};
