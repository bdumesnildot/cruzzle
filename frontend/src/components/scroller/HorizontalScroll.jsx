import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function HorizontalScroll({ children }) {
  const containerRef = useRef(null);

  const handleScroll = (event) => {
    event.preventDefault();
    const [x, y] = [event.deltaX, event.deltaY];
    let magnitude;
    if (x === 0) {
      magnitude = y > 0 ? -30 : 30;
    } else {
      magnitude = x;
    }
    containerRef.current.scrollBy({
      left: magnitude,
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("wheel", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div
      className="w-full overflow-x-scroll overscroll-x-contain no-scrollbar"
      ref={containerRef}
    >
      {children}
    </div>
  );
}

HorizontalScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HorizontalScroll;
