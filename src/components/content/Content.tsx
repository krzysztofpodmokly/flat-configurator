import { forwardRef, useEffect, useRef, useState } from "react";
import { useStore } from "../../store/store";

import "./styles.css";

type Props = {};

const Content = forwardRef<Props>((props, ref) => {
  const setPosition = useStore((state) => state.setPosition);
  const blockRef = useRef<HTMLDivElement>(null);
  const stickRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [speed, setSpeed] = useState<number>(0);
  const [wheelPosition, setWheelPosition] = useState(0);
  const [rounded, setRounded] = useState(0);
  const objs = Array(5).fill({ dist: 0 });

  const handleWheelSpeed = (event: WheelEvent) => {
    setSpeed((prevSpeed) => prevSpeed + event.deltaY * 0.0002);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheelSpeed);

    return () => {
      window.removeEventListener("wheel", handleWheelSpeed);
    };
  }, []);

  useEffect(() => {
    let animationId: number;

    const raf = () => {
      setWheelPosition((prevPosition) => {
        let newPosition = prevPosition + speed;
        // if (newPosition < minPosition) newPosition = minPosition;
        // if (newPosition > maxPosition) newPosition = maxPosition;
        return newPosition;
      });

      setSpeed((prevSpeed) => {
        const nextSpeed = prevSpeed * 0.95;
        return nextSpeed;
      });
      setRounded(Math.round(wheelPosition));
      const diff = rounded - wheelPosition;

      if (!wrapRef.current) return;
      wrapRef.current.style.transform = `translate(0, ${
        -wheelPosition * 200 + 50
      }px)`;

      setWheelPosition((prevPosition) => {
        let newPosition =
          prevPosition +
          Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;

        return newPosition;
      });

      objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(wheelPosition - i), 1);
        o.dist = 1 - o.dist ** 2;

        if (!stickRefs.current[i]) return;
        const scale = 1 + 0.3 * o.dist;
        stickRefs.current[i].style.transform = `scale(${scale})`;
      });

      animationId = window.requestAnimationFrame(raf);
    };

    animationId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [speed, wheelPosition]);

  setPosition(wheelPosition);

  return (
    <main className="main">
      <div className="wrap" ref={wrapRef}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`n n${index + 1}`}
            ref={(el) => (stickRefs.current[index] = el)}
          ></div>
        ))}
      </div>
      {/* <div className="n"></div>
      <div className="n n1"></div>
      <div className="n n2"></div>
      <div className="n n3"></div>
      <div className="n n4"></div> */}
    </main>
  );
});

export default Content;
