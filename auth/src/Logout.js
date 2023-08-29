import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    // Clear the token cookie
    Cookies.remove("token");

    // Redirect to the login page
    nav("/login");
  }, [nav]);

  return null; // Since there is no visible content in this component, you can just return null
}
