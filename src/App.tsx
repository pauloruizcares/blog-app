import './App.scss';
import { Layout } from 'antd';
import NavBar from "./components/NavBar";
import { BrowserRouter } from 'react-router-dom'
import { RouterContainer } from "./routes/Route";

const { Header, Content } = Layout;

const App = () => {
  return (<>
    <BrowserRouter>
        <Layout>
          <Header>
            <NavBar />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <RouterContainer />
          </Content>
        </Layout>
    </BrowserRouter>

  </>
  );
}

export default App;
