import React, {useState} from "react";

import api from "./configs/api";
import Swal from "sweetalert2";
import Loader from "./components/Loader";

import "./App.css";
import UserCard from "./components/UserCard";
import FormSearch from "./components/FormSearch";

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

  const onChangeForm = (e: React.FormEvent<HTMLInputElement>) => {
    setQ(e?.currentTarget?.value);
    setSubmitted(false);
  };

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
        setSubmitted(true);
      });
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

  const RenderContent = () => {
    if (loading) {
      return (
        <div className="h-full flex flex-col justify-center items-center">
          <Loader loading={loading} />
        </div>
      );
    }
    if (Array.isArray(items) && items?.length) {
      return items.map(
        (
          user: {
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
        ) => <UserCard user={user} key={idx} />
      );
    }
    if (!submitted) return null;
    return (
      <div className="h-full flex flex-col justify-center items-center">
        <span className="text-gray-500 font-semibold mt-4">
          Users not found
        </span>
      </div>
    );
  };

  return (
    <div className="App p-4 flex flex-col h-screen">
      <FormSearch
        onSubmit={onSearch}
        onChangeForm={onChangeForm}
        disabled={disabled}
        loading={loading}
      />
      {submitted && (
        <span className="text-gray-500 font-semibold text-left my-3">
          Showing users for “{q}”
        </span>
      )}
      <div className="mt-4 space-y-4">{RenderContent()}</div>
    </div>
  );
}

export default App;
