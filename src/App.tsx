import React from "react";
import { useTapper } from "./stores/useTapper";
import FloatingNumber from "./components/FloatingNumber";
import { motion } from "framer-motion";
import "./App.css";
import { useDebounce } from "@uidotdev/usehooks";
import Details from "./components/Details";
import Coin from "./assets/coin.webp";

type Touch = {
  top: number;
  left: number;
  done: boolean;
};

function App() {
  const tapper = useTapper();
  const [touches, setTouches] = React.useState<Touch[]>([]);
  const [tapInstances, setTapInstances] = React.useState<React.ReactNode[]>([]);
  const debouncedTapInstances = useDebounce(tapInstances, 1000);

  React.useEffect(() => {
    if (debouncedTapInstances) {
      setTapInstances([]);
    }
  }, [debouncedTapInstances]);

  return (
    <React.Fragment>
      <Details />
      <motion.div
        onTouchEnd={(e) => {
          if (tapper.remain < tapper.taps) return;
          setTouches([]);
          touches.forEach((touch) => {
            const location = {
              top: touch.top,
              left: touch.left,
            };
            const newInstance = (
              <FloatingNumber
                visible={true}
                value={tapper.taps}
                location={location}
                onDone={() => {}}
              />
            );
            setTapInstances((prev) => [...prev, newInstance]);
          });
          tapper.updatePoints(tapper.taps);
        }}
        onTouchCancel={(e) => {
          e.preventDefault();
          setTouches([]);
        }}
        onTouchStart={(e) => {
          if (tapper.remain < tapper.taps) return;
          const ts: Touch[] = [];
          for (let i = 0; i < e.targetTouches.length; i++) {
            const top = e.targetTouches[i].pageY - 15;
            const left = e.targetTouches[i].pageX - 15;
            ts.push({
              top,
              left,
              done: false,
            });
          }
          setTouches(ts);
        }}
        style={{
          zIndex: 0,
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 50,
          color: "#f3f3f3",
        }}
      >
        <img
          src={Coin}
          style={{
            width: 250,
            height: undefined,
            aspectRatio: 1 / 1,
            marginTop: 50,
          }}
        />
      </motion.div>
      {tapInstances.map((instance) => {
        return instance;
      })}
    </React.Fragment>
  );
}

export default App;
