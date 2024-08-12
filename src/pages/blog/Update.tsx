import { useNavigate } from "react-router-dom";
import BlogForm from "../../components/BlogForm";
import { useBlogPost } from "../../hooks/useBlogPost";
import { useUpdateBlogPost } from "../../hooks/useUpdateBlogPost";
import { BlogPost } from "../../models/BlogPost";


export const UpdateBlog = () => {
    const { data } = useBlogPost('66b8bcac45eecbb76ef1a475');
    const { mutate }  = useUpdateBlogPost();
    const navigate = useNavigate();

    const handleFormSubmit = (values: BlogPost) => {
        mutate({ id: '66b8bcac45eecbb76ef1a475', blogPost: values });
        navigate('/blog');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1>Blog Post</h1>
            <BlogForm action="update" initialValues={data} onSubmit={handleFormSubmit} />
        </div>
    );
};