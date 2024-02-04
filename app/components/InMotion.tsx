/* eslint no-use-before-define: 0 */  // --> OFF

import React from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
interface Props {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  delay?: number
}
const InMotion = ({ children, width = "fit-content", delay }: Props) => {
  const mainControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{
          duration: 0.8,
          delay: delay || 0.25,
          
        }}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default InMotion;
