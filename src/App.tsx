import './App.scss';
import { Layout } from 'antd';
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute";
import AddBlog from "./pages/blog/Add";
import UpdateBlog from "./pages/blog/Update";
import ListBlog from "./pages/blog/List";
import Home from "./pages/Home";

const { Header, Content } = Layout;

const App = () => {
  return (<>
    <BrowserRouter>
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/add" element={<ProtectedRoute element={<AddBlog />} />} />
            <Route path="/blog/edit/:id" element={<ProtectedRoute element={<UpdateBlog />} />} />
            <Route path="/blog" element={<ProtectedRoute element={<ListBlog />} />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  </>
  );
}

export default App;
