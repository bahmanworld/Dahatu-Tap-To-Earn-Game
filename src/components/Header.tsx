import React from "react";
import { useTapper } from "../stores/useTapper";

const Header = () => {
  const tapper = useTapper();

  React.useEffect(() => {
    const interval = setInterval(() => {
      tapper.updateRemain();
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        zIndex: 1,
        padding: 30,
        paddingBlock: 15,
        backgroundColor: '#fff1',
        borderRadius: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: '900',
      }}
    >
      <div
        style={{
          fontSize: 40,
          opacity: 0.7,
        }}
      >
        {tapper.points.toLocaleString("en-US")}
        <span style={{ fontSize: 25, color: '#f945', marginInlineStart: 10, fontFamily: 'BurbankBig'}}>$DTU</span>
      </div>
      <div
        style={{
          fontSize: 20,
          opacity: 0.5,
        }}
      >
        <span
          style={{ color: tapper.remain < tapper.taps ? "#f22" : "#9df" }}
        >
          {tapper.remain.toLocaleString("en-US")}
        </span>
        <span style={{ marginInline: 10 }}>•</span>
        <span style={{opacity: 0.4}}>{tapper.tank.toLocaleString("en-US")}</span>
      </div>
    </div>
  );
}

export default Header;
