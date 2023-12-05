import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function CountAnimation({ targetCount }) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const duration = 3000;
    const step = Math.ceil(targetCount / (duration / 10));
    let currentCount = 1;

    const timer = setInterval(() => {
      currentCount += step;
      if (currentCount >= targetCount) {
        clearInterval(timer);
        currentCount = targetCount;
      }
      setCount(currentCount);
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [targetCount]);

  return <div className="text-5xl font-medium text-primary-900">{count}</div>;
}

CountAnimation.propTypes = {
  targetCount: PropTypes.number.isRequired,
};

export default CountAnimation;
