import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListBlog from './List';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import { useDeleteBlogPost } from '../../hooks/useDeleteBlogPost';

jest.mock('../../hooks/useBlogPosts');
jest.mock('../../hooks/useDeleteBlogPost');
jest.mock('../../components/BlogTable', () => ({
  __esModule: true,
  default: ({ data, onDelete, onEdit }: { data: any[], onDelete: (id: string) => void, onEdit: (id: string) => void }) => (
    <table>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>
              <button onClick={() => onEdit(item.id)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
}));

describe('ListBlog Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display a loading spinner when data is loading', () => {
    (useBlogPosts as jest.Mock).mockReturnValue({ data: [], refetch: jest.fn(), isLoading: true });
    (useDeleteBlogPost as jest.Mock).mockReturnValue({ mutate: jest.fn() });

    render(
      <MemoryRouter>
        <ListBlog />
      </MemoryRouter>
    );

    expect(screen.getByTestId('status')).toBeInTheDocument();
  });

  it('should display the blog posts and handle edit and delete actions', async () => {
    const mockData = [
      { id: '1', title: 'Blog Post 1' },
      { id: '2', title: 'Blog Post 2' },
    ];

    const mockRefetch = jest.fn();
    const mockMutate = jest.fn();
    const mockNavigate = jest.fn();

    (useBlogPosts as jest.Mock).mockReturnValue({ data: mockData, refetch: mockRefetch, isLoading: false });
    (useDeleteBlogPost as jest.Mock).mockReturnValue({ mutate: mockMutate });

    render(
      <MemoryRouter>
        <ListBlog />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Blog Post 1')).toBeInTheDocument();
    });

    await waitFor(() => {
        expect(screen.getByText('Blog Post 2')).toBeInTheDocument();
      });

    fireEvent.click(screen.getAllByText('Edit')[0]);
    fireEvent.click(screen.getAllByText('Delete')[0]);

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });

    await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledWith('1');
      });
  });
});
