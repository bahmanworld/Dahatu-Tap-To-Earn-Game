import {
  AnimatePresence,
  LazyMotion,
  motion,
  domAnimation,
} from "framer-motion";
import React from "react";

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
          animate={{ y: -100, scale: 1.5 }}
          exit={{ opacity: 0 }}
          transition={{ type: "keyframes", ease: "easeOut", duration: 1 }}
          style={{
            position: "fixed",
            top: props.location.top,
            left: props.location.left,
            fontSize: 20,
            fontWeight: "bold",
            pointerEvents: "none",
            textShadow: "1px 1px 2px #0009",
            border: "2px solid #fff3",
            padding: 10,
            borderRadius: 10,
          }}
        >
          +{props.value.toLocaleString("en-US")}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNumber;
