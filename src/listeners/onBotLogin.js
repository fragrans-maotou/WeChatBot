/*
 * @Author: wangwendie
 * @Date: 2023-07-14 14:10:01
 * @LastEditors: wangwendie
 * @Description:机器人登录
 */
import chalk from 'chalk';

export const onLogin = (bot, user) => {
  const botName = bot.name();
  console.log(chalk.green(
    botName, `user: ${user}`
  ));
}
