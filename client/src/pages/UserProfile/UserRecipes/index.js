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
import RecipeCardLg from "../../../components/RecipeCardLg";

export default function UserRecipes({ loading, user, isFriend }) {
  return (
    <Box className={"list-box-recipes"} sx={{ margin: "0px 20px 20px 20px" }}>
      {isFriend ? (
        <>
          {user.privateRecipes && user.privateRecipes.length ? (
            <div>
              <header className={"box-header"}>
                Recipes ({user.privateRecipes.length})
              </header>
              <Grid
                container
                direction="row"
                color="black"
                sx={{ marginLeft: "15px" }}
              >
                {user.privateRecipes.map((recipe, index) => (
                  <RecipeCardLg key={index} recipe={recipe} />
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
          <header className={"box-header"}>Recipes</header>
          <LockIcon sx={{ marginLeft: "20px" }} />
        </div>
      )}
    </Box>
  );
}
