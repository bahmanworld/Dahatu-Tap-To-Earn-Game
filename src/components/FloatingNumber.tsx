import { AnimatePresence, motion } from "framer-motion";
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
          animate={{ y: -200, scale: 1.5 }}
          exit={{ opacity: 0 }}
          transition={{ type: "keyframes", ease: "easeOut", duration: 0.8 }}
          style={{
            position: "fixed",
            transform: "perspective(1000px)",
            top: props.location.top,
            left: props.location.left,
            fontSize: 30,
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        >
          +{props.value}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNumber;
