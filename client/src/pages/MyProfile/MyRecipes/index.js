import React, { useState } from "react";

import ProfileRecipeList from "./components/ProfileRecipeList";
import AddPrivateRecipe from "./components/AddPrivateRecipe";

export default function RightSideSection(data) {
  const [currentPage, setCurrentPage] = useState("PersonalRecipes");

  const handlePageChange = (page) => setCurrentPage(page);

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "PersonalRecipes") {
      return (
        <ProfileRecipeList
          recipeData={data}
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
    if (currentPage === "Blog") {
      return <div>3</div>;
    }
    return <div>4</div>;
  };

  return <div>{renderPage()}</div>;
}
