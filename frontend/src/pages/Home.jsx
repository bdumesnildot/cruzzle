import { useMediaQuery } from "@mui/material";
import Greeting from "../components/dashboard/greeting/Greeting";
import CategoryCards from "../components/dashboard/categoriesCards/CategoryCards";
import OverviewCards from "../components/dashboard/overviewCards/OverviewCards";
import InspirationCards from "../components/dashboard/inspirationCards/InspirationCards";
import TrendCards from "../components/dashboard/trendingIdeas/Trends";
import { lg } from "../utils/mediaQueries";

function Home() {
  const styleDash = {
    background:
      "linear-gradient(90deg, rgba(250,244,251,1) 0%, rgba(250,244,251,1) 55%, rgba(255,255,255,1) 55%, rgba(255,255,255,1) 100%)",
  };

  const lgQuery = useMediaQuery(lg.query);

  return (
    <div
      id="dashboard-desktop"
      className="h-full w-full flex flex-col relative no-scrollbar"
      style={lgQuery ? styleDash : { background: "white" }}
    >
      <div className="flex flex-col lg:flex-row w-full lg:mx-6">
        <div className="w-full lg:w-2/5 pt-4 lg:pt-8">
          <Greeting />
        </div>
        <div className="w-full lg:w-3/5 mr-6">
          <InspirationCards />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row  h-full relative">
        <div className="flex flex-col lg:w-[55%] justify-around px-6 xl:relative xl:top-[-50px]">
          <CategoryCards />
          <OverviewCards />
        </div>
        <div
          id="bottom-right-trends"
          className="w-full lg:w-[45%] flex items-center"
        >
          <TrendCards />
        </div>
      </div>
    </div>
  );
}

export default Home;
