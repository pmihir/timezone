import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import UserContext from "../../Context/userContext";
import { Login } from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as network from "../../network/apiClient";
import { act } from "react-dom/test-utils";

const getAllData = jest.spyOn(network, "apiClient");

beforeEach(() => {
  getAllData.mockResolvedValue(
    Promise.resolve({
      user: {
        emailId: "test@example.com",
        token: "testTwo",
        role: 2,
      },
    })
  );
});

describe("Login component render", () => {
  const user = {};
  const setUser = jest.fn();
  it("User table should load data", async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      )
    );
    expect(screen.queryByText("Email address")).toBeInTheDocument();
    expect(screen.queryByText("Password")).toBeInTheDocument();
    const btnEl = screen.getByRole("button", { name: "Login" });
    expect(btnEl).toBeInTheDocument();
    fireEvent.click(btnEl);
  });

  it("it shoule fire event on input", async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      )
    );
    const inputEl = screen.getByPlaceholderText("Enter email");
    fireEvent.change(inputEl, { target: { value: 'sample'}});
    expect(inputEl.value).toEqual('sample');
    const passwordEl = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordEl, { target: { value: 'password'}});
    expect(passwordEl.value).toEqual('password');
  });
});
