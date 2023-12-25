import React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: "50px" }}>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
