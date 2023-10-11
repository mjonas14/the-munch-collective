import React from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ setSearchQuery }) {
  return (
    <Container sx={{marginBottom: "15px"}}>
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e) => {
          setSearchQuery(e.target.value);
        }}
        label="Search by username"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      {/* <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton> */}
    </form>
    </Container>
  );
};
