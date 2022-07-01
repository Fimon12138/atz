import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => 
    categories.reduce((acc, docSnapshot) => {
      const {title, items} = docSnapshot;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);