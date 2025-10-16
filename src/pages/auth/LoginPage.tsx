import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ==============================================
// ID 인터페이스
interface IdState {
  id: string;
}

// PW 인터페이스
interface PasswordState {
  password: string;
}

// 로그인 Type
type LoginState = IdState & PasswordState;

// ==============================================

// ==============================================

const LoginPage = () => {
  // 초기 값 세팅 : { object }
  const [loginInfo, setLoginInfo] = useState<LoginState>({ id: '', password: '' });
  const navigate = useNavigate();

  const login = () => {
    // 로그인 로직 수행 후
    navigate('/homePage'); // '/' 경로로 이동, HomePage로 가정
  };

  return (
    <Box
      sx={{
        m: '2rem',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        minWidth: '300px',
        padding: '20px',
        border: 'solid black 2px',
      }}
    >
      <TextField
        id="standard-id-input"
        label="id"
        type="id"
        variant="standard"
        value={loginInfo.id}
        onChange={(e) => {
          setLoginInfo({ ...loginInfo, id: e.target.value });
        }}
        size="small"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        type="password"
        variant="standard"
        value={loginInfo.password}
        onChange={(e) => {
          setLoginInfo({ ...loginInfo, password: e.target.value });
        }}
        size="small"
      />
      <ButtonGroup sx={{ display: 'flex', mt: '20px', justifyContent: 'flex-end' }}>
        {/* 인자가 없을 경우 직접 참조 가능 */}
        <Button onClick={login}>로그인</Button>
        {/* ======================== Refer ======================= */}
        {/* <Button onClick={login()}>로그인</Button> */}
        {/*   => 이렇게 될 경우, 랜더링 시, 즉시 실행됨(No Click Event) */}
        {/* 인자가 있을 경우 화살표 함수 */}
        {/* <Button onClick={() => login(params)}>로그인</Button> */}
        <Button>회원가입</Button>
      </ButtonGroup>
    </Box>
  );
};

export default LoginPage;
