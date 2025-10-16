import { Card, Typography } from '@mui/material';

export default function ContentsCard() {
  return (
    <>
      <Card sx={{ margin: 2, border: 2, width: '300px', height: '300px' }}>
        <Typography sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
          최근 인기 스팟
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'start', pt: 2, pl: 2 }}>
          1. 일본 - 삿포로
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'start', pt: 2, pl: 2 }}>
          2. 태국 - 방콕
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'start', pt: 2, pl: 2 }}>
          3. 베트남 - 하노이
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'start', pt: 2, pl: 2 }}>
          4. 베트남 - 세부
        </Typography>
        <Typography sx={{ display: 'flex', justifyContent: 'start', pt: 2, pl: 2 }}>
          5. 인도네시아 - 발리
        </Typography>
      </Card>
    </>
  );
}
