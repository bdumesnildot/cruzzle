import React from "react";
import { Container, useMediaQuery } from "@mui/material";
import LoginForm from "../components/forms/LoginForm";
import fullLogo from "../assets/logo/fullLogo.svg";
import login from "../assets/images/login.svg";
import { sm } from "../utils/mediaQueries";
import AlertOnSave from "../components/alerttoast/AlertOnSave";

function Login() {
  const smallQuery = useMediaQuery(sm.query);

  return (
    <div>
      {!smallQuery && (
        <div className="h-screen flex flex-col justify-between">
          <img
            className="pt-5 w-56 self-center drop-shadow-lg"
            src={fullLogo}
            alt="logo"
          />
          <div className="flex flex-col items-center object-cover z-10 h-1/5 -mb-24">
            <img className="h-full" src={login} alt="login" />
          </div>
          <div>
            <Container className="px-5 pb-5 pt-20 mt-5 bg-purple-50">
              <LoginForm />
            </Container>
          </div>
        </div>
      )}
      {smallQuery && (
        <div className="h-screen flex">
          <div className="w-7/12">
            <Container className="h-screen bg-purple-50 flex flex-col justify-center">
              <LoginForm className="flex justify-center items-center" />
            </Container>
          </div>

          <div className="relative w-5/12 flex flex-col items-center">
            <img
              className="w-64 drop-shadow-lg m-20"
              src={fullLogo}
              alt="logo"
            />
            <img
              className="max-w-full w-full h-auto absolute bottom-0 -left-8 lg:-left-20"
              src={login}
              alt="login"
            />
          </div>
        </div>
      )}
      <AlertOnSave />
    </div>
  );
}

export default Login;
