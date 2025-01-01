import { useEffect, useState } from "react";

export const useSnapScroll = () => {
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

      setWheelPosition((prevPosition) => {
        let newPosition =
          prevPosition +
          Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;

        return newPosition;
      });

      objs.forEach((o, i) => {
        o.dist = Math.min(Math.abs(wheelPosition - i), 1);
        o.dist = 1 - o.dist ** 2;
      });

      animationId = window.requestAnimationFrame(raf);
    };

    animationId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [speed, wheelPosition]);

  return { position: wheelPosition };
};
