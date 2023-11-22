import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

// MUI icons
import LockIcon from "@mui/icons-material/Lock";

// components
import RecipeCard from "../../../components/RecipeCard";

export default function UserRecipes({ loading, user, isFriend }) {
  return (
    <Box className={"list-box-recipes"} sx={{ margin: "0px 20px 20px 20px" }}>
      {isFriend ? (
        <>
          {user.privateRecipes && user.privateRecipes.length ? (
            <div>
              <Typography className={"box-header"} variant="h4">
                Recipes ({user.privateRecipes.length})
              </Typography>
              <Grid
                container
                direction="row"
                color="black"
                sx={{ marginLeft: "15px" }}
              >
                {user.privateRecipes.map((recipe, index) => (
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
            <Typography variant="h4" sx={{ margin: "20px" }}>
              No Recipes Added
            </Typography>
          )}
        </>
      ) : (
        <div>
          <Typography className={"box-header"} variant="h4">
            Recipes
          </Typography>
          <LockIcon sx={{ marginLeft: "20px" }}/>
        </div>
      )}
    </Box>
  );
}
