import { useTranslation } from "react-i18next";
import Leaderboard from "./Leaderboard";
import Progress from "./Progress";
import TeamActivity from "./TeamActivity";
import HorizontalScroll from "../../scroller/HorizontalScroll";

function InspirationCards() {
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      item: <Leaderboard />,
    },
    {
      id: 2,
      item: <Progress />,
    },
    {
      id: 3,
      item: <TeamActivity />,
    },
  ];

  return (
    <div className="w-full">
      <h4 className="text-black py-0 lg:hidden px-6 pb-4">
        {t("pages.home.dashboard.stats")}
      </h4>
      <HorizontalScroll>
        <div id="inspiration-cards" className="w-full flex">
          {cards.map((card) => (
            <div
              key={card.id}
              aria-label="leaderboard"
              className="border border-solid border-gray-100 my-8 mx-4 h-80 min-w-[208px] md:w-52 md:min-w-[208px] xl:w-56 xl:min-w-[224px] flex flex-col rounded-xl bg-white shadow-xl py-6 px-4"
            >
              {card.item}
            </div>
          ))}
        </div>
      </HorizontalScroll>
    </div>
  );
}

export default InspirationCards;
