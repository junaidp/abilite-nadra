import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const Login = lazy(() => import("../../../components/auth/login/Login"));

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <Login />
    </Suspense>
  );
};

export default LoginPage;
