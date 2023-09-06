import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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

export default function EditProileInfo(props) {
  const handleClose = () => props.set(false);

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
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="cityLiving"
              label="Where do you live?"
              name="cityLiving"
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
              name="yearOfBirth"
              label="What year were you born?"
              type="yearOfBirth"
              id="yearOfBirth"
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
