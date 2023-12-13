import React, { useState } from "react";

import ProfileRecipeList from "./components/ProfileRecipeList";
import AddPrivateRecipe from "./components/AddPrivateRecipe";

export default function MyRecipes(props) {
  const [currentPage, setCurrentPage] = useState("PersonalRecipes");

  const handlePageChange = (page) => setCurrentPage(page);

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "PersonalRecipes") {
      return (
        <ProfileRecipeList
          recipeData={props}
          handlePageChange={handlePageChange}
        />
      );
    }
    if (currentPage === "AddRecipe") {
      return (
        <AddPrivateRecipe
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      );
    }
  };

  return <div>{renderPage()}</div>;
}
