import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/BlogForm";
import { useCreateBlogPost } from "../../hooks/useCreateBlogPost";
import { BlogPost } from "../../models/BlogPost";

export const AddBlog = () => {
    const { mutate } = useCreateBlogPost();
    const navigate = useNavigate();

    const handleFormSubmit = (values: BlogPost) => {
        mutate(values);
        navigate('/blog');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1>Blog Post</h1>
            <BlogForm action="add" onSubmit={handleFormSubmit} />
        </div>
    );
};