// import { BingChat } from 'bing-chat';
import { HttpsProxyAgent } from "https-proxy-agent";
import nodeFetch from "node-fetch";
import request from "../utils/request.js";
class ChatGPT {
  constructor() {

  }

  async OpenAI2DChatGPT (req, res, next) {
    const { text } = req.query;
    const apiKey = process.env.OPENAI_API2D_KEY; // 替换为你的 OpenAI API 密钥
    console.log("apiKey", apiKey);
    const postData = JSON.stringify({
      model: 'gpt-3.5-turbo',
      "max_tokens": 150,
      messages: [{ role: 'user', content: text }],
    });
    const openapi2d = "https://openai.api2d.net/v1/chat/completions";
    const result = await request({
      url: openapi2d,
      method: "post",
      params: postData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`, // <-- 把 fkxxxxx 替换成你自己的 Forward Key，注意前面的 Bearer 要保留，并且和 Key 中间有一个空格。
      },
    });
    let assistantMessage = "";
    console.log("result", result.choices[0].message);
    try {
      if (result.choices) {
        assistantMessage = result.choices[0].message?.content.replace(/^\n+|\n+$/g, "");
      } else {
        console.log(`Something went wrong,Code: ${result.status}, ${result.statusText}`);
      }
    } catch (err) {
      if (err.request) {
        console.log("请求出错");
      }
    }

    console.log(assistantMessage);
    res.send({
      code: 200,
      message: '请求成功',
      result: assistantMessage
    });
  }

  async OpenAIChatGPT (req, res, next) {
    console.log(apiKey);

    const proxyUrl = "http://u1883940892591256+France:hOIunTn8HjHv@54.174.101.70:36000"; // 代理服务器的地址和端口
    const apiKey = process.env.OPENAI_API_KEY; // 替换为你的 OpenAI API 密钥
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    // 创建代理对象
    const proxyAgent = new HttpsProxyAgent(proxyUrl);

    // 准备请求数据
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello world" }],
    };

    // 发起请求
    nodeFetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestData),
      agent: proxyAgent, // 设置代理对象
    })
      .then((response) => response.json())
      .then((data) => {
        // 处理响应数据
        console.log(data);
      })
      .catch((error) => {
        // 处理错误
        console.error(error);
      });
    // const completion = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: "Hello world" }],
    // });

    // console.log(completion.data.choices[0].message);

    // let assistantMessage = "";
    // try {
    //   if (response.status === 200) {
    //     assistantMessage = response.data.choices[0].message?.content.replace(/^\n+|\n+$/g, "");
    //   } else {
    //     console.log(`Something went wrong,Code: ${response.status}, ${response.statusText}`)
    //   }
    // } catch (err) {
    //   if (err.request) {
    //     console.log("请求出错");
    //   }
    // }
    // return assistantMessage;
    // const result = await api.sendMessage('你好')
    // console.log(assistantMessage)
  }

  async BingChatGPT (req, res, next) {
    const api = new BingChat({
      cookie: process.env.BING_COOKIE
    });

    const result = await api.sendMessage('Hello World!');
    console.log(result.text);
  }
}


export default new ChatGPT();