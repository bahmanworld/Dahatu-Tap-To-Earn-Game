import React from "react";
import { useTapper } from "./stores/useTapper";
import FloatingNumber from "./components/FloatingNumber";
import { motion } from "framer-motion";
import "./App.css";
import { useDebounce } from "@uidotdev/usehooks";

type Touch = {
  top: number;
  left: number;
  done: boolean;
};

function App() {
  const tapper = useTapper();
  const [touches, setTouches] = React.useState<Touch[]>([]);
  const [tapInstances, setTapInstances] = React.useState<React.ReactNode[]>([]);
  const debouncedTapInstances = useDebounce(tapInstances, 800)

  React.useEffect(()=>{
    if (debouncedTapInstances) {
      setTapInstances([])
    }
  }, [debouncedTapInstances])

  React.useEffect(() => {
    const interval = setInterval(() => {
      tapper.updateRemain();
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <React.Fragment>
      <div
        style={{ padding: 20, zIndex: 1, position: "fixed", top: 0, left: 0 }}
      >
        <div
          style={{
            fontSize: 80,
            opacity: 0.9,
          }}
        >
          {tapper.points.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: 25,
            opacity: 0.5,
          }}
        >
          <span
            style={{ color: tapper.remain < tapper.taps ? "#f22" : "inherit" }}
          >
            {tapper.remain}
          </span>
          <span style={{ marginInline: 5 }}>/</span>
          <span>{tapper.tank}</span>
        </div>
        <div>{touches.length}</div>
        <div>{tapInstances.length}</div>
        <div>{debouncedTapInstances.length}</div>
      </div>
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
      ></motion.div>
      {tapInstances.map((instance) => {
        return instance;
      })}
    </React.Fragment>
  );
}

export default App;
