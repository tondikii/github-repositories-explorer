import axios from "axios";

const BASE_URL = "https://api.github.com";
const hashedGithubToken: string = process.env.REACT_APP_GITHUB_TOKEN || "";
const splittedGithubToken = hashedGithubToken.split("|");
splittedGithubToken.splice(1, 1);
const finalGithubToken = splittedGithubToken.join("");

const api = axios.create({
  timeout: 325000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    common: {
      Authorization: `Bearer ${finalGithubToken}`,
    },
    "X-GitHub-Api-Version": "2022-11-28",
    Accept: "application/vnd.github+jso",
  },
  baseURL: BASE_URL,
});

export default api;
