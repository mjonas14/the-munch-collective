import React from "react";
import { Grid, Box, Typography, Container, IconButton } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useQuery } from "@apollo/client";
import { QUERY_GETALLPRIVATERECIPES } from "../../../../utils/queries";

import RecipeCardLg from "../../../../components/RecipeCardLg";

const ProfileRecipeList = ({ recipeData, handlePageChange }) => {
  const { loading, data } = useQuery(QUERY_GETALLPRIVATERECIPES);
  const recipes = data?.getAllPrivateRecipes || [];
  const recipeArray = recipeData.data;

  return (
    <Box
      sx={{
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        margin: "20px 20px 20px 10px",
        padding: "0px",
      }}
    >
      {recipeArray && recipeArray.length ? (
        <div>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Your Recipes</Typography>
            <IconButton
              aria-label="edit"
              onClick={() => handlePageChange("AddRecipe")}
              sx={{ margin: "15px" }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Container>
          <Grid
            container
            direction="row"
            color="black"
            sx={{ marginLeft: "15px" }}
          >
            {recipeArray.map((recipe, index) => (
              <RecipeCardLg
                key={index}
                recipe={recipe}
              />
            ))}
          </Grid>
        </div>
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Your Recipe Book is empty</Typography>
          <ArrowRightAltIcon
            sx={{ margin: "25px", color: "gray" }}
            fontSize="large"
          />
          <IconButton
            aria-label="edit"
            onClick={() => handlePageChange("AddRecipe")}
            sx={{ margin: "15px" }}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Container>
      )}
    </Box>
  );
};

export default ProfileRecipeList;
