import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GET_USER_BY_ID } from "../../../utils/queries";

import RecipeCard from "../../../components/RecipeCard";

export default function UserRecipes(props) {
  const { userId } = useParams();
  const { loading, data } = useQuery(QUERY_GET_USER_BY_ID, {
    variables: { userId: userId },
  });
  const user = data?.getUserById || [];
  console.log(user.privateRecipes);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#EBECF0",
        borderRadius: "16px",
        margin: "0px 20px 20px 20px",
        display: "flex",
      }}
    >
      {user.privateRecipes.length ? (
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
    </Box>
  );
}
