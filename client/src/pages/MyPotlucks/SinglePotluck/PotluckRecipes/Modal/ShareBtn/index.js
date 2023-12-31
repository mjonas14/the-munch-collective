import React, { useState } from "react";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import {
  ADD_RECIPE_TO_POTLUCK,
  REMOVE_RECIPE_FROM_POTLUCK,
} from "../../../../../../utils/mutations";

const ShareBtn = ({ setRecipes, recipes, potluck, recipe, recId }) => {
  const [btnState, setBtnState] = useState(true);
  const [addRecipeToPotluck] = useMutation(ADD_RECIPE_TO_POTLUCK);
  const [removeRecipeFromPotluck] = useMutation(REMOVE_RECIPE_FROM_POTLUCK);

  const handleRemove = async (recId) => {
    try {
      const { data } = removeRecipeFromPotluck({
        variables: {
          potluckId: potluck._id,
          recId: recId,
        },
      });
      setRecipes((prevArray) => prevArray.filter((item) => item._id !== recId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async (recId) => {
    try {
      const { data } = await addRecipeToPotluck({
        variables: {
          potluckId: potluck._id,
          recId: recId,
        },
      });
      setRecipes((prevArray) => [...prevArray, recipe]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {recipes.some((recipe) => recipe._id === recId) ? (
        <Button
          size="small"
          color="error"
          onClick={(e) => {
            e.preventDefault();
            handleRemove(recId);
          }}
          style={{ display: "flex", justfiyContent: "center" }}
        >
          {!btnState ? "Share" : "Unshare"}
        </Button>
      ) : (
        <Button
          size="small"
          color="error"
          onClick={(e) => {
            e.preventDefault();
            handleAdd(recId);
          }}
          style={{ display: "flex", justfiyContent: "center" }}
        >
          {btnState ? "Share" : "Unshare"}
        </Button>
      )}
    </>
  );
};

export default ShareBtn;
