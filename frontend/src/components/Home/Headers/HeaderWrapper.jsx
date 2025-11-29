import React from 'react';
import { useUser } from '../../../context/UserContext';
import LoginHeader from './LoginHeader';
import NoLoginHeader from './NoLoginHeader'
import { useEffect } from 'react';

const HeaderWrapper = () => {
  const { user } = useUser();
  return user ? <LoginHeader /> : <NoLoginHeader />;
};

export default HeaderWrapper;