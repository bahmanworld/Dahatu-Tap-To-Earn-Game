import React from "react";
import { motion } from "framer-motion";
import { useTapper } from "../stores/useTapper";
import { useDebounce } from "@uidotdev/usehooks";
import FloatingNumber from "./FloatingNumber";
import CoinImgSrc from "../assets/coinx.png";
import HandImgSrc from "../assets/hand.webp";
import * as TONConnect from "@tonconnect/ui-react";

type Touch = {
  top: number;
  left: number;
};

const Coin = () => {
  const tapper = useTapper();
  const [touches, setTouches] = React.useState<Touch[]>([]);
  const [tapInstances, setTapInstances] = React.useState<React.ReactNode[]>([]);
  const debouncedTapInstances = useDebounce(tapInstances, 1000);

  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    if (debouncedTapInstances) {
      setTapInstances([]);
      setTouches([]);
    }
  }, [debouncedTapInstances]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          style={{
            width: "90%",
            textAlign: "center",
            alignSelf: "center",
            borderBottomRightRadius: 500,
            borderBottomLeftRadius: 500,
            borderTopRightRadius: 1000,
            borderTopLeftRadius: 1000,
          }}
          onTouchEnd={(e) => {
            setScale(1);
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
            navigator.vibrate([60]);
          }}
          onTouchCancel={(e) => {
            e.preventDefault();
            setTouches([]);
          }}
          onTouchStart={(e) => {
            setScale(0.95);
            if (tapper.remain < tapper.taps) return;
            const ts: Touch[] = [];
            for (let i = 0; i < e.targetTouches.length; i++) {
              const top = e.targetTouches.item(i).clientY - 10;
              const left = e.targetTouches.item(i).clientX - 10;
              ts.push({
                top,
                left,
              });
            }
            setTouches(ts);
          }}
        >
          <motion.img
            src={CoinImgSrc}
            animate={{ scale }}
            transition={{ duration: 0.05 }}
            style={{
              width: "100%", // !CAUTION: use parent width
              height: undefined,
              aspectRatio: 1 / 1,
              filter: "brightness(0.5)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </div>
      {tapInstances.map((instance) => {
        return instance;
      })}
    </div>
  );
};

export default Coin;
