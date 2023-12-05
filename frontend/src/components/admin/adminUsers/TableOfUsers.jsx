import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { UserContext } from "../../../contexts/UserContext";
import apiAdminRoles from "../../../services/api.admin.roles";
import CheckboxUserIsActive from "./CheckboxUserIsActive";
import TableSelectRole from "./TableSelectRole";
import ActionIcons from "./ActionIcons";
import localeText from "../../../locales/datagridlocaletext";

export default function TableOfUsers({ userList, setUpdateList }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [roleList, setRoleList] = useState(null);

  useEffect(() => {
    apiAdminRoles()
      .then((res) => {
        if (res.status === 200) {
          setRoleList(res.data);
        } else {
          navigate("/error", {
            state: {
              error: {
                status: res.status,
              },
            },
          });
          console.error("Cannot get roles");
        }
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            error: {
              status: 500,
            },
          },
        });
        console.error("Error getting roles", error);
      });
  }, []);

  const rows = userList;
  const columns = [
    {
      field: "firstname",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.firstname"),
      minWidth: 90,
      flex: 1,
    },
    {
      field: "lastname",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.lastname"),
      minWidth: 90,
      flex: 1,
    },
    {
      field: "mail",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.mail"),
      minWidth: 200,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.createdAt"),
      valueGetter: (params) =>
        dayjs(params.row.created_at).format(
          t("pages.adminpannel.users.dateFormats.short")
        ),
      minWidth: 110,
      flex: 1,
    },
    {
      field: "joined_at",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.joinedAt"),
      valueGetter: (params) =>
        dayjs(params.row.joined_at).format(
          t("pages.adminpannel.users.dateFormats.short")
        ),
      minWidth: 110,
      flex: 1,
    },
    {
      field: "agency",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.agency"),
      valueGetter: (params) =>
        `${params.row.agency.name}, ${params.row.agency.city}`,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "position",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.position"),
      valueGetter: (params) => params.row.position.name,
      minWidth: 150,
      flex: 1,
    },
    {
      field: "role",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.role"),
      renderCell: (params) => {
        return user.role.id === 88
          ? roleList && (
              <TableSelectRole user={params.row} roleList={roleList} />
            )
          : params.row.role.name;
      },
      minWidth: 140,
      sortable: false,
      flex: 1,
    },
    {
      field: "is_active",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.isActive"),
      renderCell: (params) => {
        const [isActiveUser, setIsActiveUser] = useState(params.row.is_active);
        return (
          <CheckboxUserIsActive
            isActiveUser={isActiveUser}
            setIsActiveUser={setIsActiveUser}
            userId={params.row.id}
          />
        );
      },
      align: "center",
      minWidth: 60,
      flex: 0.25,
      sortable: false,
    },
    {
      field: "id",
      headerName: t("pages.adminpannel.users.tableOfUsers.columns.actions"),
      renderCell: (params) => {
        return <ActionIcons user={params.row} setUpdateList={setUpdateList} />;
      },
      align: "center",
      minWidth: 120,
      flex: 0.5,
      sortable: false,
    },
  ];

  return (
    <div className="w-full h-full">
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        slots={{
          toolbar: GridToolbar,
        }}
        disableRowSelectionOnClick
        localeText={localeText}
      />
    </div>
  );
}

TableOfUsers.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      mail: PropTypes.string.isRequired,
      role: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      agency: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
      }).isRequired,
      joined_at: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      is_active: PropTypes.bool.isRequired,
      position: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  setUpdateList: PropTypes.func.isRequired,
};
