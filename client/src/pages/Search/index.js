import React, { useState } from "react";
import "../../styles/styles.css";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useQuery } from "@apollo/client";
import { QUERY_GETME } from "../../utils/queries";

import CurrentFriends from "./CurrentFriends";
import UserSearch from "./UserSearch";
import FriendRequests from "./FriendRequests";

const Search = () => {
  const { loading, data } = useQuery(QUERY_GETME);
  const userData = data?.getMe || [];

  const [friendAdded, setFriendAdded] = useState("");

  return (
    <Grid container>
      <Grid item xs={4}>
        <CurrentFriends
          friendAdded={friendAdded}
          setFriendAdded={setFriendAdded}
          me={userData}
        />
        <FriendRequests
          friendAdded={friendAdded}
          setFriendAdded={setFriendAdded}
          me={userData}
        />
      </Grid>
      <Grid item xs={5}>
        <UserSearch me={userData} />
      </Grid>
    </Grid>
  );
};

export default Search;
