import { useEffect, useRef, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getUserLevelObject } from "../../utils/gamification";

function AvatarDoghnut() {
  const { user, userGamification, setUserGamification } =
    useContext(UserContext);

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
    if (user) {
      setUserGamification(getUserLevelObject(user));
    }
  }, []);

  useEffect(() => {
    const { currentScore, currentLevelMinMaxScore } = userGamification;
    ratio =
      (currentScore - currentLevelMinMaxScore.min) /
      (currentLevelMinMaxScore.max - currentLevelMinMaxScore.min);
    animeProgressBar(ratio);
  }, [userGamification]);

  const strokeWidth = 24;
  const radius = 130;
  const viewBoxSize = radius * 2 + strokeWidth * 2;

  return (
    <div className="progressBar w-[8.7rem] h-[8.7rem] sm:h-44 sm:w-44 lg:h-48 lg:w-48 absolute">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="h-full w-full rotate-90 stroke-primary-100 origin-center transition-all duration-2000 ease-in-out"
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

export default AvatarDoghnut;
