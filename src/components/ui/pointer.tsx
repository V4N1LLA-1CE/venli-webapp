"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  HTMLMotionProps,
  motion,
  useMotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

interface PointerProps extends Omit<HTMLMotionProps<"div">, "ref"> { }

/**
 * A custom pointer component that displays an animated cursor.
 * Add this as a child to any component to enable a custom pointer when hovering.
 * You can pass custom children to render as the pointer.
 *
 * @component
 * @param {PointerProps} props - The component props
 */
export function Pointer({
  className,
  style,
  children,
  ...props
}: PointerProps): React.ReactNode {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [pointerState, setPointerState] = useState<"default" | "pointer" | "input">("default");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // Get the parent element directly from the ref
      const parentElement = containerRef.current.parentElement;

      if (parentElement) {
        // Force cursor none on everything
        const style = document.createElement('style');
        style.textContent = `
          *, *::before, *::after {
            cursor: none !important;
          }
        `;
        document.head.appendChild(style);

        // Add event listeners to parent
        const handleMouseMove = (e: MouseEvent) => {
          x.set(e.clientX);
          y.set(e.clientY);

          // Detect what element we're hovering over
          const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
          if (elementBelow) {
            const isClickable = elementBelow.matches('button, a, [role="button"], .cursor-pointer');
            const isInput = elementBelow.matches('input, textarea, [contenteditable]');

            if (isInput) {
              setPointerState("input");
            } else if (isClickable) {
              setPointerState("pointer");
            } else {
              setPointerState("default");
            }
          }
        };

        const handleMouseEnter = (e: MouseEvent) => {
          x.set(e.clientX);
          y.set(e.clientY);
          setIsActive(true);
        };

        const handleMouseLeave = () => {
          setIsActive(false);
        };

        parentElement.addEventListener("mousemove", handleMouseMove);
        parentElement.addEventListener("mouseenter", handleMouseEnter);
        parentElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          document.head.removeChild(style);
          parentElement.removeEventListener("mousemove", handleMouseMove);
          parentElement.removeEventListener("mouseenter", handleMouseEnter);
          parentElement.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }
  }, [x, y]);

  const renderPointer = () => {
    const baseProps = {
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "1.2",
      viewBox: "0 0 16 16",
      height: "24",
      width: "24",
      xmlns: "http://www.w3.org/2000/svg",
    };

    const path = "M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z";

    switch (pointerState) {
      case "pointer":
        return (
          <svg
            {...baseProps}
            className={cn(
              "rotate-[-85deg] dark:stroke-white text-jagged-ice-400 stroke-havelock-blue-900",
              className,
            )}
          >
            <path d={path} />
          </svg>
        );
      case "input":
        return (
          <svg
            {...baseProps}
            className={cn(
              "rotate-[-85deg] dark:stroke-white text-jagged-ice-400 stroke-havelock-blue-900",
              className,
            )}
          >
            <path d={path} />
          </svg>
        );
      default:
        return (
          <svg
            {...baseProps}
            className={cn(
              "rotate-[-85deg] dark:stroke-white text-jagged-ice-400 stroke-havelock-blue-900",
              className,
            )}
          >
            <path d={path} />
          </svg>
        );
    }
  };

  return (
    <>
      <div ref={containerRef} />
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="transform-[translate(-50%,-50%)] pointer-events-none fixed z-50"
            style={{
              top: y,
              left: x,
              ...style,
            }}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            {...props}
          >
            {children || renderPointer()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
