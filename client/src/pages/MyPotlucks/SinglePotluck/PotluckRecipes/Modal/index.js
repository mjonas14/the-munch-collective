import React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_RECIPE_TO_POTLUCK } from "../../../../../utils/mutations";

const AddRecipesModal = ({ me, potluck, showModal, setShowModal }) => {
  const [addRecipeToPotluck] = useMutation(ADD_RECIPE_TO_POTLUCK);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    bgcolor: "white",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (recId) => {
    try {
      const { data } = addRecipeToPotluck({
        variables: {
          potluckId: potluck._id,
          recId: recId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={true}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={true}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Choose recipes to share
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            The recips you select will be added to the potluck and shared with
            its members. Happy cooking!
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            {" "}
            <Grid
              container
              direction="row"
              color="black"
              sx={{ marginLeft: "15px" }}
            >
              {me.privateRecipes.map((recipe, index) => (
                <Card
                  sx={{
                    width: 300,
                    height: 50,
                    margin: "0px 10px 20px 10px",
                    display: "flex",
                    justifyContent: "speace-between",
                  }}
                >
                  <CardActionArea component={Link} to={`/recipe/${recipe._id}`}>
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <header>{recipe.name}</header>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {potluck.recipes.some((rec) => rec._id === recipe._id) ? (
                      <Button
                        size="small"
                        color="error"
                        onClick={handleSubmit}
                        style={{ display: "flex", justfiyContent: "center" }}
                      >
                        Unshare
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit(recipe._id);
                        }}
                        style={{ display: "flex", justfiyContent: "center" }}
                      >
                        Share
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddRecipesModal;
