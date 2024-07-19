import React from "react";
import { useTapper } from "../stores/useTapper";

const Footer = () => {
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
    <div style={{padding: 10, paddingBottom: 20}}>
      <div
        style={{
          zIndex: 1,
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
          fontWeight: "600",
        }}
      >
        <div>This is a footer • x2</div>  
      </div>
    </div>
  );
};

export default Footer;
