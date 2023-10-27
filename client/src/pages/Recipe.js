import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_GETPUBLICRECIPEBYID, QUERY_GETPRIVATERECIPEBYID } from "../utils/queries";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Recipe = () => {
  const { recId } = useParams();

  const { loading, data } = useQuery(QUERY_GETPRIVATERECIPEBYID, {
    variables: { recipeId: recId },
  });

  const recipe = data?.getPublicRecipeById || [];

  console.log(recipe, "recipe");
  console.log(data, "data");

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", marginTop: "20px" }}
      >
        <Grid item xs={3}>
          <Card
            sx={{
              width: 900,
            }}
          >
            <CardContent sx={{ marginLeft: "150px", marginRight: "80px" }}>
              <Typography
                component="div"
                sx={{ marginTop: "10px", color: "gray" }}
              >
                {/* {recipe.createdAt.substring(0, recipe.createdAt.length - 12)} */}
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{ marginTop: "20px" }}
              >
                {recipe.name}
              </Typography>
              <Typography
                sx={{ mb: 1.5, marginTop: "10px" }}
                color="text.secondary"
              >
                {recipe.comment}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "40px" }}
              >
                Ingredients:
              </Typography>
              {recipe.ingredients ? recipe.ingredients.map((ingredient, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ marginTop: "3px", fontWeight: "light" }}
                >
                  {ingredient}
                </Typography>
              )) : <h1>Nope</h1>}
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "40px" }}
              >
                Instructions:
              </Typography>
              {recipe.method ? recipe.method.map((step, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    fontWeight: "light",
                    marginTop: "10px",
                    marginLeft: "20px",
                  }}
                >
                  {index + 1 + ". " + step}
                </Typography>
              )) : <h1>Nope</h1>}
              {recipe.tips ? (
                <div>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", marginTop: "40px" }}
                  >
                    Tips:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "light",
                      marginTop: "5px",
                      marginLeft: "20px",
                    }}
                  >
                    {recipe.tips}
                  </Typography>
                </div>
              ) : (
                <div style={{ marginBottom: "40px" }}></div>
              )}
              {recipe.source ? (
                <div>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "light",
                      marginTop: "20px",
                      marginBottom: "40px",
                    }}
                  >
                    <strong>Source:</strong> {recipe.source}
                  </Typography>
                </div>
              ) : (
                <div style={{ marginBottom: "40px" }}></div>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Recipe;
