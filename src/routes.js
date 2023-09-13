import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UsersList } from './pages/Users/usersList';
import Menu from './components/menu/menu';
import UserForm from './pages/Users/usersForm';
import LoginPage from './pages/Login/login';
import Logout from './pages/Logout/logout';

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/new" element={<FormUserMenu />} />
        <Route path="/users/:id/edit" element={<FormUserMenu />} />
      </Routes>
    </Router>
  );
};

const FormUserMenu = () => {
  return (
    <>
      <Menu />
      <UserForm />
    </>
  );
};

export default Layout;
