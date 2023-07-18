import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';


/**
 * 将时间戳解析为字符串时间
 * @param {(Object|string|number)} time
 * @param {string}  cFormat=”{y}-{m}-{d} {h}:{i}:{s}“
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}


export function getSrcDirectory(filePath){
  let arrayFilePathName = filePath.split("/");
  // 获取当前模块的文件 URL
  const currentFileUrl = import.meta.url;
  // 将文件 URL 转换为文件路径
  const currentFilePath = fileURLToPath(currentFileUrl);
  // 获取当前路径 util
  const currentDirectory = dirname(currentFilePath);
  // 获取上级目录路径src
  const parentDirectory = resolve(currentDirectory, '..');
  // 获取传递的路劲
  const fileDirectory = resolve(parentDirectory, ...arrayFilePathName);
  console.log('当前 路径:', fileDirectory);
  return fileDirectory;
  
}