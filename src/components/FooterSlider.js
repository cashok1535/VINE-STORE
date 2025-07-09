import { useCallback, useEffect, useState, useRef } from "react";

export const FooterSlider = ({ img, scaleCount, wrapperSize }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef(null);
  const initialMousePos = useRef({ x: 0, y: 0 });
  const initialImagePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (scaleCount < 1) {
      setPosition({ x: 0, y: 0 });
    }
  }, [scaleCount]);

  const handleMouseDown = useCallback(
    (e) => {
      if (scaleCount > 0) {
        setIsDragging(true);
        initialMousePos.current = { x: e.clientX, y: e.clientY };
        initialImagePos.current = { x: position.x, y: position.y };
      }
      e.preventDefault();
    },
    [position, scaleCount]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const dx = e.clientX - initialMousePos.current.x;
      const dy = e.clientY - initialMousePos.current.y;
      let newX = initialImagePos.current.x + dx;
      let newY = initialImagePos.current.y + dy;
      setPosition({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    const element = imageRef.current.getBoundingClientRect();
    if (
      element.top > wrapperSize.height ||
      element.bottom <= 0 ||
      element.left > wrapperSize.width ||
      element.right <= 0
    ) {
      setPosition({
        x: 0,
        y: 0,
      });
    }
  }, [wrapperSize]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleMouseDown]);

  return (
    <img
      ref={imageRef}
      src={img}
      alt=""
      className="footer__flex__element footer__slider__img"
      onMouseDown={handleMouseDown}
      style={{
        top: position.y,
        left: position.x,
        transition: `transform 0.3s,  ${!isDragging && "top 1s, left 1s"}`,
        cursor: `${scaleCount !== 0 ? "move" : "default"}`,
      }}
    />
  );
};
