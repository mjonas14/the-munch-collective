import React from "react";
import {
  FormLabel,
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
} from "@mui/material";

import { useMutation } from "@apollo/client";
import { CREATE_POTLUCK } from "../../../utils/mutations";

const CreatePotluckModal = ({ showModal, setShowModal }) => {
  const [createPotluck] = useMutation(CREATE_POTLUCK);
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

  const handleCreate = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title");

    try {
      const { data } = await createPotluck({
        variables: { title: title },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }

      const redirectUrl = `/mypotlucks/${data.createPotluck._id}`;
      window.location.href = redirectUrl;

      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={showModal}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={showModal}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Create a new Potluck
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Potluck's allow you to share recipes within a group
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleCreate}
            sx={{ margin: "10px 20px 20px 20px" }}
          >
            <FormLabel>Potluck Name:</FormLabel>
            <TextField
              margin="normal"
              fullWidth
              id="title"
              placeholder="Family Jonas"
              name="title"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ margin: "30px 10px 20px 10px" }}
            >
              Create Potluck
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreatePotluckModal;
