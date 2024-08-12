import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, ReadOutlined } from '@ant-design/icons';
import './NavBar.scss';
import SignIn from "./SignIn";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const items: ItemType<MenuItemType>[] = [
    { key: 'home', icon: <HomeOutlined />, title: 'Home', onClick: () => navigate('/'), },
    { key: 'blog', icon: <ReadOutlined />, title: 'Blog', onClick: () => navigate('/blog'), },
  ];

  return (
    <div className="navbar">
      <Menu mode="horizontal" theme="dark" style={{ flex: 1 }} items={items} />
      <SignIn />
    </div>
  );
};

export default NavBar;
