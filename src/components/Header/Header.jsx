import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TimeZoneModal from "../../core/TimeZoneModal";
import "./Header.css";

const Header = ({ handleAddTimeZone }) => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const onSubmit = ({ name, timeZone }) => {
    setModalShow(false);
    handleAddTimeZone({ name, timeZone });
  };

  return (
    <div className="header-container">
      <Button
        variant="primary"
        className="btn-class"
        onClick={() => setModalShow(true)}
      >
        Add Time Zone
      </Button>


      <TimeZoneModal
        show={modalShow}
        onSubmit={onSubmit}
        handleClose={() => setModalShow(false)}
      />
    </div>
  );
};

export default Header;
