import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GETME } from "../../../utils/queries";
import { ADD_PRIVATE_RECIPE } from "../../../utils/mutations";

// components
import LandingPageHeader from "../../../components/LandingPageHeader";

const AddFirstRecipe = () => {
  const [instructions, setInstructions] = useState([{ id: 1, value: "" }]);

  const [addPrivateRecipe] = useMutation(ADD_PRIVATE_RECIPE);
  const { loading, data } = useQuery(QUERY_GETME);
  const me = data?.getMe || [];

  if (loading) {
    <h3>Loading...</h3>;
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleAddField = () => {
    const newField = { id: instructions.length + 1, value: "" };
    setInstructions([...instructions, newField]);
  };

  const handleFieldChange = (id, value) => {
    const updatedFields = instructions.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setInstructions(updatedFields);
  };

  const compileInputs = () => {
    return instructions.map((field) => field.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    var base64 = await convertToBase64(formData.get("img"));

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
      // Using arbitrary number that is within confidence interval for a non-image upload
      if (base64.length < 100) {
        base64 = null;
      }

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
      window.location.replace("/signup/add-first-recipe");
    } catch (err) {
      console.error(err);
      alert("Shieee");
    }
  };

  return (
    <>
      <LandingPageHeader />
      <Box align="center">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ margin: "10px 20px 20px 20px", width: "800px" }}
        >
          <Typography
            variant="h4"
            align="center"
            style={{
              color: "black",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            Add Your First Recipe!
          </Typography>
          <FormLabel>Recipe Name:</FormLabel>
          <TextField
            margin="normal"
            fullWidth
            id="name"
            placeholder="Chocolate Sauce"
            name="name"
          />
          <FormLabel>Comment:</FormLabel>
          <TextField
            margin="normal"
            fullWidth
            id="stp3"
            placeholder="Server over ice cream with fresh berries"
            name="comment"
          />
          <FormLabel>Meal Type:</FormLabel>
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
            placeholder="1 cup sugar"
            name="ingredient1"
          />
          {instructions.map((field) => (
            <TextField
              key={field.id}
              value={field.value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              margin="normal"
              fullWidth
            />
          ))}
          <Button onClick={handleAddField} variant="contained">
            Add Instruction
          </Button>
          <FormLabel>Method:</FormLabel>
          <TextField
            margin="normal"
            fullWidth
            id="stp1"
            placeholder="Mix the sugar and cacao powder in a bowl"
            name="step1"
          />
          <FormLabel>Image:</FormLabel>
          <div>
            <input
              type="file"
              label="Image"
              id="upload-image"
              name="img"
              accept=".jpeg, .png"
            />
          </div>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ margin: "30px 10px 20px 10px" }}
          >
            Add Recipe
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddFirstRecipe;
