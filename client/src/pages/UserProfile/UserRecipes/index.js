import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";

// components
import RecipeCard from "../../../components/RecipeCard";

export default function UserRecipes({ loading, user, isFriend }) {
  return (
    <Box
      sx={{
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        margin: "0px 20px 20px 20px",
        display: "flex",
        minHeight: "200px",
      }}
    >
      {isFriend ? (
        <>
          {user.privateRecipes && user.privateRecipes.length ? (
            <div>
              <Typography
                variant="h4"
                sx={{
                  margin: "20px",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
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
            <Typography
              sx={{
                margin: "20px",
                fontSize: "25px",
              }}
            >
              No Recipes Added
            </Typography>
          )}
        </>
      ) : (
        <div>
          <Typography
            variant="h4"
            sx={{
              margin: "20px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Recipes
          </Typography>
          <LockIcon sx={{ marginLeft: "20px" }}/>
        </div>
      )}
    </Box>
  );
}
