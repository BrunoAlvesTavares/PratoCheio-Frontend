import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UsersList } from './pages/Users/usersList';
import Menu from './components/menu/menu';
import UserForm from './pages/Users/usersForm';
import LoginPage from './pages/Login/login';
import Logout from './pages/Logout/logout';
import { InstitutionsList } from './pages/Institutions/institutionsList';
import InstitutionsForm from './pages/Institutions/institutionsForm';
import InstitutionsMessage from './pages/Institutions/institutionsMessage';
import UserCreatedForm from './pages/Users/userCreated';
import MessageHistoryList from './pages/messageHistory/index'
import Home from './pages/home/home';

const Layout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<HomeMenu />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/messagehistory" element={<MessageHistoryList />} />
        <Route path="/users/new" element={<FormUserMenu />} />
        <Route path="/users/newUser" element={<UserCreatedForm />} />
        <Route path="/users/:id/edit" element={<FormUserMenu />} />
        <Route path="/institutions" element={<InstitutionsList/>} />
        <Route path="/institutions/new" element={<FormInstitutionsMenu />} />
        <Route path="/institutions/:id/edit" element={<FormInstitutionsMenu />} />
        <Route path="/institutions/:id/message" element={<FormMessageMenu />} />
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

const FormInstitutionsMenu = () => {
  return (
    <>
      <Menu />
      <InstitutionsForm />
    </>
  );
};

const FormMessageMenu = () => {
  return (
    <>
      <Menu />
      <InstitutionsMessage />
    </>
  );
};

const HomeMenu = () => {
  return (
    <>
      <Menu />
      <Home />
    </>
  );
};

export default Layout;
