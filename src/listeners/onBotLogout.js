/*
 * @Author: wangwendie
 * @Date: 2023-07-14 14:17:39
 * @LastEditors: wangwendie
 * @Description:退出
 */
import chalk from 'chalk';

export const onLogout = (bot, user) => {
  const botName = bot.name();
  console.log(chalk.red(
    botName, `user: ${user}`
  ));
}