import { React, useState, useEffect } from "react";
import "../css/Clock.css";

export default function Clock() {
  const [time, setTime] = useState({
    IST: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    EST: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    JST: new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
    CST: new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }),
    CET: new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" }),
    HKT: new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime({
        IST: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        EST: new Date().toLocaleString("en-US", {
          timeZone: "America/New_York",
        }),
        JST: new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }),
        CST: new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" }),
        CET: new Date().toLocaleString("en-US", {
          timeZone: "Europe/Amsterdam",
        }),
        HKT: new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-container">
      <div className="clock-row">
        <div className="clock">
          <h1 className="time-display">
            {new Date(time.IST).toLocaleTimeString()}
          </h1>
          <p className="timezone">IST (India)</p>
        </div>
        <div className="clock">
          <h1 className="time-display">
            {new Date(time.EST).toLocaleTimeString()}
          </h1>
          <p className="timezone">EST (USA)</p>
        </div>
        <div className="clock">
          <h1 className="time-display">
            {new Date(time.JST).toLocaleTimeString()}
          </h1>
          <p className="timezone">JST (Japan)</p>
        </div>
      </div>
      <div className="clock-row">
        <div className="clock">
          <h1 className="time-display">
            {new Date(time.CST).toLocaleTimeString()}
          </h1>
          <p className="timezone">CST (China)</p>
        </div>
        <div className="clock">
          <h1 className="time-display">
            {new Date(time.CET).toLocaleTimeString()}
          </h1>
          <p className="timezone">CET (Netherlands)</p>
        </div>
        <div className="clock">
          <h1 className="time-display">
            {new Date(time.HKT).toLocaleTimeString()}
          </h1>
          <p className="timezone">HKT (Hong Kong)</p>
        </div>
      </div>
    </div>
  );
}
