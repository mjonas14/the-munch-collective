import React from "react";
import { Container, TextField } from "@mui/material";

export default function SearchBar({ setSearchQuery }) {
  return (
    <Container sx={{ marginBottom: "15px" }}>
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
      </form>
    </Container>
  );
}
