import React, { useState } from "react";
import {
  IconButton,
  TextField,
  FormLabel,
  Container,
  Box,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import Auth from "../../../../utils/auth";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GETALLPRIVATERECIPES } from "../../../../utils/queries";

import { ADD_PRIVATE_RECIPE } from "../../../../utils/mutations";
import CancelIcon from "@mui/icons-material/Cancel";

import AddFirstRecipe from "../../../Signup/AddFirstRecipe";

export default function AddPrivateRecipe({ currentPage, handlePageChange }) {
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);
  const [tips, setTips] = useState([]);
  const [mType, setMType] = useState("");
  const [addPrivateRecipe] = useMutation(ADD_PRIVATE_RECIPE);

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

  const mealType = [
    "Appetizer",
    "Beverage",
    "Breakfast",
    "Brunch",
    "Dessert",
    "Dinner",
    "Lunch",
    "Main Course",
    "Side Dish",
    "Snack",
  ];

  const handleChange = (event) => {
    console.log(event.currentTarget);
    setMType(event.target.value);
  };

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

  const handleAddIng = () => {
    const newField = { id: ingredients.length + 1, value: "" };
    setIngredients([...ingredients, newField]);
  };

  const handleAddMthd = () => {
    const newField = { id: method.length + 1, value: "" };
    setMethod([...method, newField]);
  };

  const handleAddTip = () => {
    const newField = { id: tips.length + 1, value: "" };
    setTips([...tips, newField]);
  };

  const handleIngChange = (id, value) => {
    const updatedFields = ingredients.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setIngredients(updatedFields);
  };

  const handleMthdChange = (id, value) => {
    const updatedFields = method.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setMethod(updatedFields);
  };

  const handleTipChange = (id, value) => {
    const updatedFields = tips.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setTips(updatedFields);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const file = formData.get("img");
    var base64 = await convertToBase64(file);

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
      handlePageChange("PersonalRecipes");
      window.location.reload();
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
        <FormLabel>Recipe Name:</FormLabel>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          placeholder="Chocolate Sauce"
          name="name"
          size="small"
        />
        <Box
          sx={{
            width: 300,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormLabel>Meal Type:</FormLabel>
          <FormControl width="50px" sx={{ margin: "8px" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value={mType}
              onChange={handleChange}
              name="mealType"
            >
              {mealType.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormLabel>Ingredients:</FormLabel>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "50%",
          }}
        >
          <FormLabel>1.</FormLabel>
          <TextField
            margin="normal"
            fullWidth
            id="ing1"
            placeholder="1 cup sugar"
            name="ing1"
            size="small"
            sx={{ margin: "10px" }}
          />
        </Box>
        {ingredients.map((field) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              width: "50%",
            }}
          >
            <FormLabel>{field.id + 1}.</FormLabel>
            <TextField
              key={field.id}
              value={field.value}
              size="small"
              onChange={(e) => handleIngChange(field.id, e.target.value)}
              margin="normal"
              fullWidth
              sx={{ margin: "10px" }}
            />
          </Box>
        ))}
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "0px",
          }}
        >
          <IconButton onClick={handleAddIng}>
            <AddCircleIcon />
          </IconButton>
          <Typography>Add Ingredient</Typography>
        </Container>
        <FormLabel>Method:</FormLabel>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            width: "80%",
          }}
        >
          <FormLabel>1.</FormLabel>
          <TextField
            margin="normal"
            fullWidth
            id="stp1"
            placeholder="Mix the sugar and cacao powder in a bowl"
            name="step1"
            size="small"
            sx={{ margin: "10px" }}
          />
        </Box>
        {method.map((field) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              width: "80%",
            }}
          >
            <FormLabel>{field.id + 1}.</FormLabel>
            <TextField
              key={field.id}
              value={field.value}
              size="small"
              onChange={(e) => handleIngChange(field.id, e.target.value)}
              margin="normal"
              fullWidth
              sx={{ margin: "10px" }}
            />
          </Box>
        ))}
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "0px",
          }}
        >
          <IconButton onClick={handleAddMthd}>
            <AddCircleIcon />
          </IconButton>
          <Typography>Add Step</Typography>
        </Container>
        <FormLabel>Comment:</FormLabel>
        <TextField
          margin="normal"
          fullWidth
          id="stp3"
          placeholder="Server over ice cream with fresh berries"
          name="comment"
          size="small"
          sx={{ margin: "10px" }}
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
