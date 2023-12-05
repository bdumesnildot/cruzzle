import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import CounterCard from "../../components/admin/CounterCard";
import ActionButton from "../../components/admin/ActionButton";
import { apiAdminUsers } from "../../services/api.admin.users";
import TableOfUsers from "../../components/admin/adminUsers/TableOfUsers";
import DialogCreateUser from "../../components/admin/adminUsers/DialogCreateUser";

function AdminUsers() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userList, setUserlist] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [openDialogAddUser, setOpenDialogAddUser] = useState(false);

  useEffect(() => {
    apiAdminUsers()
      .then((res) => {
        if (res.status === 200) {
          setUserlist(res.data);
        } else {
          navigate("/error", {
            state: {
              error: {
                status: res.status,
              },
            },
          });
          console.error("Cannot get users from panel admin");
        }
      })
      .finally(() => setUpdateList(false))
      .catch((error) => {
        navigate("/error", {
          state: {
            error: {
              status: 500,
            },
          },
        });
        console.error("Error getting users from panel admin", error);
      });
  }, [updateList]);

  return (
    <div className="admin-users w-full h-full pt-4 lg:pr-6 px-4 flex flex-col">
      <header className="w-full lg:h-44 flex items-center">
        <div className="header-left-container h-full min-w-[420px] grow self-start flex flex-col justify-between">
          <h2>{t("pages.adminpannel.users.title")}</h2>
          <div className="my-4 flex flex-col gap-4 md:block">
            <ActionButton
              icon={<PlusIcon />}
              text={t("buttons.adduser")}
              onClick={() => setOpenDialogAddUser(true)}
            />
          </div>
        </div>
        <div className="self-center hidden lg:block">
          <CounterCard
            icon={<UserIcon />}
            text={t("pages.adminpannel.users.countercard")}
            count={userList.length}
          />
        </div>
      </header>
      <main className="admin-user-board my-4 grow">
        <TableOfUsers userList={userList} setUpdateList={setUpdateList} />
      </main>

      <DialogCreateUser
        openDialogAddUser={openDialogAddUser}
        setOpenDialogAddUser={setOpenDialogAddUser}
        setUpdateList={setUpdateList}
      />
    </div>
  );
}
export default AdminUsers;
