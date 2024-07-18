import React from "react";
import { useTapper } from "../stores/useTapper";

const Header = () => {
  const tapper = useTapper();

  React.useEffect(() => {
    const interval = setInterval(() => {
      tapper.updateRemain();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{padding: 10, paddingTop: 20}}>
      <div
        style={{
          padding: 10,
          paddingInline: 35,
          backgroundColor: "#fff1",
          boxShadow: "inset 0 0 0 1px #fff1",
          border: "1px solid #0008",
          borderRadius: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "900",
        }}
      >
        <div
          style={{
            fontSize: 30,
          }}
        >
          {tapper.points.toLocaleString("en-US")}
          <span
            style={{
              fontSize: 18,
              color: "#baf9",
              marginInlineStart: 10,
            }}
          >
            $DTU
          </span>
        </div>
        <div
          style={{
            fontSize: 16,
            opacity: 0.5,
            fontWeight: 'normal'
          }}
        >
          <span
            style={{ color: tapper.remain < tapper.taps ? "#f22" : "#fff" }}
          >
            {tapper.remain.toLocaleString("en-US")}
          </span>
          <span style={{ marginInline: 5 }}>•</span>
          <span style={{ opacity: 0.4 }}>
            {tapper.tank.toLocaleString("en-US")}
          </span>
          <span style={{ marginInline: 5 }}>•</span>
          x2
        </div>
      </div>
    </div>
  );
};

export default Header;
