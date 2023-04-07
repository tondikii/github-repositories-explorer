import {render, screen} from "@testing-library/react";
import App from "./App";
import Loader from "./components/Loader";
import RepositoryCard from "./components/RepositoryCard";
import UserCard from "./components/UserCard";

const user: {
  login: string | null;
  repositories:
    | {
        name: string;
        description: string | null;
        stargazers_count: number;
      }[]
    | null;
} = {
  login: "tondikii",
  repositories: [
    {
      name: "github-repositories-explorer",
      description:
        "This is a project recruitment test at PT. Atask Teknologi Internasional using Create React APP",
      stargazers_count: 0,
    },
  ],
};
const repository: {
  name: string;
  description: string | null;
  stargazers_count: number;
} = {
  name: "github-repositories-explorer",
  description:
    "This is a project recruitment test at PT. Atask Teknologi Internasional using Create React APP",
  stargazers_count: 0,
};
const key: number = 1;

const loading: boolean = true;

// Form Search
test("should renders Form Search", () => {
  render(<App />);
  const formSearch = screen.getByTestId("formSearch");
  expect(formSearch).toBeInTheDocument();
});
test("Form Search should only exists once", () => {
  render(<App />);
  const formSearchs = screen.getAllByTestId("formSearch");
  expect(formSearchs.length).toEqual(1);
});

// Input Username
test("should renders Input Username", () => {
  render(<App />);
  const inputUsername = screen.getByTestId("inputUsername");
  expect(inputUsername).toBeInTheDocument();
});
test("Input Username should only exists once", () => {
  render(<App />);
  const inputUsernames = screen.getAllByTestId("inputUsername");
  expect(inputUsernames.length).toEqual(1);
});
test("Input Username should named username", () => {
  render(<App />);
  const inputUsername = screen.getByTestId("inputUsername");
  expect(inputUsername).toHaveProperty("name", "username");
});

// Button Search
test("should renders Button Search", () => {
  render(<App />);
  const buttonSearch = screen.getByTestId("buttonSearch");
  expect(buttonSearch).toBeInTheDocument();
});
test("Button Search element should only exists once", () => {
  render(<App />);
  const buttonSearchs = screen.getAllByTestId("buttonSearch");
  expect(buttonSearchs.length).toEqual(1);
});

// User Card
test("should renders User Card while user data available", () => {
  render(<UserCard user={user} key={key} />);
  const userCard = screen.getByTestId("userCard");
  expect(userCard).toBeInTheDocument();
});
test("User Card should renders User Login", () => {
  render(<UserCard user={user} key={key} />);
  const userCardTitle = screen.getByTestId("userCardLogin");
  expect(userCardTitle).toBeInTheDocument();
});

// Loader
test("should renders Loader while loading state true", () => {
  render(<Loader loading={loading} />);
  const loader = screen.getByTestId("loader");
  expect(loader).toBeInTheDocument();
});
test("Loader element should only exists once while loading state true", () => {
  render(<Loader loading={loading} />);
  const loaders = screen.getAllByTestId("loader");
  expect(loaders.length).toEqual(1);
});

// Repository Card
test("should renders Repository Card while repository data available", () => {
  render(<RepositoryCard repository={repository} key={key} />);
  const repositoryCard = screen.getByTestId("repositoryCard");
  expect(repositoryCard).toBeInTheDocument();
});
test("Repository Card should renders Repository Title", () => {
  render(<RepositoryCard repository={repository} key={key} />);
  const repositoryCardTitle = screen.getByTestId("repositoryCardTitle");
  expect(repositoryCardTitle).toBeInTheDocument();
});
test("Repository Card should renders Repository Description", () => {
  render(<RepositoryCard repository={repository} key={key} />);
  const repositoryCardDescription = screen.getByTestId(
    "repositoryCardDescription"
  );
  expect(repositoryCardDescription).toBeInTheDocument();
});
test("Repository Card should renders Stargazer Count", () => {
  render(<RepositoryCard repository={repository} key={key} />);
  const repositoryCardStargazerCount = screen.getByTestId(
    "repositoryCardStargazerCount"
  );
  expect(repositoryCardStargazerCount).toBeInTheDocument();
});
test("Repository Card should renders Stargazer Icon", () => {
  render(<RepositoryCard repository={repository} key={key} />);
  const repositoryCardStargazerIcon = screen.getByTestId(
    "repositoryCardStargazerIcon"
  );
  expect(repositoryCardStargazerIcon).toBeInTheDocument();
});
