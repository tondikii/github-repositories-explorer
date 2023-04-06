import React from "react";

import {useState} from "react";
import "./App.css";
import api from "./configs/api";
import Swal from "sweetalert2";
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

function App() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<object[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const disabled = loading || !q;

  const onSearch = async (e: React.SyntheticEvent) => {
    try {
      if (disabled) return;
      setLoading(true);
      e.preventDefault();
      const params: {q?: string; per_page: number} = {
        q,
        per_page: 5,
      };
      const {data} = await api.get(`/search/users`, {
        params,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
          Accept: "application/vnd.github+jso",
        },
      });
      setItems(data?.items);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed search user!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="p-4 flex flex-col">
        <form
          onSubmit={onSearch}
          data-testid="formSearch"
          className="w-100 flex flex-col"
        >
          <input
            onChange={(e) => {
              setQ(e?.target?.value);
              setSubmitted(false);
            }}
            name="username"
            type="text"
            placeholder="Enter username"
            className="mb-4"
            data-testId="inputUsername"
          />
          <button
            type="submit"
            data-testId="buttonSearch"
            disabled={disabled}
            className={`${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>
        {submitted && (
          <span className="text-gray-500 font-medium text-left my-3">
            Showing users for “{q}”
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
