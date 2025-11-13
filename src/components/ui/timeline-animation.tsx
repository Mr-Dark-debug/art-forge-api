"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

interface TimelineContentProps {
  children: ReactNode;
  animationNum: number;
  timelineRef: React.RefObject<HTMLDivElement>;
  className?: string;
  customVariants?: Variants;
  as?: keyof JSX.IntrinsicElements;
}

const defaultVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 20,
    opacity: 0,
  },
};

export const TimelineContent = ({
  children,
  animationNum,
  timelineRef,
  className,
  customVariants = defaultVariants,
  as: Component = "div",
}: TimelineContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ root: timelineRef, once: true, margin: "-100px" }}
      variants={customVariants}
      className={className}
    >
      <Component>{children}</Component>
    </motion.div>
  );
};