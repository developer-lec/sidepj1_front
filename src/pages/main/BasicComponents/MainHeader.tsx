import { useEffect, useState } from 'react';

// import LogoutIcon from '@mui/icons-material/Logout';
// import Button from '@mui/material/Button';
// import { useTheme } from '@mui/material/styles';
// import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import type { MainPageHeaderProps } from '../../../type/MainType';
import MainMenu from './MainMenu';

const dayOfWeek = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

export default function MainHeader(props: MainPageHeaderProps) {
  const { title } = props;

  const initialNow = dayjs();
  const initialSeconds = initialNow.get('second');
  const initialDelimiter = initialSeconds % 2 === 0 ? ' ' : ':';
  const initialFormattedDate = `${initialNow.format('YYYY-MM-DD')} ${dayOfWeek[initialNow.day()]}`;
  const initialHour = initialNow.format('HH');
  const initialMinute = initialNow.format('mm');

  // const theme = useTheme();
  const [date, setDate] = useState(initialFormattedDate);
  const [hour, setHour] = useState(initialHour);
  const [minute, setMinute] = useState(initialMinute);
  const [delimiter, setDelimiter] = useState(initialDelimiter);

  // 헤더 표출 시간 조정
  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const seconds = now.get('second');
      if (seconds % 2 === 0) {
        setDelimiter(' ');
      } else {
        setDelimiter(':');
      }
      const formattedDate = `${now.format('YYYY-MM-DD')} ${dayOfWeek[now.day()]}`;
      setDate(formattedDate);
      setHour(now.format('HH'));
      setMinute(now.format('mm'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-8 left-8 right-8 h-14 z-10 rounded-full px-6 flex items-center backdrop-blur-lg text-white"
      style={{
        background: 'rgba(8, 27, 48, 0.65)',
        border: '1px solid #38bdf8',
        boxShadow: '0 4px 24px 0 rgba(56,189,248,0.15)',
        zIndex: 1000,
      }}
    >
      <MainMenu />
      <div className="flex items-center ml-2">
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            height: '1.5rem',
            mx: 1,
            mr: 3,
            my: 'auto',
            borderRightColor: 'rgba(255, 255, 255, 0.4)',
          }}
        />
        <div className="my-auto">{title ?? '자율주행 순찰 센터 시스템'}</div>
      </div>
      <div className="flex-1" />
      <div className="grid grid-cols-1 gap-0 mr-4">
        <div className="text-right text-[0.5rem]">{date}</div>
        <div className="text-right text-[1rem] font-black">
          {hour}
          <div className="text-xs" style={{ minWidth: '0.3rem', display: 'inline-block' }}>
            {delimiter}
          </div>
          {minute}
        </div>
      </div>
    </div>
  );
}
