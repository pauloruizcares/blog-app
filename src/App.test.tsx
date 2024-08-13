import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/NavBar', () => () => <div>NavBar Mock</div>);
jest.mock('./components/ProtectedRoute', () => ({ element }: { element: JSX.Element }) => element);
jest.mock('./pages/blog/Add', () => () => <div>AddBlog Mock</div>);
jest.mock('./pages/blog/Update', () => () => <div>UpdateBlog Mock</div>);
jest.mock('./pages/blog/List', () => () => <div>ListBlog Mock</div>);
jest.mock('./pages/Home', () => () => <div>Home Mock</div>);

describe('App Component', () => {
  it('should render NavBar and Home page by default', async () => {
    render(<App />);

    expect(screen.getByText('NavBar Mock')).toBeInTheDocument();
    expect(screen.getByText('Home Mock')).toBeInTheDocument();
  });

  it('should render AddBlog page when navigating to /blog/add', async () => {
    window.history.pushState({}, 'Test Page', '/blog/add');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('AddBlog Mock')).toBeInTheDocument();
    });
  });

  it('should render UpdateBlog page when navigating to /blog/edit/:id', async () => {
    window.history.pushState({}, 'Test Page', '/blog/edit/1');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('UpdateBlog Mock')).toBeInTheDocument();
    });
  });

  it('should render ListBlog page when navigating to /blog', async () => {
    window.history.pushState({}, 'Test Page', '/blog');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('ListBlog Mock')).toBeInTheDocument();
    });
  });
});
