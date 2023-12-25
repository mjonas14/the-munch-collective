import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_GETPRIVATERECIPEBYID } from "../utils/queries";

const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      mx: "2px",
      transform: "scale(0.8)",
      marginRight: "10px",
    }}
  >
    •
  </Box>
);

const Recipe = () => {
  const { recId } = useParams();

  const { loading, data } = useQuery(QUERY_GETPRIVATERECIPEBYID, {
    variables: { recipeId: recId },
  });

  const recipe = data?.getPrivateRecipeById || [];

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh", marginTop: "20px", marginBottom: "30px" }}
    >
      <Grid item xs={3}>
        <Card className="recipe">
          <CardContent sx={{ marginLeft: "100px", marginRight: "80px" }}>
            <Typography
              component="h5"
              sx={{
                marginTop: "45px",
                color: "gray",
              }}
            >
              {recipe.createdAt}
            </Typography>
            <Typography
              variant="h3"
              component="div"
              align="center"
              sx={{ marginTop: "20px", }}
            >
              {recipe.name}
            </Typography>
            <Typography
              sx={{ mb: 1.5, marginTop: "10px" }}
              color="text.secondary"
              align="center"
              fontStyle="italic"
            >
              {recipe.comment}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: "40px" }}
            >
              Ingredients:
            </Typography>
            {recipe.ingredients ? (
              recipe.ingredients.map((ingredient, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ fontWeight: "light", mt: "3px" }}
                >
                  - {ingredient.toLowerCase()}
                </Typography>
              ))
            ) : (
              <h1>Nope</h1>
            )}
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", marginTop: "40px" }}
            >
              Instructions:
            </Typography>
            {recipe.method ? (
              recipe.method.map((step, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    fontWeight: "light",
                    mt: "10px",
                    marginLeft: "20px",
                  }}
                >
                  {index + 1 + ". " + step}
                </Typography>
              ))
            ) : (
              <h1>Nope</h1>
            )}
            {recipe.tips && recipe.tips.length > 0 ? (
              <div>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginTop: "40px" }}
                >
                  Tips:
                </Typography>
                {recipe.tips.map((tip, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{
                      fontWeight: "light",
                      marginTop: "5px",
                      marginLeft: "20px",
                    }}
                  >
                    {bull}
                    {tip}
                  </Typography>
                ))}
              </div>
            ) : (
              <>
                <Box sx={{ marginBottom: "40px", height: "100px" }}></Box>
              </>
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
  );
};

export default Recipe;
