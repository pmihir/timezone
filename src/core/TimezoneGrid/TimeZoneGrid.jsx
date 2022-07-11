import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import TimeClock from "../TimeClock/TimeClock";
import "./TimezoneGrid.css";

const TimeZoneGrid = ({ timeZones, onDeleteTimezone, onEditTimezone }) => {
  return (
    <>
      {timeZones.map((timeZone, index) => {
        return (
          <Card key={index} style={{ width: "250px" }}>
            <Card.Header>{timeZone.name}</Card.Header>
            <Card.Body>
              <Card.Title>{timeZone.timeZone}</Card.Title>
              <Card.Text>
                <TimeClock timeZone={timeZone.timeZone} />
              </Card.Text>
              <div className="card-btn">
                <Button variant="primary" onClick={() => onEditTimezone(timeZone)}>Edit</Button>
                <Button
                  variant="primary"
                  onClick={() => onDeleteTimezone(timeZone)}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
};

export default TimeZoneGrid;
