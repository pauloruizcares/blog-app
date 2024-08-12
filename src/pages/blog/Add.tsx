import { Component } from 'react';
import BlogForm from '../../components/BlogForm';
import { BlogPost } from '../../models/BlogPost';
import { Navigate } from 'react-router-dom';
import { message } from "antd";
import { createBlogPost } from "../../services/BlogService";

interface AddBlogState {
    redirectTo: string | null;
}

export class AddBlog extends Component<{}, AddBlogState> {
    state: AddBlogState = {
        redirectTo: null,
    };

    handleFormSubmit = async (values: BlogPost) => {
        try {
            await createBlogPost(values);
            this.setState({ redirectTo: '/blog' });
        } catch (error) {
            message.error("Failed to create blog post");
            console.error("Failed to create blog post:", error);
        }
    };

    handleCancel = () => {
        this.setState({ redirectTo: '/blog' });
    };

    render() {
        if (this.state.redirectTo) {
            return <Navigate to={this.state.redirectTo} />;
        }

        return (
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
                <h1>Add Blog Post</h1>
                <BlogForm action="add" onSubmit={this.handleFormSubmit} onCancel={this.handleCancel} />
            </div>
        );
    }
}

export default AddBlog;
