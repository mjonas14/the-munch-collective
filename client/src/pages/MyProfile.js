import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import Typography from "@mui/material/Typography";

import { QUERY_GETME } from "../utils/queries";

export default function MyProfile() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  console.log(loading, "loading");
  console.log(data, "data");

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <h1>{`Welcome back ${userData.username}`}</h1>
        </div>
      ) : (
        <div>
          <Typography
            variant="h2"
            style={{
              color: "black",
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            404
          </Typography>
          <Typography
            variant="h5"
            style={{ color: "gray", textAlign: "center" }}
          >
            Aaarghhhh, I simply cannot find the page...
          </Typography>
        </div>
      )}
    </div>
  );
}
