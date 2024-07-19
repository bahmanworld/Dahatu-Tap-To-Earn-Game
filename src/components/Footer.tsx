import React from "react";
import { useTapper } from "../stores/useTapper";
import { Blocks, Home, Users, Wallet, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const tapper = useTapper();

  const [currentTab, setCurrentTab] = React.useState(0);
  const tabs = React.useMemo(() => {
    return [
      {
        id: "home",
        title: "Tap",
        icon: <Home size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
        dot: false,
      },
      {
        type: "divider",
      },
      {
        id: "boost",
        title: "Boost",
        icon: <Zap size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
        dot: true,
      },
      {
        type: "divider",
      },
      {
        id: "task",
        title: "Tasks",
        icon: <Blocks size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
        dot: true,
      },
      {
        type: "divider",
      },
      {
        id: "invite",
        title: "Invite",
        icon: <Users size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
        dot: false,
      },
      {
        type: "divider",
      },
      {
        id: "wallet",
        title: "Wallet",
        icon: <Wallet size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
        dot: false,
      },
    ];
  }, []);

  return (
    <div style={{ padding: 10, paddingBottom: 30 }}>
      <div
        style={{
          zIndex: 1,
          backgroundColor: "#fff1",
          boxShadow: "inset 0 0 0 1px #fff1",
          border: "1px solid #0008",
          borderRadius: 100,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tabs.map((tab, index) => {
          if (tab.type == "divider") {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{ width: 1, height: 50, backgroundColor: "#fff1" }}
                ></span>
              </div>
            );
          }
          return (
            <motion.div
              onClick={() => setCurrentTab(index)}
              key={tab.id}
              animate={{
                opacity: currentTab == index ? 1 : 0.5,
                scale: currentTab == index ? 1.06 : 1,
              }}
              transition={{ stiffness: 10, duration: 0.1 }}
              style={{
                position: "relative",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingBlock: 15,
              }}
            >
              <div>{tab.icon}</div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: "normal",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.title}
              </div>
              <div
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  border: "3px solid #333",
                  backgroundColor: "#fa1",
                  top: 10,
                  right: 20,
                  borderRadius: 100,
                  opacity: tab.dot ? 1 : 0,
                }}
              ></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
