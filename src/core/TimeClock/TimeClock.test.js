import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import UserContext from "../../Context/userContext";
import TimeClock from "./TimeClock";

describe("Timeclock should render", () => {
  const user = {};
  const setUser = jest.fn();
  
  it("it should render GTM time difference", () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <TimeClock
          timeZone='Asia/Kolkata'
        />
      </UserContext.Provider>
    );
    expect(screen.queryByText("(GMT+5:30)")).toBeInTheDocument();
  });
});