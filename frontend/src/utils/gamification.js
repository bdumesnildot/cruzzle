const getUserPonderatedScoreObject = (user) => {
  const { _count: counts } = user;
  const {
    idea_like: numberOfLikes,
    comment: numberOfComments,
    idea: numberOfIdeas,
    comment_like: numberOfLikesOnComment,
    favorit: numberOfFavorits,
    idea_teams: numberOfTeams,
  } = counts;

  return {
    likesScore: (numberOfLikes + numberOfLikesOnComment) * 10,
    commentsScore: numberOfComments * 50,
    ideasScore: numberOfIdeas * 800,
    favoritsScore: numberOfFavorits * 50,
    teamsScore: numberOfTeams * 400,
  };
};

const getUserLevelObject = (user) => {
  const scoreObject = getUserPonderatedScoreObject(user);
  const currentScore = Object.values(scoreObject).reduce(
    (acc, cur) => acc + cur,
    0
  );

  const currentLevel = Math.min(Math.floor(0.5 * Math.sqrt(currentScore)), 100);

  const currentLevelMinScore =
    currentLevel < 100 ? 4 * currentLevel ** 2 : currentScore;
  const nextLevelScore =
    currentLevel < 100 ? 4 * (currentLevel + 1) ** 2 : currentScore;

  const currentLevelMinMaxScore = {
    min: currentLevelMinScore,
    max: nextLevelScore,
  };

  return {
    currentLevel,
    currentScore,
    currentLevelMinMaxScore,
  };
};

const getUserPuzzlePercentageAchievementObject = (user) => {
  const { likesScore, commentsScore, ideasScore, favoritsScore, teamsScore } =
    getUserPonderatedScoreObject(user);

  const puzzles = [
    { name: "likes", maxScore: 1000, score: likesScore }, // user has 100 likes
    { name: "comments", maxScore: 2500, score: commentsScore }, // user has 50 comments
    { name: "ideas", maxScore: 8000, score: ideasScore }, // user has 10 ideas
    { name: "favorits", maxScore: 300, score: favoritsScore }, // user has 6 favorits
    { name: "teams", maxScore: 4000, score: teamsScore }, // user has 10 teams
  ];

  const puzzlePercentageAchievements = {};
  for (const puzzle of puzzles) {
    const { name, maxScore, score } = puzzle;
    puzzlePercentageAchievements[`${name}PuzzlePercentageAchievement`] =
      Math.min(Math.ceil((100 * score) / maxScore), 100);
  }

  return puzzlePercentageAchievements;
};

export { getUserLevelObject, getUserPuzzlePercentageAchievementObject };
