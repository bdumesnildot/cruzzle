import express, { Application, Request, Response } from "express";
import usersRoutes from "./users.routes";
import ideasRoutes from "./ideas.routes";
import favoritsRoutes from "./favorits.routes";
import categoriesRoutes from "./categories.routes";
import adminRoutes from "./admin.routes";
import commentsRoutes from "./comments.routes";
import commmentLikesRoutes from "./comments_likes.routes";
import ideaLikesRoutes from "./idea_likes.routes";
import agenciesRoutes from "./agencies.routes";
import positionsRoutes from "./positions.routes";
import rolesRoutes from "./roles.routes";
import notificationsRoutes from "./notifications.routes";

const app: Application = express();

const welcome = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello 🧩" });
};
app.get("/", welcome);

app.use("/api/users", usersRoutes);
app.use("/api/ideas", ideasRoutes);
app.use("/api/favorits", favoritsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/likes", commmentLikesRoutes);
app.use("/api/ideas/likes", ideaLikesRoutes);
app.use("/api/agencies", agenciesRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/notifications", notificationsRoutes);

app.use("/api/admin", adminRoutes);

export default app;
