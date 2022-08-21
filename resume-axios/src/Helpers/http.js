import axios from "axios";
import global from "../../../config.json";

export async function httpRequest(obj, config) {
  try {
    obj = handleRequest(obj, config);
    const res = await axios(obj);
    return res.data;
  } catch (e) {
    if ((e.response || {}).status === 401) {
      console.log(e);
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    throw e;
  }
}

// helper
const handleRequest = (obj = {}, config = {}) => {
  if (!obj.url) throw "url parameter is mandatory";
  if (!obj.method) obj.method = "POST";
  if (config.thirdparty !== true) {
    obj.url = `${global.HOST1}${obj.url}`;

    // const token = localStorage.getItem("token");

    // console.log(token);

    // if (token) {
    //   obj.headers = {
    //     Authorization: token,
    //   };
    // }
  }

  return obj;
};
