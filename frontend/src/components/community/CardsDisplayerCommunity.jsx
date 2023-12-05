import { useContext, useEffect, useState } from "react";

import UserCommunityCard from "./UserCommunityCard";
import { FilterCommunityContext } from "../../contexts/FilterCommunityContext";
import { fetchByQuery } from "../../services/api.services";

function CardsDisplayerCommunity() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const {
    lastnameContains,
    firstnameContains,
    agenciesValue,
    locationValue,
    roleValue,
    positionValue,
    publicationDateStart,
    publicationDateEnd,
  } = useContext(FilterCommunityContext);

  useEffect(() => {
    const reqItems = {
      lastnameContains,
      firstnameContains,
      agenciesValue,
      locationValue,
      roleValue,
      positionValue,
      publicationDateStart,
      publicationDateEnd,
    };
    fetchByQuery("/api/users/filter", reqItems)
      .then((data) => {
        setFilteredUsers(data);
      })
      .catch((error) =>
        console.error("error from api.services.fetcherByQuery", error)
      );
  }, [
    lastnameContains,
    firstnameContains,
    agenciesValue,
    locationValue,
    roleValue,
    positionValue,
    publicationDateStart,
    publicationDateEnd,
  ]);

  return (
    <div
      className="w-full grid sm:grid-cols-2 gap-3 sm:gap-4 px-6 py-4 lg:grid-cols-3 2xl:grid-cols-4"
      aria-label="displayer card"
    >
      {filteredUsers &&
        filteredUsers.map((user) => (
          <UserCommunityCard key={user.id} user={user} />
        ))}
    </div>
  );
}
export default CardsDisplayerCommunity;
