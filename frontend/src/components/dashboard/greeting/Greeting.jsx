import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { UserContext } from "../../../contexts/UserContext";
import { FilterContext } from "../../../contexts/FilterContext";
import { LanguageContext } from "../../../contexts/LanguageContext";

function Greeting() {
  const { user } = useContext(UserContext);
  const { setSelectedCategories } = useContext(FilterContext);
  const { firstname } = user;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [greeting, setGreeting] = useState(t("pages.home.greetings.welcome"));
  const { language } = useContext(LanguageContext);

  const handleClick = () => {
    setSelectedCategories([]);
    navigate("/ideas");
  };

  useEffect(() => {
    const hour = new Date().getHours();
    let updatedGreeting;

    if (hour < 12) {
      updatedGreeting = t("pages.home.greetings.goodmorning");
    } else if (hour < 18) {
      updatedGreeting = t("pages.home.greetings.goodafternoon");
    } else {
      updatedGreeting = t("pages.home.greetings.goodevening");
    }
    setGreeting(updatedGreeting);
  }, [language]);

  return (
    <div className="flex flex-col h-full justify-between lg:justify-normal px-6">
      <div className="flex flex-col">
        <span className="text-3xl lg:text-5xl font-semibold">{greeting},</span>
        <span className="pt-2 text-3xl lg:text-5xl font-semibold">
          {firstname}
        </span>
        <p className="mt-6 lg:text-lg font-medium">
          {t("pages.home.greetings.introduction")}
        </p>
      </div>
      <div className="flex flex-wrap justify-center lg:justify-normal py-4 my-4">
        <Button
          variant="contained"
          onClick={() => handleClick()}
          className="rounded-full bg-black mx-2 my-2"
        >
          {t("buttons.suggestions")}
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/ideas/new")}
          className="rounded-full mx-2 my-2"
        >
          {t("buttons.create")}
        </Button>
      </div>
    </div>
  );
}

export default Greeting;
