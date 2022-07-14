import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "../../Context/userContext";
import AppNav from "./Navbar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/timezone",
  }),
}));

describe("Navbar should render", () => {
  const user = {};
  const setUser = jest.fn();
  it("it should print logout", () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<AppNav />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    );
    const heading = screen.getByText("Timezone");
    expect(heading).toBeInTheDocument();
    const textEl = screen.getByText("Logout");
    fireEvent.click(textEl);
    expect(setUser).toBeCalled();
  });
});
