import React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
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

const EditProfileModal = (props) => {
  const [addUserDetails] = useMutation(ADD_USER_DETAILS);

  const handleClose = () => {
    props.set(false);
    window.location.reload();
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      // if (file) {
      fileReader.readAsDataURL(file);
      // }
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const file = formData.get("img");
    var base64 = await convertToBase64(file);
    console.log(base64);

    // Using arbitrary number that is within confidence interval for a non-image upload
    if (base64.length < 100) {
      base64 = null;
    }

    try {
      const { data } = await addUserDetails({
        variables: {
          profilePic: base64,
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
            Add / change your profile picture
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            Pic any photo from your files
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <div>
              <input
                type="file"
                label="Image"
                id="upload-image"
                name="img"
                accept=".jpeg, .png"
              />
            </div>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Save to Profile
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditProfileModal;
