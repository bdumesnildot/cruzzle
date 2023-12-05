/* eslint-disable no-underscore-dangle */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import CustomChip from "../../styledComponents/CustomChip";
import ActionIcons from "./ActionIcons";
import datagridlocaletext from "../../../locales/datagridlocaletext";

export default function TableOfCategories({ categoriesList, setUpdateList }) {
  const { t } = useTranslation();
  const rows = categoriesList;
  const columns = [
    {
      field: "label",
      headerName: t(
        "pages.adminpannel.categories.tableOfCategories.columns.title"
      ),
      minWidth: 200,
      flex: 1.75,
    },
    {
      field: "ideas",
      headerName: t(
        "pages.adminpannel.categories.tableOfCategories.columns.use.title"
      ),
      valueGetter: (params) =>
        `${params.row._count.idea_category} ${t(
          "pages.adminpannel.categories.tableOfCategories.columns.use.render"
        )}`,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "color",
      headerName: t(
        "pages.adminpannel.categories.tableOfCategories.columns.color"
      ),
      minWidth: 250,
      flex: 1,
    },
    {
      field: "preview",
      headerName: t(
        "pages.adminpannel.categories.tableOfCategories.columns.preview"
      ),
      renderCell: (params) => {
        return (
          <CustomChip label={params.row.label} colorchoice={params.row.color} />
        );
      },
      minWidth: 250,
      flex: 1,
      sortable: false,
    },
    {
      field: "actions",
      headerName: t(
        "pages.adminpannel.categories.tableOfCategories.columns.actions"
      ),
      renderCell: (params) => {
        return (
          <ActionIcons category={params.row} setUpdateList={setUpdateList} />
        );
      },
      minWidth: 100,
      flex: 0.25,
      align: "left",
      sortable: false,
    },
  ];

  return (
    <div className="w-full h-full">
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
        localeText={datagridlocaletext}
      />
    </div>
  );
}

TableOfCategories.propTypes = {
  categoriesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      _count: PropTypes.shape({
        idea_category: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
