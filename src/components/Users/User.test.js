import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import UserContext from "../../Context/userContext";
import Users from "./Users";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as network from "../../network/apiClient";

const getAllData = jest.spyOn(network, "apiClient");

beforeEach(() => {
  getAllData.mockResolvedValue(
    Promise.resolve({
      userData: [
        {
          firstName: "test1",
          lastName: "testTwo",
          emailId: "test@gmail.com",
        },
      ],
    })
  );
})

describe("Users should Users", () => {
  
  const user = {};
  const setUser = jest.fn();
  it("User table should load data", async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Users />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      )
    );
    expect(screen.queryByText("test1")).toBeInTheDocument();
    expect(screen.queryByText("testTwo")).toBeInTheDocument();
    expect(screen.queryByText("test@gmail.com")).toBeInTheDocument();
    const btnEl = screen.getByText("Delete User");
    fireEvent.click(btnEl);
  });
});
