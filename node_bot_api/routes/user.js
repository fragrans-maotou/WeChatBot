
const express = require("express");
const User = require("../controller/user")

const router = express.Router();

router.post('/register_user', User.registerUser);

router.get('/user_info', User.userInfo);
router.get('/user_ranking_list', User.userRankingList);
router.get('/updata_user_rank', User.updataUserRank);
router.get('/updata_integral', User.updataIntegral);

module.exports = router;