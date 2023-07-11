/*
 * @Author: wangwendie
 * @Date: 2023-06-20 09:57:24
 * @LastEditors: wangwendie
 * @Description: id的模块
 */

import Ids from "../models/ids.js";

class BaseComponent {
  constructor() {
    this.idlist = ["user_id"];
    this.getId = this.getId.bind(this);
  }

  async getId (type) {

    if (!this.idlist.includes(type)) {
      console.log('id类型错误');
      throw new Error('id类型错误');
      return;
    }

    try {
      const idData = await Ids.findOne();
      // 得到对象,自增
      idData[type]++;
      await idData.save();
      return idData[type];
    } catch (err) {
      console.log('获取ID数据失败');
      throw new Error(err);
    }
  }

}

export default BaseComponent;