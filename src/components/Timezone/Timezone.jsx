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
      <div className="timezone-grid-container">
        {userData === null && <div className="spinner-container"><Spinner animation="border" variant="primary" /></div>}
        {userData && userData?.timeZone?.length > 0 ? (
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
