import React from "react";
import { Container, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Grid, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { useQuery } from "@apollo/client";
import { QUERY_GETALLPRIVATERECIPES } from "../../../utils/queries";

import RecipeCard from "../../../components/RecipeCard";

function ProfileRecipeList({ recipeData, currentPage, handlePageChange }) {
  const { loading, data } = useQuery(QUERY_GETALLPRIVATERECIPES);
  const recipes = data?.getAllPrivateRecipes || [];
  console.log(recipeData, "yooo");
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
      {recipeArray.length ? (
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
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Add your first recipe</Typography>
          <ArrowRightAltIcon
            sx={{ margin: "25px", color: "gray" }}
            fontSize="large"
          />
          <ArrowRightAltIcon
            sx={{ margin: "25px", color: "gray" }}
            fontSize="large"
          />
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
}

export default ProfileRecipeList;
