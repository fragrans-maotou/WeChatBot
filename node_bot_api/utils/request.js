import axios from "axios";

const service = axios.create({
  // baseURL: "http://localhost:8001",
  // 超时时间 单位是ms，这里设置了50s的超时时间
  timeout: 50000
});

const handleConfig = (config) => {
  // get config.params
  // post config.data
  if (config.method == "post") {
    config.data = config.params;
  }
  return config;
};

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求,对传递的数据进行解析
    config = handleConfig(config);
    return config;
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (err) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    return Promise.reject(err);
  }
);


export default service;