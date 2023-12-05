import { UserLeaderboard } from "../interfaces/users.interface";

const calculateLeaderboardScore = (user: UserLeaderboard) => {
  const { _count: count } = user;
  const {
    idea,
    idea_like: ideaLike,
    comment_like: commentLike,
    comment,
    idea_teams: ideaTeams,
  } = count;

  const likesScore = (commentLike + ideaLike) * 10;
  const commentsScore = comment * 50;
  const ideasScore = idea * 800;
  const teamsScore = ideaTeams * 400;

  const sum = likesScore + commentsScore + ideasScore + teamsScore;

  return sum;
};

export default calculateLeaderboardScore;
