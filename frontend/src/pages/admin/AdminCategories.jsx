import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Square3Stack3DIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import CounterCard from "../../components/admin/CounterCard";
import ActionButton from "../../components/admin/ActionButton";
import TableOfCategories from "../../components/admin/adminCategories/TableOfCategories";
import { apiAdminCategories } from "../../services/api.admin.categories";
import DialogCreateCategory from "../../components/admin/adminCategories/DialogCreateCategory";

function AdminCategories() {
  const { t } = useTranslation();
  const [categoriesList, setCategorieslist] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddCategory = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    apiAdminCategories()
      .then((res) => {
        if (res.status === 200) {
          setCategorieslist(res.data);
        } else {
          console.error("Cannot get the list of categories");
        }
      })
      .catch((error) =>
        console.error("error getting the list of categories", error)
      );
    setUpdateList(false);
  }, [updateList]);

  return (
    <div className="admin-users w-full h-full pt-4 lg:pr-6 px-4 flex flex-col">
      <header className="w-full lg:h-44 flex items-center">
        <div className="header-left-container h-full min-w-[420px] grow self-start flex flex-col justify-between">
          <h2>{t("pages.adminpannel.categories.title")}</h2>
          <div className="my-4">
            <ActionButton
              icon={<PlusIcon />}
              text={t("buttons.addcategory")}
              onClick={handleAddCategory}
            />
          </div>
        </div>
        <div className="self-center hidden lg:block">
          <CounterCard
            icon={<Square3Stack3DIcon />}
            text={t("pages.adminpannel.categories.counter")}
            count={categoriesList ? categoriesList.length : 0}
          />
        </div>
      </header>
      <main className="admin-user-board my-4 grow">
        <TableOfCategories
          categoriesList={categoriesList}
          setUpdateList={setUpdateList}
        />
      </main>

      <DialogCreateCategory
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        setUpdateList={setUpdateList}
      />
    </div>
  );
}
export default AdminCategories;
