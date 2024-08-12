// src/hooks/useBlogPosts.ts
import { useQuery } from "react-query";
import { getBlogPosts } from "../services/BlogService";

export const useBlogPosts = () => {
  return useQuery("blogPosts", getBlogPosts);
};
