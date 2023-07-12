/*
 * @Author: wangwendie
 * @Date: 2023-07-06 13:47:11
 * @LastEditors: wangwendie
 * @Description:
 */

import request from "../utils/request/index.js";

// 注册用户
export const registerUser = (data) => {
  return request({
    url: "/register_user",
    method: "post",
    params: data
  });
};

// 获取用户信息
export const userInfo = (data) => {
  return request({
    url: "/user_info",
    method: "get",
    params: data
  });
};

// 获取用户的排名列表
export const userRankingList = (data) => {
  return request({
    url: "/user_ranking_list",
    method: "get",
    params: data
  });
};

// 修改积分
export const updataIntegral = (data) => {
  // type 0 曾  type 1 减
  return request({
    url: "/updata_integral",
    method: "get",
    params: data
  });
};

// 修改城市
export const updataCity = (data) => {
  return request({
    url: "/updata_city",
    method: "get",
    params: data
  });
};

// http://localhost:8001/updata_integral?type=1&user_name=🐯

