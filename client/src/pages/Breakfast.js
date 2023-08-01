import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/system";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Breakfast() {
  return (
    <Container>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 120, marginTop: 3 }}
        backgroundColor="#97FEED"
      >
        <Typography variant="h3" component="div">
          Breakfast
        </Typography>
      </Grid>
    </Container>
  );
}
