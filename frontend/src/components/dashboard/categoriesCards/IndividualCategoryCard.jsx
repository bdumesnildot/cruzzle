import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FilterContext } from "../../../contexts/FilterContext";
import CategoryIcon from "../../../assets/dashboard/Category_icon.svg";

function CategoryCards({ categoryName, categoryColor, categoryId }) {
  const navigate = useNavigate();
  const { setSelectedCategories } = useContext(FilterContext);
  const color = categoryColor.split("(")[1].split(")")[0].split(",");

  const noTextTransformStyle = {
    textTransform: "none",
  };

  const handleClick = () => {
    setSelectedCategories([categoryId]);
    navigate("/ideas");
  };

  return (
    <Button
      className="flex flex-col items-center gap-2 justify-center rounded-3xl border border-solid border-gray-400  w-[96px] h-[96px] min-w-[96px] hover:shadow-md"
      sx={{ ...noTextTransformStyle }}
      onClick={() => handleClick()}
    >
      <div
        className="h-9 min-h-9 min-w-9 w-9 flex justify-center items-center rounded-full"
        style={{
          backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.3)`,
        }}
      >
        <img src={CategoryIcon} alt="categories" className="h-5 xl:h-4" />
      </div>
      <p className="font-semibold text-xs text-black whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
        {categoryName}
      </p>
    </Button>
  );
}

CategoryCards.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryColor: PropTypes.string.isRequired,
  categoryId: PropTypes.number.isRequired,
};

export default CategoryCards;
