import React from 'react';

import {
    Typography
} from '@mui/material';

export default function ErrorPage() {

    return (
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
    )
}