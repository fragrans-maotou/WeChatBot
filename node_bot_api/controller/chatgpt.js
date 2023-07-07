
import { Configuration, OpenAIApi } from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";
import nodeFetch from "node-fetch";

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

// const configuration = new Configuration({
//   organization: "org-nKlKYGfcVRc8LERF2H2ymqcM",
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

class ChatGPT {
  constructor() {
    this.username = "u1883940892591256+UnitedKingdom";
    this.password = "hOIunTn8HjHv";
  }

  async example (req, res, next) {
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
}


export default new ChatGPT();