import axios from "axios";
import { BlogPostRequest } from "../models/requests/BlogPost";
import { BlogPost } from "../models/BlogPost";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const createBlogPost = async (blogPost: BlogPostRequest) => {
  return await api.post(`${BASE_URL}/blogposts`, blogPost);
};

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data } = await api.get<BlogPost[]>(`${BASE_URL}/blogposts`);
  return data || [];
};

export const getBlogPost = async (id: string): Promise<BlogPost> => {
  const { data } = await api.get<BlogPost>(`${BASE_URL}/blogposts/${id}`);
  return data;
};

export const updateBlogPost = async (id: string, blogPost: BlogPostRequest) => {
  return await api.put(`${BASE_URL}/blogposts/${id}`, blogPost);
};

export const deleteBlogPost = async (id: string) => {
  return await api.delete(`${BASE_URL}/blogposts/${id}`);
};
