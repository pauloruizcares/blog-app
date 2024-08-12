import { useNavigate, useParams } from "react-router-dom";
import BlogForm from "../../components/BlogForm";
import { useBlogPost } from "../../hooks/useBlogPost";
import { useUpdateBlogPost } from "../../hooks/useUpdateBlogPost";
import { BlogPost } from "../../models/BlogPost";


export const UpdateBlog = () => {
    const params = useParams();
    const { data } = useBlogPost(params.id || '');
    const { mutate }  = useUpdateBlogPost();
    const navigate = useNavigate();

    const handleFormSubmit = (values: BlogPost) => {
        mutate({ id: params.id || '', blogPost: values });
        navigate('/blog');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h1>Blog Post</h1>
            <BlogForm action="update" initialValues={data} onSubmit={handleFormSubmit} />
        </div>
    );
};