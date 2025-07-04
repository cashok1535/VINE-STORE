import { useCallback, useEffect, useState, useRef } from "react";

export const FooterSlider = ({ img, scaleCount }) => {
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

  const handleMouseDown = (e) => {
    if (scaleCount > 0) {
      setIsDragging(true);
      initialMousePos.current = { x: e.clientX, y: e.clientY };
      initialImagePos.current = { x: position.x, y: position.y };
    }
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const element = imageRef.current.getBoundingClientRect();
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
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <img
      ref={imageRef}
      src={img}
      alt=""
      className="footer__flex__element"
      onMouseDown={handleMouseDown}
      style={{
        top: position.y,
        left: position.x,
        transition: "transform 0.3s ease-out",
        cursor: `${scaleCount !== 0 ? "move" : "default"}`,
      }}
    />
  );
};
