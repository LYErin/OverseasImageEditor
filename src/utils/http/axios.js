import instance from "./index";
/**
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url
 * @param {Object} data    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */

const axios = ({ method, url, data, config }) => {
  method = method.toLowerCase();
  let result = false;
  switch (method) {
    case "post":
      result = instance.post(url, data, { ...config });
      break;
    case "get":
      result = instance.get(url, { params: data, ...config });
      break;
    case "delete":
      result = instance.delete(url, { params: data, ...config });
      break;
    case "put":
      result = instance.put(url, data, { ...config });
      break;
    default:
      console.error("未知的method" + method);
      break;
  }
  return result;
};
export default axios;
