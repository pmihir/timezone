import Clock from "react-live-clock";
import { format } from "date-fns-tz";

const TimeClock = ({ timeZone }) => {
  const outputFormat = "(zzz)";
  const output = format(new Date(), outputFormat, { timeZone });

  return (
    <>
      <Clock
        format={"HH:mm:ss"}
        ticking={true}
        timezone={timeZone}
      />
   <div>
        <span>{output}</span>
        </div>
    </>
  );
};

export default TimeClock;
