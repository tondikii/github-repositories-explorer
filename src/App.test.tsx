import {fireEvent, render, screen} from "@testing-library/react";
import App from "./App";

// Form Search
test("should renders form search", () => {
  render(<App />);
  const formSearch = screen.getByTestId("formSearch");
  expect(formSearch).toBeInTheDocument();
});
test("form search should only exists once", () => {
  render(<App />);
  const formSearchs = screen.getAllByTestId("formSearch");
  expect(formSearchs.length).toEqual(1);
});

// Input Username
test("should renders input username", () => {
  render(<App />);
  const inputUsername = screen.getByTestId("inputUsername");
  expect(inputUsername).toBeInTheDocument();
});
test("input username should only exists once", () => {
  render(<App />);
  const inputUsernames = screen.getAllByTestId("inputUsername");
  expect(inputUsernames.length).toEqual(1);
});
test("input username should named username", () => {
  render(<App />);
  const inputUsername = screen.getByTestId("inputUsername");
  expect(inputUsername).toHaveProperty("name", "username");
});

// Button Search
test("should renders button search", () => {
  render(<App />);
  const buttonSearch = screen.getByTestId("buttonSearch");
  expect(buttonSearch).toBeInTheDocument();
});
test("button search element should only exists once", () => {
  render(<App />);
  const buttonSearchs = screen.getAllByTestId("buttonSearch");
  expect(buttonSearchs.length).toEqual(1);
});
