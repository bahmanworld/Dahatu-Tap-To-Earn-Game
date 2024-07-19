import React from "react";
import { useTapper } from "../stores/useTapper";
import {motion} from 'framer-motion'

function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue;
}

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
    <div style={{ padding: 10, paddingTop: 20 }}>
      <div
        style={{
          padding: 20,
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: -2,
          }}
        >
          <div
            style={{
              fontSize: 40,
              marginInline: 10,
              position: "relative",
              top: -3,
            }}
          >
            {tapper.points.toLocaleString("en-US")}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#baf9",
            }}
          >
            $DTU
          </div>
        </div>
        <div
            style={{
              paddingBlock: 3,
              paddingInline: 10,
              borderRadius: 5,
              fontSize: 14,
              marginBottom: 10,
              fontWeight: "normal",
              backgroundColor: "#fff2",
              boxShadow: "inset 0 0 0 1px #fff2",
              border: "1px solid #000",
            }}
          >
            <motion.span
            animate={{ opacity: 0.3 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration : 1 }}
              style={{
                position: 'relative',
                display: 'inline-block',
                width: 6,
                height: 6,
                marginInlineEnd: 5,
                top: -1,
                backgroundColor: "#fa8",
                boxShadow: '0 0 5px #f9a',
                borderRadius: 10,
              }}
            ></motion.span>
            Level #1
          </div>
        <div
          style={{
            opacity: 0.5,
            fontWeight: "normal",
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
        </div>
        <div
          style={{
            width: "100%",
            height: 6,
            borderRadius: 100,
            marginTop: 10,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#fff2",
          }}
        >
          <div
            style={{
              transition: "all 0.5s ease",
              width: `${percentage(tapper.remain, tapper.tank)}%`,
              height: "100%",
              borderRadius: 100,
              backgroundColor: "#fff9",
              backgroundImage:
                "linear-gradient( 90deg, rgba(233,245,0,1) 29.5%, rgba(23,255,17,1) 45.8%, rgba(29,255,255,1) 61.5%, rgba(202,100,253,1) 92.4% )",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
