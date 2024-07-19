import React from "react";
import { useTapper } from "../stores/useTapper";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue;
}

const Header = () => {
  const tapper = useTapper();

  React.useEffect(() => {
    const interval = setInterval(() => {
      tapper.updateRemain();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
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
            marginBottom: -10,
          }}
        >
          <div
            style={{
              fontSize: 50,
              marginInline: 10,
              fontWeight: '600',
              position: "relative",
              top: -6,
            }}
          >
            {tapper.points}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#baf6",
            }}
          >
            $DTU
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            marginTop: 5
          }}
        >
          <div
            style={{
              paddingBlock: 3,
              paddingInline: 10,
              borderRadius: 5,
              fontSize: 14,
              fontWeight: "normal",
              backgroundColor: "#fff2",
              boxShadow: "inset 0 0 0 1px #fff2",
              border: "1px solid #000",
            }}
          >
            <motion.span
              animate={{ opacity: 0.3 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
              }}
              style={{
                position: "relative",
                display: "inline-block",
                width: 6,
                height: 6,
                marginInlineEnd: 5,
                top: -1,
                backgroundColor: "#fa8",
                boxShadow: "0 0 5px #f9a",
                borderRadius: 10,
              }}
            ></motion.span>
            Level #3
          </div>
          <div
            style={{
              paddingBlock: 3,
              paddingInline: 10,
              borderRadius: 5,
              fontSize: 14,
              fontWeight: "normal",
              backgroundColor: "#fff2",
              boxShadow: "inset 0 0 0 1px #fff2",
              border: "1px solid #000",
            }}
          >
            Speed x3
          </div>
        </div>
        <div
          style={{
            opacity: 0.8,
            fontWeight: "normal",
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <span>
            <Zap size={18} color="#fa2" />
          </span>
          <span
            style={{ color: tapper.remain < tapper.taps ? "#f22" : "#fff" }}
          >
            {tapper.remain}
          </span>
          <span>•</span>
          <span style={{ opacity: 0.5 }}>{tapper.tank}</span>
        </div>
        <div
          style={{
            width: "100%",
            height: 10,
            borderRadius: 100,
            marginTop: 10,
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#fff2",
            boxShadow: "inset 0 0 0 1px #fff1",
          }}
        >
          <div
            style={{
              transition: "all 0.5s ease",
              width: `${percentage(tapper.remain, tapper.tank)}%`,
              height: "100%",
              borderRadius: 100,
              backgroundColor: "#fff1",
              backgroundImage:
                "linear-gradient( 90deg, rgba(233,200,100,1) 29.5%,  rgba(29,255,255,1) 61.5%, rgba(202,100,253,1) 92.4% )",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
