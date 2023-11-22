import React from 'react';
import { Typography } from '@mui/material';

export default function LandingPageHeader() {

    return (
        <Typography
        variant="h5"
        sx={{
          marginTop: 4,
          display: "flex",
          justifyContent: "center",
          fontFamily: "Georgia",
          fontWeight: 400,
          fontSize: 50,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        The<span style={{ fontStyle: "italic", marginLeft: "15px", marginRight: "15px" }}>Munch</span>Collective
      </Typography>
    )
}