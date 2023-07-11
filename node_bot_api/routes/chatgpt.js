/*
 * @Author: wangwendie
 * @Date: 2023-07-07 13:23:55
 * @LastEditors: wangwendie
 * @Description:
 */


import express from "express";
import ChatGPTAPI from "../controller/chatgpt.js";

const router = express.Router();

router.get("/open_ai2d_chatgpt", ChatGPTAPI.OpenAI2DChatGPT); //

// router.get("/openai_chatgpt", ChatGPTAPI.OpenAIChatGPT) // 缺少钱
// router.get("/bing_chatgpt", ChatGPTAPI.BingChatGPT) // 缺少key，国外信用卡申请

export default router;