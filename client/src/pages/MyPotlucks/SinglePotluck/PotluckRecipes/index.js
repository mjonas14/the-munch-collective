import React, { useState } from "react";
import { Grid, Box, Typography, Container, IconButton } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// components
import RecipeCard from "../../../../components/RecipeCard";

const PotluckRecipes = (props) => {
  return (
    <Box className="list-box-users">
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <header className="box-header">Your Recipes</header>
        <IconButton
              aria-label="edit"
              onClick={() => console.log("Clicked!")}
              sx={{ margin: "15px" }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
      </Container>
      {props.recipes.length ? (
        <div>
          <Grid
            container
            direction="row"
            color="black"
            sx={{ marginLeft: "15px" }}
          >
            <></>
            {props.recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                name={recipe.name}
                comment={recipe.comment}
                id={recipe._id}
                img={recipe.img}
              />
            ))}
          </Grid>
        </div>
      ) : (
        <>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">
              Start adding recipes to your shared Recipe Book!
            </Typography>
          </Container>
        </>
      )}
    </Box>
  );
};

export default PotluckRecipes;
