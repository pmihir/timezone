import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import UserContext from "../../Context/userContext";
import TimeZoneGrid from "./TimeZoneGrid";

describe("TimeZoneGrid should render", () => {
  const user = {};
  const setUser = jest.fn();
  const onEditTimezone = jest.fn();
  const onDeleteTimezone = jest.fn();
  const timeZoneArr = [{
    name: 'Asia',
    timeZone: 'Asia/Kolkata'
  }]
  
  it("it should render Timezone Grid", () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <TimeZoneGrid
          timeZones={timeZoneArr}
          onEditTimezone={onEditTimezone}
          onDeleteTimezone={onDeleteTimezone}
        />
      </UserContext.Provider>
    );
    expect(screen.queryByText("Asia")).toBeInTheDocument();
    expect(screen.queryByText("Asia/Kolkata")).toBeInTheDocument();
    expect(screen.queryByText("(GMT+5:30)")).toBeInTheDocument();
    const editEl = screen.getByText("Edit");
    fireEvent.click(editEl);
    expect(onEditTimezone).toBeCalled();
    const deleteEl = screen.getByText("Delete");
    fireEvent.click(deleteEl);
    expect(onDeleteTimezone).toBeCalled();
  });
});