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
import TableContainer from "@mui/material/TableContainer";
import { useQuery } from "@apollo/client";
import { QUERY_GETALLUSERS } from "../../../utils/queries";

import SearchUserDisplay from "../../../components/SearchUserDisplay";
import SearchBar from "./SearchBar";

export default function UserSearch(props) {
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
      <header className="box-header">Search all Users</header>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {searchQuery ? (
        <TableContainer sx={{ maxHeight: 400 }}>
          {dataFiltered.map((user, index) => (
            <SearchUserDisplay key={index} userId={user._id} me={props.me} />
          ))}
        </TableContainer>
      ) : (
        <></>
      )}
    </div>
  );
}
