import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { timeZone } from "../../constants/TimeZones";
import { useEffect, useState } from "react";

const TimeZoneModal = (props) => {
  const { onSubmit, handleClose, onEditTimezone, editTimezoneData, ...rest } =
    props;
  const [selectedTimezone, setSelectedTimezone] = useState(
    editTimezoneData?.timeZone || ""
  );
  const [name, setName] = useState(editTimezoneData?.name || "");

  let btnName = editTimezoneData ? "Edit" : "Add";

  const handleOnChange = (e) => {
    setSelectedTimezone(e.target.value);
  };

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (editTimezoneData) {
      btnName = editTimezoneData ? "Edit" : "Add";
      setName(editTimezoneData.name);
      setSelectedTimezone(editTimezoneData.timeZone);
    } else {
      setName("");
      setSelectedTimezone("");
    }
  }, [editTimezoneData]);

  const onAddHandler = () => {
    const submitData = {
      name: name,
      timeZone: selectedTimezone,
    };
    onSubmit(submitData);
    setName("");
    setSelectedTimezone("");
  };

  const onEditHandler = () => {
    onEditTimezone({
      _id: editTimezoneData._id,
      name,
      timeZone: selectedTimezone,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (editTimezoneData) {
      onEditHandler();
    } else {
      onAddHandler();
    }
  };

  return (
    <>
      <Modal
        {...rest}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-90w"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {`${btnName} Timezone`}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmitHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={changeNameHandler}
                placeholder="Add Name"
                required={true}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Timezones</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleOnChange}
                value={selectedTimezone}
                required={true}
              >
                <option value="">Select Timezone</option>
                {timeZone.map((zone, index) => (
                  <option key={index}>{zone}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {editTimezoneData ? (
              <Button type="submit">EDIT</Button>
            ) : (
              <Button type="submit">ADD</Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default TimeZoneModal;
