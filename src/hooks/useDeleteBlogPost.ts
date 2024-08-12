import { useMutation, useQueryClient } from "react-query";
import { deleteBlogPost } from "../services/BlogService";

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBlogPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("blogPosts");
    },
  });
};
