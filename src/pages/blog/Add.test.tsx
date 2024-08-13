// src/pages/blog/Add.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { message } from 'antd';
import { createBlogPost } from '../../services/BlogService';
import AddBlog from './Add';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock de servicios y componentes
jest.mock('../../services/BlogService');
jest.mock('../../components/BlogForm', () => ({
    __esModule: true,
    default: ({ onSubmit, onCancel }: { onSubmit: (values: any) => void; onCancel: () => void }) => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ title: 'Test Title', content: 'Test Content', author: 'Test Author', createdAt: new Date(), updatedAt: new Date() });
            }}
        >
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    ),
}));

describe('AddBlog Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the form correctly', () => {
        render(<Router>
            <AddBlog />
        </Router>);
        expect(screen.getByText('Add Blog Post')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should redirect to /blog on successful form submission', async () => {
        (createBlogPost as jest.Mock).mockResolvedValue({});

        render(<Router>
            <AddBlog />
        </Router>);

        fireEvent.submit(screen.getByText('Submit'));

        await waitFor(() => {
            expect(screen.queryByText('Add Blog Post')).not.toBeInTheDocument();
        });

        // Verificar redirección
        expect(screen.queryByText('Add Blog Post')).not.toBeInTheDocument();
    });

    it('should show error message on failed form submission', async () => {
        (createBlogPost as jest.Mock).mockRejectedValue(new Error('Failed to create blog post'));
        jest.spyOn(message, 'error');

        render(<Router>
            <AddBlog />
        </Router>);

        fireEvent.submit(screen.getByText('Submit'));

        await waitFor(() => {
            expect(message.error).toHaveBeenCalledWith('Failed to create blog post');
        });
    });

    it('should redirect to /blog on cancel', async () => {
        render(<Router>
            <AddBlog />
        </Router>);

        fireEvent.click(screen.getByText('Cancel'));

        await waitFor(() => {
            expect(screen.queryByText('Add Blog Post')).not.toBeInTheDocument();
        });
    });
});
