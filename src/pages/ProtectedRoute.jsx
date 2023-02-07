import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, requiredAdmin }) {
  //로그인한 사용자가 있는지 확인
  //그 사용자가 어드민 권한이 있는지 확인
  //requiredAdmin이 true인 경우에는 로그인도 되어 있어야하고, 어드민구너한도 갖고 있어야함
  //조건에 맞지 않으면 상위경로로 이동
  //조건에 맞는 경우에만 cildren 보여줌
  const { user } = useAuthContext();
  if (!user || (requiredAdmin && !user.isAdmin)) {
    return <Navigate to="/" />;
  }
  return children;
}
