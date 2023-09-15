import React, { useState } from "react";

import ProfileRecipeList from "./rightSide/ProfileRecipeList";
import AddPrivateRecipe from "./rightSide/AddPrivateRecipe";

export default function RightSideSection(data) {
  const [currentPage, setCurrentPage] = useState("PersonalRecipes");

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === "PersonalRecipes") {
      return <ProfileRecipeList recipeData={data} currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === "AddRecipe") {
      return <AddPrivateRecipe currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === "Blog") {
      return <div>3</div>;
    }
    return <div>4</div>;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return <div>
    {renderPage()}
    </div>;
}
