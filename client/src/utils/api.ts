import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // change when deploying
});

// Add JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
api.ts
// import axios from "axios";   // no spaces before this line

// const USE_MOCK = true; // 🔹 toggle mock mode

// const realApi = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export const api = USE_MOCK
//   ? {
//       post: async (url: string, data: any) => {
//         if (url.includes("signup")) {
//           return { data: { message: "OTP sent to email" } };
//         }
//         if (url.includes("verify-otp")) {
//           return { data: { token: "fake-jwt", user: data } };
//         }
//         if (url.includes("login")) {
//           return { data: { message: "OTP sent" } };
//         }
//         if (url.includes("login/verify")) {
//           return { data: { token: "fake-jwt", user: { email: data.email } } };
//         }
//         if (url.includes("notes")) {
//           return { data: [{ _id: "1", content: "Mock note created" }] };
//         }
//         return { data: {} };
//       },
//       get: async (url: string) => {
//         if (url.includes("notes")) {
//           return {
//             data: [
//               { _id: "1", content: "Finish React project" },
//               { _id: "2", content: "Prepare for internship" },
//             ],
//           };
//         }
//         return { data: [] };
//       },
//       delete: async (url: string) => {
//         return { data: { message: "Mock note deleted" } };
//       },
//     }
//   : realApi;
//   export default api;