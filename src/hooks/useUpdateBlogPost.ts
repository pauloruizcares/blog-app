import { useMutation, useQueryClient } from "react-query";
import { BlogPostRequest } from "../models/requests/BlogPost";
import { updateBlogPost } from "../services/BlogService";

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, blogPost }: { id: string; blogPost: BlogPostRequest }) =>
      updateBlogPost(id, blogPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("blogPosts");
      },
    }
  );
};
