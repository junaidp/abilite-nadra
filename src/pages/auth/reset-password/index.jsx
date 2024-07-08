import React, { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const ResetPassword = lazy(() =>
  import("../../../components/auth/reset-password/ResetPassword")
);

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-2 px-2">
          <CircularProgress />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
