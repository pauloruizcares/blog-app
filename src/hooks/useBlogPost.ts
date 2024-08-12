import { useQuery } from "react-query";
import { getBlogPost } from "../services/BlogService";

export const useBlogPost = (id: string) => {
  return useQuery(["blogPost", id], () => getBlogPost(id), {
    staleTime: 60000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: false,
  });
};
