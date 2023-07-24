import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const temp = JSON.parse(localStorage.getItem("mycapacitorappLogin")!);

  if (temp?.isLoggedIn)
    return <React.Fragment>{props.children}</React.Fragment>;

  return <Navigate to="/login" />;
};

export default ProtectedRoute;