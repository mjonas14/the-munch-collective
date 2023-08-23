import React from "react";
import Auth from "../utils/auth";

export default function Logout() {
  return Auth.logout();
}
