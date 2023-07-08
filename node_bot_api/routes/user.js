/*
 * @Author: wangwendie
 * @Date: 2023-07-05 17:51:16
 * @LastEditors: wangwendie
 * @Description:
 */

import express from "express";
import User from "../controller/user.js";

const router = express.Router();

router.post('/register_user', User.registerUser);
router.get('/user_info', User.userInfo);
router.get('/user_ranking_list', User.userRankingList);
router.get('/updata_user_rank', User.updataUserRank);
router.get('/updata_integral', User.updataIntegral);
router.get('/updata_city', User.updataCity);

export default router;