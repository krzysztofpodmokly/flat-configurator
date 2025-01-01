import { useContext, useEffect, useState } from "react";
import { Context } from "../context";

const SLIDE_HEIGHT = 100;
const SLIDE_DAMPING = 0.05;
const FORCE_TO_SWITCH_SLIDE = 0.95;

export const useSnapScroll = () => {
  const { html } = useContext(Context);
  const [containerHeight, setContainerHeight] = useState(window.innerHeight);
  const minPosition = 0;
  const blockHeight = 200;
  const maxPosition = (containerHeight - blockHeight) / 100;
  const [speed, setSpeed] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [rounded, setRounded] = useState<number>(0);
  const [isWithinBounds, setIsWithinBounds] = useState<boolean>(true);

  const elems = [...document.querySelectorAll(".stick")];
  const wrap = document.querySelector(".stick-wrapper");
  const block = document.querySelector(".block");
  const objs = Array(5).fill({ dist: 0 });

  const handleWheelSpeed = (event: WheelEvent) => {
    setSpeed((prevSpeed) => prevSpeed + event.deltaY * 0.0002);
  };

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleWheelSpeed);

    return () => {
      window.removeEventListener("wheel", handleWheelSpeed);
    };
  }, []);

  useEffect(() => {
    let animationId: number;

    const raf = () => {
      setPosition((prevPosition) => {
        let newPosition = prevPosition + speed;
        // if (newPosition < minPosition) newPosition = minPosition;
        // if (newPosition > maxPosition) newPosition = maxPosition;
        return newPosition;
      });

      setSpeed((prevSpeed) => {
        const nextSpeed = prevSpeed * 0.95;
        return nextSpeed;
      });
      setRounded(Math.round(position));
      const diff = rounded - position;

      setPosition((prevPosition) => {
        let newPosition =
          prevPosition +
          Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;
        // if (newPosition < minPosition) newPosition = minPosition;
        // if (newPosition > maxPosition) newPosition = maxPosition;
        return newPosition;
      });

      if (html?.current) {
        const contentBoxElements =
          html.current.querySelectorAll<HTMLDivElement>(".wrappedContent");

        const mappedHtmlContent = Array.from(contentBoxElements).map(
          (content) => ({
            content,
            distance: 0,
          })
        );

        console.log({ block, position });

        objs.forEach((o, i) => {
          o.dist = Math.min(Math.abs(position - i), 1);
          o.dist = 1 - o.dist ** 2;

          elems[i].style.transform = `scale(${1 + 0.4 * o.dist})`;
          wrap!.style.transform = `translateY(${-position * 100 + 50}px)`;
        });

        block!.style.transform = `translate(0, ${position * 100 + 50}px)`;

        mappedHtmlContent.forEach((html, i) => {
          html.content.style.transform = `translateY(${
            -position * window.innerHeight
          }px)`;
        });
      }

      setIsWithinBounds(position >= minPosition && position <= maxPosition);

      animationId = window.requestAnimationFrame(raf);
    };

    animationId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, [speed, minPosition, maxPosition, position, rounded, html]);

  return { position, setPosition, isWithinBounds };
};
