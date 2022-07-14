import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import UserContext from "../../Context/userContext";
import {Timezones} from "./Timezone";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as network from "../../network/apiClient";

const getAllData = jest.spyOn(network, "apiClient"); 

beforeEach(() => {
  getAllData.mockResolvedValue(
    Promise.resolve({
      user: 
        {
          firstName: "test1",
          lastName: "testTwo",
          timeZone: [
            {
                name: 'Asia',
                timeZone: 'Asia/Kolkata'
            },
            {
                name: 'Kabul',
                timeZone: 'Asia/Kabul'
            }
          ],
        }
    })
  );
});

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      state: {
        emailId: 'abc@example.com',
      },
    }),
  }));

describe("Should render Timzone component", () => {
  const user = {};
  const setUser = jest.fn();
  it("it should render different timzones", async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Timezones />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      )
    );
    expect(screen.queryByText("Asia")).toBeInTheDocument();
    expect(screen.queryByText("Asia/Kolkata")).toBeInTheDocument();
    expect(screen.queryByText("Kabul")).toBeInTheDocument();
    expect(screen.queryByText("Asia/Kabul")).toBeInTheDocument();
  });

  it("it should called function on button click", async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Timezones />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      )
    );
    const btnEl = screen.queryAllByRole("button", { name: "Delete" })[0];
    fireEvent.click(btnEl);
    const editEl = screen.queryAllByRole("button", { name: "Edit" })[0];
    fireEvent.click(editEl);
    const editTime = screen.getByText('EDIT');
    fireEvent.click(editTime);
  });

  it("it should add Timezone", async () => {
    await act(async () =>
      render(
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="*" element={<Timezones />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      )
    );
    const addTimezoneEl = screen.getByText('Add Time Zone');
    fireEvent.click(addTimezoneEl);
    const editTime = screen.getByText('ADD');
    fireEvent.click(editTime);
  });
});
