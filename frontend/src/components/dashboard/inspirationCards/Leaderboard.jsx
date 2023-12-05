import React, { useState, useEffect } from "react";
import { Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { apiLeaderboard } from "../../../services/api.users";
import medalGold from "../../../assets/dashboard/Medal_gold.png";
import medalSilver from "../../../assets/dashboard/Medal_silver.png";
import medalBronze from "../../../assets/dashboard/Medal_bronze.png";

function Leaderboard() {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardResponse = await apiLeaderboard();
        setLeaderboard(leaderboardResponse);
      } catch (error) {
        console.error(
          "An error occurred while fetching the leaderboard",
          error
        );
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h3 className="text-black text-lg w-full text-center">
        {t("pages.home.inspirationCards.topCruzzlers")}
      </h3>
      <div
        aria-label="podium"
        className="w-full flex flex-col justify-between mt-4"
      >
        {leaderboard.length > 0 &&
          leaderboard.map((item, index) => {
            let logo;
            if (index === 0) logo = medalGold;
            else if (index === 1) logo = medalSilver;
            else if (index === 2) logo = medalBronze;

            return (
              <React.Fragment key={item.id}>
                <Button
                  className="flex items-center truncate w-full text-ellipsis"
                  onClick={() => navigate(`/users/${item.id}`)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    maxWidth: "100%",
                    textOverflow: "ellipsis",
                    "& span": {
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                >
                  <img
                    src={logo}
                    alt="medal"
                    className="h-8 md:h-8 xl:h-10 pl-2"
                  />
                  <span className="px-2 text-secondary-600">
                    {`${item.firstname} ${item.lastname}`}
                  </span>
                </Button>
                {index !== leaderboard.length - 1 && (
                  <Divider className="my-2" />
                )}
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}

export default Leaderboard;
