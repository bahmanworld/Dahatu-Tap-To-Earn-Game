import React from "react";
import { motion } from "framer-motion";
import { useTapper } from "../stores/useTapper";
import { useDebounce } from "@uidotdev/usehooks";
import FloatingNumber from "./FloatingNumber";
import CoinImgSrc from "../assets/coin.webp";
import HandImgSrc from "../assets/hand.png";

type Touch = {
  top: number;
  left: number;
  done: boolean;
};

const Coin = () => {
  const tapper = useTapper();
  const [touches, setTouches] = React.useState<Touch[]>([]);
  const [tapInstances, setTapInstances] = React.useState<React.ReactNode[]>([]);
  const debouncedTapInstances = useDebounce(tapInstances, 1000);

  const [scale, setScale] = React.useState(1)

  React.useEffect(() => {
    if (debouncedTapInstances) {
      setTapInstances([]);
    }
  }, [debouncedTapInstances]);

  return (
    <>
      <motion.div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: HandImgSrc
        }}
        animate={{scale}}
        onTouchEnd={(e) => {
          setScale(1)
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
          setScale(0.8)
          if (tapper.remain < tapper.taps) return;
          const ts: Touch[] = [];
          for (let i = 0; i < e.targetTouches.length; i++) {
            const top = e.targetTouches[i].clientY - 15;
            const left = e.targetTouches[i].clientX - 15;
            ts.push({
              top,
              left,
              done: false,
            });
          }
          setTouches(ts);
        }}
      >
        <img
          src={HandImgSrc}
          style={{
            width: "80%",
            height: undefined,
            aspectRatio: 1 / 1,
            marginTop: -100
          }}
        />
      </motion.div>
      {tapInstances.map((instance) => {
        return instance;
      })}
    </>
  );
};

export default Coin;
