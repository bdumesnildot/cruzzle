import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderIdeaPage from "../../components/ideapage/HeaderIdeaPage";
import { IdeaPageContext } from "../../contexts/IdeaPageContext";
import { apiIdeas } from "../../services/api.ideas";
import TabsIdeaPage from "../../components/ideapage/TabsIdeaPage";

function Idea() {
  const { setIdea } = useContext(IdeaPageContext);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const fetchIdeaAsync = async (ideaId) => {
    const result = await apiIdeas(ideaId);
    if (result) {
      setIdea(result);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchIdeaAsync(id);
  }, [id]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="relative">
      <HeaderIdeaPage />
      <TabsIdeaPage />
    </div>
  );
}
export default Idea;
