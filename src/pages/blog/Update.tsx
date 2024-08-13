import React, { Component } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import BlogForm from '../../components/BlogForm';
import { BlogPost } from '../../models/BlogPost';
import { message } from "antd";
import { getBlogPost, updateBlogPost } from "../../services/BlogService";


interface UpdateBlogProps {
    id: string;
    navigate: (path: string) => void;
}

interface UpdateBlogState {
    blogPost?: BlogPost;
    redirectTo: string | null;
}

class UpdateBlog extends Component<UpdateBlogProps, UpdateBlogState> {
    state: UpdateBlogState = {
        blogPost: undefined,
        redirectTo: null,
    };

    componentDidMount() {
        this.fetchBlogPost();
    }

    fetchBlogPost = async () => {
        try {
            const { id } = this.props;
            const response = await getBlogPost(id);
            this.setState({ blogPost: response });
        } catch (error) {
            message.error("Failed to fetch blog post");
            console.error("Failed to fetch blog post:", error);
        }
    };

    handleFormSubmit = async (values: BlogPost) => {
        try {
            const { id } = this.props;
            await updateBlogPost(id, values);
            this.setState({ redirectTo: '/blog' });
            console.log("values", values);
        } catch (error) {
            message.error("Failed to create blog post");
            console.error("Failed to update blog post:", error);
        }
    };

    handleCancel = () => {
        this.setState({ redirectTo: '/blog' });
    };

    render() {
        const { blogPost, redirectTo } = this.state;

        if (redirectTo) {
            return <Navigate to={redirectTo} />;
        }

        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                <h1>Update Blog Post</h1>
                <BlogForm action="update" initialValues={blogPost} onSubmit={this.handleFormSubmit} onCancel={this.handleCancel} />
            </div>
        );
    }
}

const withRouter = (Component: React.ComponentType<any>) => {
    return (props: any) => {
        const { id } = useParams();
        const navigate = useNavigate();
        return <Component {...props} id={id} navigate={navigate} />;
    };
};

export default withRouter(UpdateBlog);
