import { Button, Spin } from "antd";
import BlogTable from "../../components/BlogTable";
import { PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useBlogPosts } from "../../hooks/useBlogPosts";
import { useDeleteBlogPost } from "../../hooks/useDeleteBlogPost";


export const ListBlog = () => {
    const navigate = useNavigate();
    const { mutate } = useDeleteBlogPost();
    const { data, refetch, isLoading } = useBlogPosts();

    const handleEdit = (id: string) => {
        navigate(`/blog/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        mutate(id);
        refetch()
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div>
            <div>
                <h1>List Blog</h1>
                <Link to="/blog/add">
                    <Button type="primary" icon={<PlusOutlined />} />
                </Link>
            </div>
            <div>
                <BlogTable data={data || []} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
        </div>
    );
};
