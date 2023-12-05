import PropTypes from "prop-types";
import React, { useContext, useLayoutEffect } from "react";
import { ScrollContext } from "../../contexts/ScrollContext";

function Progress({ heightpx = 4, duration = 2 }) {
  const { width, setWidth, divRef } = useContext(ScrollContext);
  const ref = divRef.current;

  const scrolling = () => {
    const winScroll = ref.scrollTop || document.documentElement.scrollTop;

    const height = ref.scrollHeight - ref.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (height > 0) {
      setWidth(`${scrolled}%`);
    } else {
      setWidth(null);
    }
  };

  useLayoutEffect(() => {
    try {
      if (ref) {
        ref.addEventListener("scroll", scrolling);
      }
    } catch (error) {
      console.error(error);
    }

    return () => {
      try {
        if (ref) {
          ref.removeEventListener("scroll", scrolling);
        }
      } catch (error) {
        console.info(error);
      }
    };
  }, [ref]);

  const scrollStyle = {
    margin: 0,
    padding: 0,
    top: -4,
    zIndex: 99,
    backgroundImage:
      "linear-gradient(90.01deg, #B0279B -7.26%, #F9D6FF 100.79%)",
    height: `${heightpx}px`,
    width,
    transitionProperty: "width",
    transitionDuration: `${duration}s`,
    transitionTimingFunction: "ease-out",
  };

  return <div style={scrollStyle} />;
}

Progress.propTypes = {
  heightpx: PropTypes.number,
  duration: PropTypes.number,
};

Progress.defaultProps = {
  heightpx: 3,
  duration: 1,
};

export default Progress;
