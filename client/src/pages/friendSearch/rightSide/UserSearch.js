import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@apollo/client";
import { QUERY_GETALLUSERS } from "../../../utils/queries";

import SearchUserDisplay from "../../../components/SearchUserDisplay";
import SearchBar from "../components/SearchBar";

export default function UserSearch() {
  const { loading, data } = useQuery(QUERY_GETALLUSERS);
  const userData = data?.getAllUsers || [];

  const filterData = (query, userData) => {
    if (!query) {
      return userData;
    } else {
      return userData.filter((d) =>
        d.username.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const dataFiltered = filterData(searchQuery, userData);

  return (
    <div>
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: "bold",
          margin: "15px 0px 15px 20px",
        }}
      >
        Search all Users
      </Typography>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {dataFiltered.map((user) => (
          <SearchUserDisplay userId={user._id} />
        ))}
    </div>
  );
}
