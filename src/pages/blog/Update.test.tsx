import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { message } from 'antd';
import { getBlogPost, updateBlogPost } from '../../services/BlogService';
import UpdateBlog from './Update';

jest.mock('../../services/BlogService');
jest.mock('../../components/BlogForm', () => ({
    __esModule: true,
    default: ({ onSubmit, onCancel, initialValues }: { onSubmit: (values: any) => void; onCancel: () => void; initialValues?: any }) => (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ title: 'Updated Title', content: 'Updated Content', author: 'Updated Author', createdAt: new Date(), updatedAt: new Date() });
            }}
        >
            {initialValues && <input name="title" defaultValue={initialValues.title} />}
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    ),
}));

describe('UpdateBlog Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch and display the blog post for editing', async () => {
        const mockBlogPost = {
            title: 'Test Title',
            content: 'Test Content',
            author: 'Test Author',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        (getBlogPost as jest.Mock).mockResolvedValue(mockBlogPost);

        render(
            <MemoryRouter initialEntries={['/blog/edit/1']}>
                <UpdateBlog id="1" navigate={() => { }} />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Update Blog Post')).toBeInTheDocument();
        });
    });

    it('should show error message on failed form submission', async () => {
        (getBlogPost as jest.Mock).mockResolvedValue({
            title: 'Test Title',
            content: 'Test Content',
            author: 'Test Author',
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        (updateBlogPost as jest.Mock).mockRejectedValue(new Error('Failed to update blog post'));
        jest.spyOn(message, 'error');

        render(
            <MemoryRouter initialEntries={['/blog/edit/1']}>
                <UpdateBlog id="1" navigate={() => { }} />
            </MemoryRouter>
        );

        fireEvent.submit(screen.getByText('Submit'));

        await waitFor(() => {
            expect(message.error).toHaveBeenCalledWith('Failed to create blog post');
        });
    });

    it('should redirect to /blog on cancel', async () => {
        render(
            <MemoryRouter initialEntries={['/blog/edit/1']}>
                <UpdateBlog id="1" navigate={() => { }} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Cancel'));

        await waitFor(() => {
            expect(screen.queryByText('Update Blog Post')).not.toBeInTheDocument();
        });
    });
});
