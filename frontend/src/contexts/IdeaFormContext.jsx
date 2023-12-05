import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

export const IdeaFormContext = createContext({});

function IdeaFormProvider({ children }) {
  const formMethods = useForm();
  const [filesAttachment, setFilesAttachment] = useState([]);
  const [errorFiles, setErrorFiles] = useState([]);
  const [primaryImg, setPrimaryImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [valueCategories, setValueCategories] = useState([]);
  const [teamSelect, setTeamSelect] = useState([]);
  const [dataform, setDataform] = useState(null);
  const [categoriesInput, setCategoriesInput] = useState([]);

  const contextValue = useMemo(
    () => ({
      ...formMethods,
      filesAttachment,
      setFilesAttachment,
      errorFiles,
      setErrorFiles,
      primaryImg,
      setPrimaryImg,
      selectedFile,
      setSelectedFile,
      valueCategories,
      setValueCategories,
      dataform,
      setDataform,
      teamSelect,
      setTeamSelect,
      categoriesInput,
      setCategoriesInput,
    }),
    [
      filesAttachment,
      setFilesAttachment,
      errorFiles,
      setErrorFiles,
      primaryImg,
      setPrimaryImg,
      selectedFile,
      setSelectedFile,
      valueCategories,
      setValueCategories,
      dataform,
      setDataform,
      teamSelect,
      setTeamSelect,
      categoriesInput,
      setCategoriesInput,
    ]
  );

  return (
    <IdeaFormContext.Provider value={contextValue}>
      {children}
    </IdeaFormContext.Provider>
  );
}

IdeaFormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IdeaFormProvider;
