/*
 * @Author: wangwendie
 * @Date: 2023-07-07 13:23:55
 * @LastEditors: wangwendie
 * @Description:
 */


import express from "express";
import ChatGPTAPI from "../controller/chatgpt.js";

const router = express.Router();


router.get("/chatgpt", ChatGPTAPI.example)


export default router;