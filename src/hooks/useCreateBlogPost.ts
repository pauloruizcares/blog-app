import { useMutation, useQueryClient } from "react-query";
import { createBlogPost } from "../services/BlogService";

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(createBlogPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogPosts");
    },
  }, );
};
