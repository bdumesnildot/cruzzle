import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { apiCategoriesOrder } from "../../../services/api.categories";
import CategoryCard from "./IndividualCategoryCard";
import HorizontalScroll from "../../scroller/HorizontalScroll";

function CategoryCards() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const displayCategories = categories.slice(0, 5);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiCategoriesOrder();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div id="overview" className="w-full">
      <h4 className="text-black">{t("pages.home.dashboard.top5Categories")}</h4>
      <HorizontalScroll>
        <div className="flex gap-2 no-scrollbar py-2">
          {displayCategories.map((category) => {
            return (
              <CategoryCard
                key={category.id}
                categoryName={category.label}
                categoryColor={category.color}
                categoryId={category.id}
              />
            );
          })}
        </div>
      </HorizontalScroll>
    </div>
  );
}

export default CategoryCards;
