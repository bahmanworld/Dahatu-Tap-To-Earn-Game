import React from "react";
import { useTapper } from "../stores/useTapper";

function Details() {
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
    <div
      style={{
        zIndex: 1,
        position: "fixed",
        top: 20,
        right: 20,
        left: 20,
        padding: 10,
        paddingTop: 15,
        backgroundColor: '#fff1',
        borderRadius: 100,
        margin: 0,
        display: "flex",
        alignSelf: 'center',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: '900'
      }}
    >
      <div
        style={{
          fontSize: 40,
          opacity: 0.7,
        }}
      >
        {tapper.points.toLocaleString("fa-IR")}
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
          {tapper.remain.toLocaleString("fa-IR")}
        </span>
        <span style={{ marginInline: 10 }}>•</span>
        <span style={{opacity: 0.4}}>{tapper.tank.toLocaleString("fa-IR")}</span>
      </div>
    </div>
  );
}

export default React.memo(Details);
