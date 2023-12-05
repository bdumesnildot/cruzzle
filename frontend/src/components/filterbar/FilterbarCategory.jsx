import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select } from "@mui/material";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { FilterContext } from "../../contexts/FilterContext";
import { fetchAll } from "../../services/api.services";

export default function FilterbarCategory({ isDisable }) {
  const { t } = useTranslation();
  const [categoryList, setCategoryList] = useState([]);
  const { selectedCategories, setSelectedCategories } =
    useContext(FilterContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetchAll("/api/categories")
      .then((data) => setCategoryList(data))
      .catch((error) =>
        console.error("error from api.services.fetcher", error)
      );
  }, []);

  return (
    <FormControl disabled={isDisable} className="w-full">
      <Select
        id="filter-category-select"
        className="h-10 w-full rounded-full"
        multiple
        displayEmpty
        value={selectedCategories}
        onChange={handleChange}
        renderValue={(selected) => {
          return (
            <>
              <Square3Stack3DIcon className="w-4 mr-2" />
              {categoryList.length === 0 || selected.length === 0 ? (
                <span>
                  {t("pages.ideas.ideaspage.filterbarCategory.allcategories")}
                </span>
              ) : (
                selected.map((id) => categoryList[id - 1].label).join(", ")
              )}
            </>
          );
        }}
      >
        {categoryList?.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

FilterbarCategory.propTypes = {
  isDisable: PropTypes.bool.isRequired,
};
