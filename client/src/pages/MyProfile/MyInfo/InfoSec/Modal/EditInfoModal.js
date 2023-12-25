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
import TableContainer from "@mui/material/TableContainer";

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

const EditInfoModal = ({ show, set, me }) => {
  const [addUserDetails] = useMutation(ADD_USER_DETAILS);

  const handleClose = () => {
    set(false);
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
      open={show}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={show}>
        <Box sx={style}>
          <TableContainer sx={{ maxHeight: 550 }}>
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
                multiline
                rows={3}
                name="bio"
                label="Tell us about yourself!"
                type="bio"
                id="bio"
                autoFocus
                defaultValue={me.bio}
              />
              <TextField
                margin="normal"
                fullWidth
                id="cityLive"
                label="Where do you live?"
                name="cityLive"
                defaultValue={me.cityLive}
              />
              <TextField
                margin="normal"
                fullWidth
                id="cityBorn"
                label="Where were you born?"
                name="cityBorn"
                defaultValue={me.cityBorn}
              />
              <TextField
                margin="normal"
                fullWidth
                name="yob"
                label="What year were you born?"
                type="yob"
                id="yob"
                defaultValue={me.yob}
              />
              <TextField
                margin="normal"
                fullWidth
                name="favCuisine"
                label="Favourite cuisine"
                type="favCuisine"
                id="favCuisine"
                defaultValue={me.favCuisine}
              />
              <TextField
                margin="normal"
                fullWidth
                name="signatureDish"
                label="Signature dish"
                type="signatureDish"
                id="signatureDish"
                defaultValue={me.signatureDish}
              />
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Save to Profile
              </Button>
            </Box>
          </TableContainer>
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditInfoModal;
