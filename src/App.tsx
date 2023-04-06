import React, {useEffect, useState} from "react";

import api from "./configs/api";
import Swal from "sweetalert2";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
} from "@mui/icons-material";

import "./App.css";

function App() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<
    {
      login: string | null;
      repositories:
        | {name: string; description: string | null; stargazers_count: number}[]
        | null;
    }[]
  >([]);
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
      });
      const tempPromises: Promise<{
        login: string | null;
        repositories:
          | {
              name: string;
              description: string | null;
              stargazers_count: number;
            }[]
          | null;
      }>[] = [];
      data?.items?.forEach((e: {login: string | null}) => {
        const getRepositories: Promise<{
          login: string | null;
          repositories:
            | {
                name: string;
                description: string | null;
                stargazers_count: number;
              }[]
            | null;
        }> = new Promise(async (resolve, reject) => {
          try {
            const dataRepositories = await api.get(`/users/${e?.login}/repos`);
            const repositories:
              | {
                  name: string;
                  description: string | null;
                  stargazers_count: number;
                }[]
              | [] = dataRepositories?.data;
            const login: string = e?.login || "";
            resolve({login, repositories: repositories});
          } catch (error) {
            console.error(error);
            reject({...e, repositories: null});
          }
        });
        tempPromises.push(getRepositories);
      });
      Promise.all(tempPromises).then((result) => {
        setItems(result);
      });
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

  // useEffect(() => {
  //   console.log({items});
  // }, [items]);

  const RenderContent = () => {
    if (Array.isArray(items) && items?.length) {
      return items.map(
        (
          e: {
            login: string | null;
            repositories:
              | {
                  name: string;
                  description: string | null;
                  stargazers_count: number;
                }[]
              | null;
          },
          idx: number
        ) => (
          <Accordion className="bg-gray-200 shadow-none rounded-none" key={idx}>
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon className="font-bold w-9 h-9 text-black" />
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <span className="font-semibold">{e?.login}</span>
            </AccordionSummary>
            <AccordionDetails className="bg-white">
              <div className="flex flex-col space-y-3 mt-1">
                {e?.repositories?.map(
                  (
                    repository: {
                      name: string;
                      description: string | null;
                      stargazers_count: number;
                    },
                    idx2: number
                  ) => (
                    <div
                      className="bg-gray-300 px-2 pt-4 pb-12 flex flex-row justify-between w-100"
                      key={idx2}
                    >
                      <div className="flex flex-col items-start">
                        <strong className="text-lg">
                          {repository?.name || "-"}
                        </strong>
                        <span className="text-sm font-medium text-justify">
                          {repository?.description || "No description"}
                        </span>
                      </div>
                      <div className="flex flex-row h-fit items-center px-1">
                        <strong className="text-lg mr-1">
                          {repository?.stargazers_count}
                        </strong>
                        <StarIcon className="font-bold w-6 h-6 text-black" />
                      </div>
                    </div>
                  )
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        )
      );
    }
    if (!submitted) return null;
    return (
      <span className="text-gray-500 font-semibold mt-4">Users not found</span>
    );
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
          <span className="text-gray-500 font-semibold text-left my-3">
            Showing users for “{q}”
          </span>
        )}
        <div className="mt-4 space-y-4">{RenderContent()}</div>
      </div>
    </div>
  );
}

export default App;
