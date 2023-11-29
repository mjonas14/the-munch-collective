import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  FormLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);
  const [tips, setTips] = useState([]);
  const [mType, setMType] = useState('');


  const [addPrivateRecipe] = useMutation(ADD_PRIVATE_RECIPE);
  const { loading, data } = useQuery(QUERY_GETME);
  const me = data?.getMe || [];

  const mealType = [
    'Breakfast',
    'Brunch',
    'Lunch',
    'Dinner',
    'Snack',
    'Appetizer',
    'Main Course',
    'Side Dish',
    'Dessert',
    'Beverage',
  ];

  const handleChange = (event) => {
    console.log(event.currentTarget)
    setMType(event.target.value);
  };

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

  const compileInputs = () => {
    const inputs = {
      ingredients: ingredients.map((field) => field.value),
      method: method.map((field) => field.value),
      tips: tips.map((field) => field.value)
    };
    return inputs;
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
<Box sx={{ width: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Meal Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mType}
          label="Meal Type"
          onChange={handleChange}
        >
          {mealType.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
          <FormLabel>Ingredients:</FormLabel>
          <TextField
            margin="normal"
            fullWidth
            placeholder="1 cup sugar"
            name="ingredient1"
          />
          {ingredients.map((field) => (
            <TextField
              key={field.id}
              value={field.value}
              onChange={(e) => handleIngChange(field.id, e.target.value)}
              margin="normal"
              fullWidth
            />
          ))}
          <Container
            sx={{ display: "flex", alignItems: "center", paddingLeft: "0px" }}
          >
            <IconButton  onClick={handleAddIng}>
              <AddCircleIcon />
            </IconButton>
            <Typography>Add Ingredient</Typography>
          </Container>
          <FormLabel>Method:</FormLabel>
          <TextField
            margin="normal"
            fullWidth
            id="stp1"
            placeholder="Mix the sugar and cacao powder in a bowl"
            name="step1"
          />
          {method.map((field) => (
            <TextField
              key={field.id}
              value={field.value}
              onChange={(e) => handleMthdChange(field.id, e.target.value)}
              margin="normal"
              fullWidth
            />
          ))}
          <Container
            sx={{ display: "flex", alignItems: "center", paddingLeft: "0px" }}
          >
            <IconButton  onClick={handleAddMthd}>
              <AddCircleIcon />
            </IconButton>
            <Typography>Add Method</Typography>
          </Container>
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
          {tips.map((field) => (
            <TextField
              key={field.id}
              value={field.value}
              onChange={(e) => handleTipChange(field.id, e.target.value)}
              margin="normal"
              fullWidth
            />
          ))}
          <Container
            sx={{ display: "flex", alignItems: "center", paddingLeft: "0px" }}
          >
            <IconButton  onClick={handleAddTip}>
              <AddCircleIcon />
            </IconButton>
            <Typography>Add Tip</Typography>
          </Container>
          <FormLabel>Source:</FormLabel>
          <TextField
            margin="normal"
            fullWidth
            placeholder="NYT Cooking"
            name="source"
          />
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
