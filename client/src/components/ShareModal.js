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
  width: 600,
  bgcolor: "white",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

export default function ShareModal(props) {
  const handleClose = () => props.set(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
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
          <Typography 
          id="transition-modal-title" 
          variant="h6" 
          component="h2"
          sx={{marginBottom: "10px"}}>
            Copy link and share:
          </Typography>
          <box border>
            localhost:3000/recipe/{props.recipeId}
            {/* {window.location} */}
          </box>
        </Box>
      </Fade>
    </Modal>
  );
}
