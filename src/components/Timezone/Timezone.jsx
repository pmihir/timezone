import { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import TimeZoneGrid from "../../core/TimezoneGrid/TimeZoneGrid";
import "./Timezone.css";
import UserContext from "../../Context/userContext";
import { Button } from "react-bootstrap";
import TimeZoneModal from "../../core/AddTimeoneModal/TimeZoneModal";
import Spinner from 'react-bootstrap/Spinner';

const Timezones = () => {
  const [userData, setUserData] = useState(null);
  const { user } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [editTimezoneData, setEditTimezoneData] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const location = useLocation();
  const { emailId } = location.state;

  useEffect(() => {
    fetch(`http://localhost:5000/user/getTimeZone/?emailId=${emailId}`)
      .then((data) => data.json())
      .then((response) => {
        setUserData({
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          timeZone: response.user.timeZone,
        });
        setSearchResult(response.user.timeZone)
      });
  }, []);

  const handleEditTimezone = async ({ _id, name, timeZone }) => {
    const data = {
      emailId: emailId,
      _id,
      name,
      timeZone,
    };
    const response = await fetch("http://localhost:5000/user/editTimezone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responeData = await response.json();
    if (response.status === 200) {
      setModalShow(false);
      setUserData((userdata) => {
        return {
          ...userdata,
          timeZone: responeData.timeZone,
        };
      });
      setSearchResult(responeData.timeZone)
    } else {
      toast.error(responeData.message);
    }
  };

  const handleAddTimeZone = async ({ name, timeZone }) => {
    const data = {
      emailId: emailId,
      timeZone: {
        name,
        timeZone,
      },
    };
    const response = await fetch("http://localhost:5000/user/addTimeZone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responeData = await response.json();
    if (response.status === 200) {
      setModalShow(false);
      setUserData((userdata) => {
        return {
          ...userdata,
          timeZone: responeData.timeZone,
        };
      });
      setSearchResult(responeData.timeZone)
    } else {
      toast.error(responeData.message);
    }
  };

  const onDeleteTimezone = async (timezone) => {
    const response = await fetch("http://localhost:5000/user/deleteTimezone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${user.jwt}`,
      },
      body: JSON.stringify({
        ...timezone,
        emailId: emailId,
      }),
    });
    const responeData = await response.json();
    if (response.status === 200) {
      setUserData((userdata) => {
        return {
          ...userdata,
          timeZone: responeData.timeZone,
        };
      });
      setSearchResult(responeData.timeZone)
    } else {
      toast.error(responeData.message);
    }
  };

  useEffect(() => {
    if (editTimezoneData) {
      setModalShow(true);
    }
  }, [editTimezoneData]);

  const onEditTimezone = (timeZone) => {
    setEditTimezoneData(timeZone);
  };

  const onHandleSearch=(e)=>{
    const { name, value } = e.target;
    const filteredData = userData.timeZone.filter((el) => {
      if (value === '') {
          return el;
      }
      else {
          return el.timeZone.toLowerCase().includes(value.toLowerCase())
      }
    })
    setSearchResult(filteredData);
  }

  const resetData = () => {
    setEditTimezoneData(null);
    setModalShow(true);
  }

  if (!!!userData) {
    return <div className="spinner-container"><Spinner animation="border" variant="primary" /></div>;
  }

  return (
    <div className="timezone-container">
      <div className="header-container">
        <Button
          variant="primary"
          className="btn-class"
          onClick={() => resetData()}
        >
          Add Time Zone
        </Button>

        <TimeZoneModal
          show={modalShow}
          onSubmit={handleAddTimeZone}
          handleClose={() => setModalShow(false)}
          editTimezoneData={editTimezoneData}
          onEditTimezone={handleEditTimezone}
        />
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
        {userData === null && <div className="spinner-container"><Spinner animation="border" variant="primary" /></div>}
        {searchResult && searchResult?.length > 0 ? (
          <TimeZoneGrid
            timeZones={userData.timeZone}
            onDeleteTimezone={onDeleteTimezone}
            onEditTimezone={onEditTimezone}
          />
        ) : (
          <div className="no-timezone">
            <h2>{`${userData.firstName} ${userData.lastName}, no Timezone is added to the list`}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export { Timezones };
