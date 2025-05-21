import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();

    navigate("/log-in");
  }, [navigate]);

  return null;
}
