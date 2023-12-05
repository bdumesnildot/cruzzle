interface CreateComments {
  idea_id: number;
  user_id: number;
  body: string;
}
interface EditComments {
  body: string;
}

export { CreateComments, EditComments };
