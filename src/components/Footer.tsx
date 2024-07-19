import React from "react";
import { useTapper } from "../stores/useTapper";
import {
  Blocks,
  Cog,
  Coins,
  Flag,
  HandCoins,
  Home,
  Settings,
  Users,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const tapper = useTapper();

  const [currentTab, setCurrentTab] = React.useState(0);
  const tabs = React.useMemo(() => {
    return [
      {
        id: "home",
        title: "خانه",
        icon: <Home size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
      },
      {
        type: "divider",
      },
      {
        id: "task",
        title: "وظیفه‌",
        icon: <Blocks size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
      },
      {
        type: "divider",
      },
      {
        id: "earn",
        title: "کسب",
        icon: <HandCoins size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
      },
      {
        type: "divider",
      },
      {
        id: "invite",
        title: "دعوت",
        icon: <Users size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
      },
      {
        type: "divider",
      },
      {
        id: "wallet",
        title: "کیف‌پول",
        icon: <Wallet size={25} absoluteStrokeWidth />,
        page: <div></div>,
        type: "tab",
      },
      // {
      //   type: "divider",
      // },
      // {
      //   id: "settings",
      //   title: "تنظیمات",
      //   icon: <Settings />,
      //   page: <div></div>,
      //   type: "tab",
      // },
    ];
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      tapper.updateRemain();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ padding: 20, paddingBottom: 30 }}>
      <div
        dir="rtl"
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
              transition={{stiffness:10}}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingBlock: 20,
              }}
            >
              <div>{tab.icon}</div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  lineHeight: 0.8,
                  whiteSpace: "nowrap",
                }}
              >
                {tab.title}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
