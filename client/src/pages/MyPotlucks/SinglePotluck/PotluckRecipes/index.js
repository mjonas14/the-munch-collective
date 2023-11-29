import React, { useState } from "react";
import { Grid, Box, Typography, Container, IconButton } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// components
import RecipeCardLg from "../../../../components/RecipeCardLg";
import AddRecipesModal from "./Modal";

const PotluckRecipes = ({ me, potluck }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box className={"list-box-users"}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <header className="box-header-sc">Shared Recipes</header>
        <IconButton
              aria-label="edit"
              onClick={() => setShowModal(true)}
              sx={{ margin: "15px" }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
      </Container>
      {potluck.recipes.length ? (
        <div>
          <Grid
            container
            direction="row"
            color="black"
            sx={{ marginLeft: "15px" }}
          >
            <></>
            {potluck.recipes.map((recipe, index) => (
              <RecipeCardLg
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
      <AddRecipesModal me={me} potluck={potluck} showModal={showModal} setShowModal={setShowModal} />
    </Box>
  );
};

export default PotluckRecipes;