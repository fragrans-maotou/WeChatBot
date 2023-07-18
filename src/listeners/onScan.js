/*
 * @Author: wangwendie
 * @Date: 2023-07-14 14:27:33
 * @LastEditors: wangwendie
 * @Description:终端出现二维码
 */
import { ScanStatus } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";

export const onScan = (bot, qrcode, status) => {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrcodeTerminal.generate(qrcode, { small: true });
  }
}