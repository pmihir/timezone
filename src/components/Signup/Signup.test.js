import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import UserContext from "../../Context/userContext";
import Signup from "./Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as network from "../../network/apiClient";
import { act } from "react-dom/test-utils";

describe("Singup component render", () => {
  const user = {};
  const setUser = jest.fn();
  it("it should render form elements", async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      )
    );
    expect(screen.queryByText("First Name")).toBeInTheDocument();
    expect(screen.queryByText("Last Name")).toBeInTheDocument();
    expect(screen.queryByText("Email address")).toBeInTheDocument();
    expect(screen.queryByText("Password")).toBeInTheDocument();
    const btnEl = screen.getByRole("button", { name: "Create Account" });
    expect(btnEl).toBeInTheDocument();
    fireEvent.click(btnEl);
  });

  it("it shoule fire event on input", async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      )
    );
    const firstInpuEl = screen.getByPlaceholderText("First Name");
    fireEvent.change(firstInpuEl, { target: { value: 'firstname'}});
    expect(firstInpuEl.value).toEqual('firstname');
    const lastNameEl = screen.getByPlaceholderText("Last Name");
    fireEvent.change(lastNameEl, { target: { value: 'lastname'}});
    expect(lastNameEl.value).toEqual('lastname');
    const emailEl = screen.getByPlaceholderText("Enter email");
    fireEvent.change(emailEl, { target: { value: 'enteremail'}});
    expect(emailEl.value).toEqual('enteremail');
    const passwordEl = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordEl, { target: { value: 'passwordenter'}});
    expect(passwordEl.value).toEqual('passwordenter');
  });
});
