import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContext from "../../Context/userContext";
import TimeZoneModal from "./TimeZoneModal";
import { NavItem } from "react-bootstrap";

describe("TimeZoneModal should render", () => {
  const user = {};
  const setUser = jest.fn();
  const handleAddTimeZone = jest.fn();
  
  it("it should render ADD TimeZoneModal", () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <TimeZoneModal
          show={true}
          onSubmit={handleAddTimeZone}
        />
      </UserContext.Provider>
    );
    expect(screen.queryByText("Name")).toBeInTheDocument();
    expect(screen.queryByText("Add Timezone")).toBeInTheDocument();
    expect(screen.queryByText("Timezones")).toBeInTheDocument();
    const btnEl = screen.queryByText("ADD");
    expect(btnEl).toBeInTheDocument();
    fireEvent.click(btnEl);
    expect(handleAddTimeZone).toBeCalled();
  });

  it("it should render Edit TimeZoneModal", () => {
    const editData = {
        name: "EDIT"
    }
    const handleEditTimezone = jest.fn();
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <TimeZoneModal
          show={true}
          editTimezoneData={editData}
          onEditTimezone={handleEditTimezone}
        />
      </UserContext.Provider>
    );
    expect(screen.queryByText("Edit Timezone")).toBeInTheDocument();
    const btnEl = screen.queryByText("EDIT");
    expect(btnEl).toBeInTheDocument();
    fireEvent.click(btnEl);
    expect(handleEditTimezone).toBeCalled();
  });
});
