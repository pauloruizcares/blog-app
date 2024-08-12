// src/hooks/useBlogPosts.ts
import { useQuery } from "react-query";
import { getBlogPosts } from "../services/BlogService";

export const useBlogPosts = () => {
  return useQuery("blogPosts", getBlogPosts, {
    staleTime: 60000,
    cacheTime: 300000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    retry: false,
  });
};
