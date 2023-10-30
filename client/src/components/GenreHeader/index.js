import React from 'react';
import {
    Grid, 
    Typography
} from '@mui/material';

const GenreHeader = ({ genreName }) => {
    return (
        <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: 120, marginTop: 3, marginBottom: 2 }}
        backgroundColor="#e0e0e0"
      >
        <Typography variant="h3" component="div">
          {genreName}
        </Typography>
      </Grid>
    );
};

export default GenreHeader;
