import React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import { useMutation } from "@apollo/client";
import { ADD_USER_DETAILS } from "../../../../../utils/mutations";

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

const EditInfoModal = (props) => {
  const [addUserDetails] = useMutation(ADD_USER_DETAILS);

  const handleClose = () => {
    props.set(false);
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await addUserDetails({
        variables: {
          bio: formData.get("bio"),
          cityBorn: formData.get("cityBorn"),
          cityLive: formData.get("cityLive"),
          favCuisine: formData.get("favCuisine"),
          signatureDish: formData.get("signatureDish"),
          yob: parseFloat(formData.get("yob")),
        },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }
      handleClose();
    } catch (err) {
      console.error(err);
      alert("An error has been found!");
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.show}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.show}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Edit Infomation
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Tell people a bit about yourself!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="cityLive"
              label="Where do you live?"
              name="cityLive"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="cityBorn"
              label="Where were you born?"
              name="cityBorn"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="yob"
              label="What year were you born?"
              type="yob"
              id="yob"
            />
            <TextField
              margin="normal"
              fullWidth
              name="favCuisine"
              label="Favourite cuisine"
              type="favCuisine"
              id="favCuisine"
            />
            <TextField
              margin="normal"
              fullWidth
              name="signatureDish"
              label="Signature dish"
              type="signatureDish"
              id="signatureDish"
            />
            <TextField
              margin="normal"
              fullWidth
              name="bio"
              label="Tell us about you!"
              type="bio"
              id="bio"
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save to Profile
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditInfoModal;
