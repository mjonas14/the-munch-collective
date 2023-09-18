import React, { useState } from "react";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, TextField, FormLabel, Container } from "@mui/material";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Auth from "../../../utils/auth";
import Typography from "@mui/material/Typography";
import { useMutation } from "@apollo/client";
import Item from "@mui/material/Grid";
import Grid from "@mui/material/Grid";

import { useQuery } from "@apollo/client";
import { QUERY_GETALLPRIVATERECIPES } from "../../../utils/queries";

import {
  ADD_PUBLIC_RECIPE,
  ADD_PRIVATE_RECIPE,
} from "../../../utils/mutations";
import CancelIcon from "@mui/icons-material/Cancel";

export default function AddPrivateRecipe({ currentPage, handlePageChange }) {
  const [addPrivateRecipe, { error, data }] = useMutation(ADD_PRIVATE_RECIPE);

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

  const handleAdd = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData.get("ing1"), "formdata ing1");

    const file = formData.get("img");
    console.log(file, "file");
    const base64 = await convertToBase64(file);
    console.log(base64);

    const methodItem = [
      formData.get("step1"),
      formData.get("step2"),
      formData.get("step3"),
    ];

    const ingredientsItem = [
      formData.get("ing1"),
      formData.get("ing2"),
      formData.get("ing3"),
    ];

    try {
      // const response = await loginUser(userFormData);
      const { data } = await addPrivateRecipe({
        variables: {
          input: {
            name: formData.get("name"),
            ingredients: ingredientsItem,
            method: methodItem,
            mealType: formData.get("mealType"),
            comment: formData.get("comment") || "",
            img: base64,
            source: formData.get("source"),
            tips: formData.get("tips"),
          },
          userId: "",
        },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }
      handlePageChange("PersonalRecipes");
      // Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      alert("Shieee");
    }
  };

  return (
    <div>
      <Box
        component="form"
        noValidate
        onSubmit={handleAdd}
        sx={{ margin: "10px 20px 20px 20px" }}
      >
        <Typography
          variant="h4"
          style={{
            color: "black",
            marginTop: "40px",
            marginBottom: "20px",
          }}
        >
          Add your recipe!
        </Typography>
        <FormLabel>Recipe Name</FormLabel>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          placeholder="Chocolate Sauce"
          name="name"
        />
        <FormLabel>Meal Type</FormLabel>
        <TextField
          margin="normal"
          fullWidth
          placeholder="Dessert"
          id="mealType"
          name="mealType"
        />
        <FormLabel>Ingredients:</FormLabel>
        <TextField
          margin="normal"
          fullWidth
          id="ing1"
          placeholder="1 cup sugar"
          name="ing1"
        />
        <TextField
          margin="normal"
          fullWidth
          id="ing2"
          placeholder="1 cup cacao powder"
          name="ing2"
        />
        <TextField
          margin="normal"
          fullWidth
          id="ing3"
          placeholder="1 cup water"
          name="ing3"
        />
        <FormLabel>Method:</FormLabel>
        <TextField
          margin="normal"
          fullWidth
          id="stp1"
          placeholder="Mix the sugar and cacao powder in a bowl"
          name="step1"
        />
        <TextField
          margin="normal"
          fullWidth
          id="stp2"
          placeholder="Add mixture and water to a pot"
          name="step2"
        />
        <TextField
          margin="normal"
          fullWidth
          id="stp3"
          placeholder="Slowly bring to a simmer, stirring continuously"
          name="step3"
        />
        <TextField
          margin="normal"
          fullWidth
          id="stp3"
          placeholder="Server over ice cream with fresh berries"
          name="comment"
        />
        <FormLabel>Image:</FormLabel>
        <div>
          <label>Upload Image</label>
          <input
            type="file"
            label="Image"
            id="upload-image"
            name="img"
            accept=".jpeg"
          />
        </div>
        <FormLabel>Comment:</FormLabel>
        <Container
          sx={{ display: "flex", alignItems: "center", paddingLeft: "0px" }}
        >
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <Typography>Add Comment</Typography>
        </Container>
        <FormLabel>Tips:</FormLabel>
        <Container
          sx={{ display: "flex", alignItems: "center", paddingLeft: "0px" }}
        >
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <Typography>Add Tip</Typography>
        </Container>
        <FormLabel>Source:</FormLabel>
        <Container
          sx={{ display: "flex", alignItems: "center", paddingLeft: "0px" }}
        >
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <Typography>Add Source</Typography>
        </Container>
        <Container sx={{ display: "flex", padding: "0px" }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ margin: "30px 10px 20px 10px" }}
          >
            Add Recipe
          </Button>
          <Button
            type="cancel"
            fullWidth
            variant="contained"
            onClick={() => handlePageChange("PersonalRecipes")}
            sx={{ margin: "30px 10px 20px 10px", backgroundColor: "red" }}
          >
            Cancel
          </Button>
        </Container>
      </Box>
    </div>
  );
}
