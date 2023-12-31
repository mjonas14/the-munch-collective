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
import breadImg from "../../../../utils/assets/images/bread.jpg";
import breakfastImg from "../../../../utils/assets/images/breakfast.jpg";
import dessertImg from "../../../../utils/assets/images/dessert.jpg";
import drinkImg from "../../../../utils/assets/images/drink.jpg";
import foodImg from "../../../../utils/assets/images/food.jpg";

import { useMutation } from "@apollo/client";

import { ADD_PRIVATE_RECIPE } from "../../../../utils/mutations";

export default function AddPrivateRecipe({ currentPage, handlePageChange }) {
  const [ingredients, setIngredients] = useState([{ id: 1, value: "" }]);
  const [method, setMethod] = useState([{ id: 1, value: "" }]);
  const [tips, setTips] = useState([]);
  const [mType, setMType] = useState("");
  const [addPrivateRecipe] = useMutation(ADD_PRIVATE_RECIPE);

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

  const autoImgChoose = (type) => {
    if (type === "Beverage") {
      return drinkImg;
    } else if (type === "Breakfast" || type === "Brunch") {
      return breakfastImg;
    } else if (type === "Dessert") {
      return dessertImg;
    } else if (
      type === "Dinner" ||
      type === "Lunch" ||
      type === "Main Course"
    ) {
      return foodImg;
    } else {
      return foodImg;
    }
  };

  const handleChange = (event) => {
    setMType(event.target.value);
  };

  const convertToBase64 = (file) => {
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
  };

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
    console.log(ingredients, "ingredient");
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

    var imgUpload = await convertToBase64(formData.get("img"));

    try {
      // Using arbitrary number that is within confidence interval for a non-image upload
      if (imgUpload.length < 100) {
        imgUpload = autoImgChoose(formData.get("mealType"));
        console.log(imgUpload);
      }

      const { data } = await addPrivateRecipe({
        variables: {
          input: {
            name: formData.get("name"),
            ingredients: ingredients.map((field) => field.value),
            method: method.map((field) => field.value),
            mealType: formData.get("mealType"),
            comment: formData.get("comment") || "",
            img: imgUpload,
            source: formData.get("source"),
            tips: tips.map((field) => field.value),
          },
        },
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }
      // handlePageChange("PersonalRecipes");
      window.location.reload();
    } catch (err) {
      console.error(err);
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
          autoFocus
        />
        <Box>
          <FormLabel>Comment:</FormLabel>
          <TextField
            margin="normal"
            placeholder="Chocolate Sauce"
            name="comment"
            size="small"
            fullWidth
            multiline
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
        </Box>
        <FormLabel>Ingredients:</FormLabel>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                multiline
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
              autoFocus
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
