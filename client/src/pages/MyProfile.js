import React from "react";
import { useQuery } from "@apollo/client";

import { QUERY_GETME } from "../utils/queries";

export default function MyProfile() {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];
  console.log(loading, "loading");
  console.log(data, "data");

  return (
    <div>
      <h1>{`Welcome back ${userData.username}`}</h1>
    </div>
  );
}
