import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { IdeaFormContext } from "../../contexts/IdeaFormContext";
import { apiIdeasNew } from "../../services/api.ideas";

import { AlertToastContext } from "../../contexts/AlertToastContext";

function IdeaForm({ children }) {
  const { t } = useTranslation();
  const { handleSubmit, filesAttachment, teamSelect, valueCategories } =
    useContext(IdeaFormContext);

  const { setMessage, setSeverity, setTitle, setOpen } =
    useContext(AlertToastContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const { primaryImg: primaryPicture, ...dataWithoutCategories } = data;

      const formatedTeam = teamSelect.map((user) => ({
        user_id: user.id,
      }));

      formData.append("team", JSON.stringify(formatedTeam));
      formData.append("categories", JSON.stringify(valueCategories));

      for (const key in dataWithoutCategories) {
        if (Object.prototype.hasOwnProperty.call(dataWithoutCategories, key)) {
          const value = dataWithoutCategories[key];
          if (value) {
            formData.append(key, value);
          }
        }
      }

      if (primaryPicture) {
        formData.append("primaryImg", primaryPicture);
      }

      if (filesAttachment.length > 0) {
        filesAttachment
          .map((item) => ({
            attachement: item.file,
          }))
          .forEach((attachement) => {
            const key = Object.keys(attachement)[0];
            const value = attachement[key];
            formData.append(key, value);
          });
      }

      const newIdea = await apiIdeasNew(formData);

      if (newIdea) {
        setMessage(t("pages.ideas.ideanew.alert.success.message"));
        setTitle(t("pages.ideas.ideanew.alert.success.title"));
        setOpen(true);
        navigate(`/ideas/${newIdea.id}`, { replace: true });
      } else {
        setMessage(t("pages.ideas.ideanew.alert.error.message"));
        setTitle(t("pages.ideas.ideanew.alert.error.title"));
        setSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      navigate(`/error/${error.response.status}`);
      console.error(error);
    }
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
}

IdeaForm.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaForm;
