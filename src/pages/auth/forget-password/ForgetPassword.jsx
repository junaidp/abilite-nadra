import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";

const ForgetPassword = lazy(() =>
  import("../../../components/auth/forget-password/ForgetPassword")
);

const ForgetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <ForgetPassword />
    </Suspense>
  );
};

export default ForgetPasswordPage;
