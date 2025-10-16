import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import MainHeader from '../../BasicComponents/MainHeader';
import VWorldMap from './components/VWorldMap';

export default function MapContainer() {
  const boxRef = useRef<HTMLDivElement | null>(null);

  // 초기값 지정 (초기 렌더링에서 0 방지)
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    if (boxRef.current) {
      const { offsetWidth, offsetHeight } = boxRef.current;
      setSize({ width: offsetWidth, height: offsetHeight });
    }
  }, [boxRef.current]);

  return (
    <Box ref={boxRef} sx={{ width: '100%', height: '100%' }}>
      <MainHeader title="사용자 정의 지도 페이지" />
      <VWorldMap />
    </Box>
  );
}
