import { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import TimeZoneGrid from "../../core/TimezoneGrid/TimeZoneGrid";
import "./Timezone.css";
import UserContext from "../../Context/userContext";
import { Button } from "react-bootstrap";
import TimeZoneModal from "../../core/AddTimeoneModal/TimeZoneModal";
import Spinner from "react-bootstrap/Spinner";
import { REQUEST_TYPE_GET, REQUEST_TYPE_POST } from "../../constants/common";
import { apiClient } from "../../network/apiClient";

const Timezones = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  const [userData, setUserData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [editTimezoneData, setEditTimezoneData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const { emailId } = location.state;

  const setUserTimezoneData = (timezoneData) => {
    setUserData({
      firstName: timezoneData.firstName,
      lastName: timezoneData.lastName,
      timeZone: timezoneData.timeZone,
    });
    setSearchResult(timezoneData.timeZone);
  };

  const getTimezoneData = async () => {
    try {
      const response = await apiClient({
        url: `getTimeZone/?emailId=${emailId}`,
        method: REQUEST_TYPE_GET,
      });
      setUserTimezoneData(response.user);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    getTimezoneData();
  }, []);

  const handleEditTimezone = useCallback(async ({ _id, name, timeZone }) => {
    const data = {
      emailId: emailId,
      _id,
      name,
      timeZone,
    };
    try {
      const response = await apiClient({
        url: `editTimezone`,
        method: REQUEST_TYPE_POST,
        authToken: user.jwt,
        body: data,
      });
      setModalShow(false);
      setUserTimezoneData(response);
      toast.success("Timzone Edited");
    } catch (e) {
      toast.error(e.message);
    }
  }, []);

  const handleAddTimeZone = useCallback(async ({ name, timeZone }) => {
    const data = {
      emailId: emailId,
      timeZone: {
        name,
        timeZone,
      },
    };
    try {
      const response = await apiClient({
        url: `addTimeZone`,
        method: REQUEST_TYPE_POST,
        body: data,
      });
      setModalShow(false);
      setUserTimezoneData(response);
      toast.success("Timzone Added");
    } catch (e) {
      toast.error(e.message);
    }
  }, []);

  const onDeleteTimezone = useCallback(async (timezone) => {
    try {
      const response = await apiClient({
        url: `deleteTimezone`,
        method: REQUEST_TYPE_POST,
        authToken: user.jwt,
        body: { ...timezone, emailId: emailId },
      });
      setUserTimezoneData(response);
      toast.success("Timzone Deleted");
    } catch (e) {
      toast.error(e.message);
    }
  }, []);

  useEffect(() => {
    if (editTimezoneData) {
      setModalShow(true);
    }
  }, [editTimezoneData]);

  const onEditTimezone = (timeZone) => {
    setEditTimezoneData(timeZone);
  };

  const onHandleSearch = (e) => {
    const { value } = e.target;
    const filteredData = userData.timeZone.filter((el) =>
      el.timeZone.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(filteredData);
  };

  const resetData = () => {
    setEditTimezoneData(null);
    setModalShow(true);
  };

  if (!!!userData) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const handleCloseModal = () => {
    setModalShow(false);
    setEditTimezoneData(null);
  }

  return (
    <div className="timezone-container">
      <div className="timezone-search-container">
        <div className="search-time">
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Search"
              name="search"
              onChange={onHandleSearch}
            />
          </Form.Group>
        </div>
        <div className="header-container">
          <Button variant="primary" className="btn-class" name="addTimezone" onClick={resetData}>
            Add Time Zone
          </Button>

          <TimeZoneModal
            show={modalShow}
            onSubmit={handleAddTimeZone}
            handleClose={handleCloseModal}
            editTimezoneData={editTimezoneData}
            onEditTimezone={handleEditTimezone}
          />
        </div>
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Search"
              name="search"
              onChange={onHandleSearch}
            />
          </Form.Group>
      <div className="timezone-grid-container">
        {userData === null && (
          <div className="spinner-container">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {searchResult && searchResult?.length > 0 ? (
          <TimeZoneGrid
            timeZones={searchResult}
            onDeleteTimezone={onDeleteTimezone}
            onEditTimezone={onEditTimezone}
          />
        ) : (
          <div className="no-timezone">
            <h2>{`${userData.firstName} ${userData.lastName}, Timezone is not added. Please add timezone`}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export { Timezones };
