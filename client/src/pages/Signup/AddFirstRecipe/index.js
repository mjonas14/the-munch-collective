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
import Auth from "../../../utils/auth";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GETME } from "../../../utils/queries";
import { ADD_PRIVATE_RECIPE } from "../../../utils/mutations";

// components
import LandingPageHeader from "../../../components/LandingPageHeader";

const AddFirstRecipe = () => {
  const [ingredients, setIngredients] = useState([]);
  const [method, setMethod] = useState([]);
  const [tips, setTips] = useState([]);
  const [mType, setMType] = useState("");

  const [addPrivateRecipe] = useMutation(ADD_PRIVATE_RECIPE);
  const { loading, data } = useQuery(QUERY_GETME);
  const me = data?.getMe || [];

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
      tips: tips.map((field) => field.value),
    };
    return inputs;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    var base64 = await convertToBase64(formData.get("img"));

    const vibe = {
      name: formData.get("name"),
      ingredients: ingredients.map((field) => field.value),
      method: method.map((field) => field.value),
      mealType: formData.get("mealType"),
      comment: formData.get("comment") || "",
      img: base64,
      source: formData.get("source"),
      tips: tips.map((field) => field.value),
    };

    console.log(vibe);

    try {
      // Using arbitrary number that is within confidence interval for a non-image upload
      if (base64.length < 100) {
        base64 = null;
      }

      const { data } = await addPrivateRecipe({
        variables: {
          input: {
            name: formData.get("name"),
            ingredients: ingredients.map((field) => field.value),
            method: method.map((field) => field.value),
            mealType: formData.get("mealType"),
            comment: formData.get("comment") || "",
            img: base64,
            source: formData.get("source"),
            tips: tips.map((field) => field.value),
          },
        },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }
      Auth.signup();
      window.location.replace("/myprofile");
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            <Button sx={{ width: "100px" }} disabled></Button>
            <Typography
              variant="h4"
              align="center"
              style={{
                color: "black",
              }}
            >
              Add Your First Recipe!
            </Typography>
            <Button
              onClick={() => window.location.replace("/myprofile")}
              sx={{ height: "30px", width: "100px" }}
            >
              Add later
            </Button>
          </Box>
          <Box>
            <FormLabel>Recipe Name:</FormLabel>
            <TextField
              margin="normal"
              fullWidth
              placeholder="Chocolate Sauce"
              name="name"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
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
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FormLabel>Comment:</FormLabel>
              <TextField
                multiline
                size="small"
                name="comment"
                margin="normal"
                fullWidth
              />
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <FormLabel>Ingredients:</FormLabel>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "left",
              }}
            >
              {ingredients.map((field) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    width: "50%",
                  }}
                >
                  <FormLabel>{field.id}.</FormLabel>
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
            </Grid>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <FormLabel>Method:</FormLabel>
            {method.map((field) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FormLabel>{field.id}.</FormLabel>
                <TextField
                  key={field.id}
                  value={field.value}
                  size="small"
                  onChange={(e) => handleMthdChange(field.id, e.target.value)}
                  margin="normal"
                  fullWidth
                  sx={{ margin: "10px" }}
                />
              </Box>
            ))}
            <Container
              sx={{ display: "flex", alignItems: "center", paddingLeft: "0px" }}
            >
              <IconButton onClick={handleAddMthd}>
                <AddCircleIcon />
              </IconButton>
              <Typography>Add Step</Typography>
            </Container>
          </Box>
          <Box sx={{ display: "flex", marginTop: "25px" }}>
            <FormLabel>Image:</FormLabel>
            <Box sx={{ marginLeft: "20px" }}>
              <input
                type="file"
                label="Image"
                id="upload-image"
                name="img"
                accept=".jpeg, .png"
              />
            </Box>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <FormLabel>Tips:</FormLabel>
            {tips.map((field) => (
              <TextField
                key={field.id}
                value={field.value}
                size="small"
                onChange={(e) => handleTipChange(field.id, e.target.value)}
                margin="normal"
                fullWidth
              />
            ))}
            <Container
              sx={{ display: "flex", alignItems: "center", paddingLeft: "0px" }}
            >
              <IconButton onClick={handleAddTip}>
                <AddCircleIcon />
              </IconButton>
              <Typography>Add Tip</Typography>
            </Container>
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <FormLabel>Source:</FormLabel>
            <TextField
              margin="normal"
              fullWidth
              size="small"
              placeholder="NYT Cooking"
              name="source"
            />
          </Box>
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
