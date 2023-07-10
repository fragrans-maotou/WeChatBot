/*
 * @Author: wangwendie
 * @Date: 2023-07-07 13:23:55
 * @LastEditors: wangwendie
 * @Description:
 */


import express from "express";
import ChatGPTAPI from "../controller/chatgpt.js";

const router = express.Router();


router.get("/openai_chatgpt", ChatGPTAPI.OpenAIChatGPT)
router.get("/bing_chatgpt", ChatGPTAPI.BingChatGPT)

export default router;