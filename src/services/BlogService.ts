import axios from "axios";
import { BlogPostRequest } from "../models/requests/BlogPost";
import { BlogPost } from "../models/BlogPost";

const BASE_URL = "http://localhost:4000/api";

export const createBlogPost = async (blogPost: BlogPostRequest) => {
  return await axios.post(`${BASE_URL}/blogposts`, blogPost);
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data } = await axios.get<BlogPost[]>(`${BASE_URL}/blogposts`);
  return data || [];
};

export const getBlogPost = async (id: string): Promise<BlogPost> => {
  const { data } = await axios.get<BlogPost>(`${BASE_URL}/blogposts/${id}`);
  return data;
};

export const updateBlogPost = async (id: string, blogPost: BlogPostRequest) => {
  return await axios.put(`${BASE_URL}/blogposts/${id}`, blogPost);
};

export const deleteBlogPost = async (id: string) => {
  return await axios.delete(`${BASE_URL}/blogposts/${id}`);
};
