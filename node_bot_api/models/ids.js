/*
 * @Author: wangwendie
 * @Date: 2023-07-06 16:39:39
 * @LastEditors: wangwendie
 * @Description:
 */
import mongoose from "mongoose";;

const Schema = mongoose.Schema;

const idsSchema = new Schema({
  user_id: Number,
});

const Ids = mongoose.model("Ids", idsSchema);

Ids.findOne().then(data => {
  if (!data) {
    const newIds = new Ids({
      user_id: 0,
    });
    newIds.save();
  }
}).catch(err => {
  throw new Error(err);
});

export default Ids;