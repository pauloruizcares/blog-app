import { useQuery } from "react-query";
import { getBlogPost } from "../services/BlogService";

export const useBlogPost = (id: string) => {
  return useQuery(["blogPost", id], () => getBlogPost(id));
};
