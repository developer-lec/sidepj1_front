import { Box, Button, ButtonGroup, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import MainHeader from './BasicComponents/MainHeader';
import MainMenu from './BasicComponents/MainMenu';
import ContentsCard from './components/ContentsCard';
import HeaderExtra from './BasicComponents/HeaderExtra';

// ==============================================

// ==============================================

// ==============================================

const HomePage = () => {
  return (
    <>
      <MainHeader title="트래블 메이트" />
      {/* 헤더의 고정 위치에 따른 상단 고정 마진 */}
      <HeaderExtra />
      <ContentsCard />
    </>
  );
};

export default HomePage;
