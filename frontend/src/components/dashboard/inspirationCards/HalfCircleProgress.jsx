import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function HalfCircleProgress({ userGamification }) {
  const barRef = useRef();
  let ratio = 0;

  const animeProgressBar = (rat) => {
    const bar = barRef.current;
    const r = bar.getAttribute("r");
    const c = Math.PI * r * 2;
    const pct = (1 - rat) * c;
    bar.style.strokeDashoffset = pct;
    return pct;
  };

  useEffect(() => {
    const { currentScore, currentLevelMinMaxScore } = userGamification;
    ratio =
      (currentScore - currentLevelMinMaxScore.min) /
      2 /
      (currentLevelMinMaxScore.max - currentLevelMinMaxScore.min);
    animeProgressBar(ratio);
  }, [userGamification]);

  const strokeWidth = 24;
  const radius = 130;
  const viewBoxSize = radius * 2 + strokeWidth * 2;

  return (
    <div className="progressBar h-32 w-36 absolute top-0">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="h-full w-full rotate-180 stroke-primary-100 origin-center transition-all duration-2000 ease-in-out"
          ref={barRef}
          r={radius}
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          fill="transparent"
          strokeDasharray={2 * Math.PI * radius}
          strokeDashoffset={2 * Math.PI * radius}
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
}

HalfCircleProgress.propTypes = {
  userGamification: PropTypes.shape({
    currentLevel: PropTypes.number,
    currentScore: PropTypes.number,
    currentLevelMinMaxScore: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
  }),
};

HalfCircleProgress.defaultProps = {
  userGamification: {
    currentLevel: 0,
    currentScore: 0,
    currentLevelMinMaxScore: {
      min: 0,
      max: 0,
    },
  },
};
