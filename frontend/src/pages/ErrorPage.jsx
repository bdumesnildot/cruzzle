import { useEffect, useState } from "react";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import error500 from "../assets/error500.svg";
import error404 from "../assets/error404.svg";
import logo from "../assets/logo/fullLogo.svg";

function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const error = useRouteError();

  const [errorHandler, setErrorHandler] = useState(null);

  useEffect(() => {
    if (location.state) {
      setErrorHandler(location.state.error);
    } else {
      setErrorHandler(error);
    }
  }, []);

  const handleClick = () => {
    navigate("/dashboard", { replace: true });
  };

  if (!errorHandler) {
    return null;
  }

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center px-4"
      id="error-page"
    >
      <img src={logo} alt="" className="h-16 md:h-20 lg:h-24 absolute top-8" />
      {errorHandler.status === 404 && (
        <img src={error404} alt="" className="w-1/2 md:w-1/3 lg:w-1/4 " />
      )}
      {errorHandler.status !== 404 && (
        <img src={error500} alt="" className="w-1/2 md:w-1/3 lg:w-1/4 " />
      )}
      <div className="flex flex-col items-center justify-center">
        <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-gray-600 mt-8">
          {errorHandler.status !== 404 && errorHandler.status}
        </p>
        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-600 mt-2">
          {errorHandler.statusText}
        </p>
        <p className="md:text-lg xl:text-xl text-gray-500 mt-4 text-center">
          {errorHandler.status === 404 && t("pages.error.404")}
          {errorHandler.status === 401 && t("pages.error.401")}
          {errorHandler.status !== 401 &&
            errorHandler.status !== 404 &&
            t("pages.error.500")}
        </p>
      </div>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => handleClick()}
        startIcon={<ArrowUturnLeftIcon className="h-6 w-6" />}
        className="rounded-full my-10"
        sx={{
          boxShadow: 1,
          "&:hover": { boxShadow: 2 },
          "&:active, &.Mui-focusVisible": { boxShadow: 4 },
        }}
      >
        {t("buttons.return")}
      </Button>
    </div>
  );
}
export default ErrorPage;
