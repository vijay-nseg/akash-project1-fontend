import axios from "axios";
import config from "config";
const axiosClient = axios.create({
  baseURL: "http://localhost:3000/",
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type":
  //     "multipart/form-data; boundary=<calculated when request is sent>",
  // },
});

// axiosClient.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     let res = error.response;
//     if (res.status == 401) {
//       alert(error);
//       return (window.location.href = "/session/signin");
//     }
//     console.error("Looks like there was a problem. Status Code: " + res.status);
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
