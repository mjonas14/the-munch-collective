import React from "react";
import Box from "@mui/material/Box";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, TextField } from "@mui/material";
import { FormControl, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_PUBLIC_RECIPE } from "../../utils/mutations";

export default function AddPrivateRecipe() {
  const [addPublicRecipe, { error, data }] = useMutation(ADD_PUBLIC_RECIPE);

  const handleAdd = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData.get("ing1"), "formdata ing1");

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

    console.log(methodItem);
    console.log(ingredientsItem);
    console.log(formData.get("name"));
    console.log(formData.get("mealType"));
    
    try {
      // const response = await loginUser(userFormData);
      const { data } = await addPublicRecipe({
        variables: { input: {
          name: formData.get("name"),
          ingredients: ingredientsItem,
          method: methodItem,
          mealType: formData.get("mealType"),
        }, }
      });
      if (!data) {
        throw new Error("Something went wrong!");
      }
      // Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      alert("Shieee");
    }
  };

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleAdd} sx={{ mt: 1 }}>
        {/* <FormLabel>Recipe Name</FormLabel> */}
        <TextField
          margin="normal"
          fullWidth
          id="name"
          name="name"
          autoFocus
        />
        {/* <FormLabel>Meal Type</FormLabel> */}
        <TextField
          margin="normal"
          fullWidth
          id="mealType"
          name="mealType"
          autoFocus
        />
        {/* <FormLabel>Ingredients:</FormLabel> */}
        <TextField
          margin="normal"
          fullWidth
          id="ing1"
          placeholder="100g Dark Chocolate"
          name="ing1"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="ing2"
          placeholder="1 cup flour"
          name="ing2"
          F
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="ing3"
          placeholder="1/2 cup sugar"
          name="ing3"
          autoFocus
        />
        {/* <FormLabel>Method:</FormLabel> */}
        <TextField
          margin="normal"
          fullWidth
          id="stp1"
          placeholder="Melt the chocolate over a water bed"
          name="step1"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="stp2"
          placeholder="Whisk in the flour"
          name="step2"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="stp3"
          placeholder="Stir in the sugar"
          name="step3"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}
