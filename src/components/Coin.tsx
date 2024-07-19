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
          navigator.vibrate([30]);
        }}
        onTouchCancel={(e) => {
          e.preventDefault();
          setTouches([]);
        }}
        onTouchStart={(e) => {
          setScale(0.97);
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
        // onMouseDown={() => {
        //   setScale(0.95);
        // }}
        // onClick={(e) => {
        //   setScale(1);
        //   if (tapper.remain < tapper.taps) return;
        //   const location = {
        //     top: e.clientY - 20,
        //     left: e.clientX - 20,
        //   };
        //   const newInstance = (
        //     <FloatingNumber
        //       visible={true}
        //       value={tapper.taps}
        //       location={location}
        //       onDone={() => {}}
        //     />
        //   );
        //   setTapInstances((prev) => [...prev, newInstance]);
        //   tapper.updatePoints(tapper.taps);
        //   navigator.vibrate([30]);
        // }}
      >
        <motion.div style={{ textAlign: "center" }}>
          <motion.img
            src={CoinImgSrc}
            animate={{ scale }}
            transition={{ duration: 0.1 }}
            style={{
              width: "80%",
              height: undefined,
              aspectRatio: 1 / 1,
              borderBottomRightRadius: 500,
              borderBottomLeftRadius: 500,
              borderTopRightRadius: 1000,
              borderTopLeftRadius: 1000,
              pointerEvents: "none",
              filter: 'brightness(0.9)'
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
