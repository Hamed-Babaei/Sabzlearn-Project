import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";

export default function UserPPrivate({ children }) {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  return <>{authContext.isLoggedIn ? <>{children}</> : navigate("/login")}</>;
}
