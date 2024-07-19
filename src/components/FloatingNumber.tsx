import {
  AnimatePresence,
  motion,
  cubicBezier,
  mirrorEasing,
} from "framer-motion";
import React from "react";

function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type Props = {
  value: number;
  visible: boolean;
  location: {
    top: number;
    left: number;
  };
  onDone: () => void;
};

const FloatingNumber: React.FC<Props> = (props) => {
  const [isVisible, setIsVisble] = React.useState(props.visible);

  React.useEffect(() => {
    setTimeout(() => {
      setIsVisble(false);
      props.onDone();
    }, 0);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ y: -250, scale: 1.5, translateX: randomNumber(-25, 25) }}
          exit={{ opacity: 0 }}
          transition={{
            type: "keyframes",
            ease: "easeOut",
            duration: 1,
            opacity: { delay: 0.4 },
          }}
          style={{
            width: 30,
            height: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: props.location.top,
            left: props.location.left,
            fontSize: 20,
            fontWeight: "bold",
            pointerEvents: "none",
            backgroundColor: "#fff2",
            color: "#fff",
            textShadow: "1px 1px #0006",
            boxShadow: "0px 0px 2px #0009",
            border: "1px solid #fff4",
            padding: 10,
            borderRadius: "100%",
          }}
        >
          <span>+{props.value.toLocaleString("en-US")}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNumber;
