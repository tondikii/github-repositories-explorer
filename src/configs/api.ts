import axios from "axios";

const BASE_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const api = axios.create({
  timeout: 325000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    common: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    "X-GitHub-Api-Version": "2022-11-28",
    Accept: "application/vnd.github+jso",
  },
  baseURL: BASE_URL,
});

export default api;
